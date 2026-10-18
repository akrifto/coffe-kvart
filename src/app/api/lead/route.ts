import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "app", "data");

interface LeadData {
  name: string;
  phone: string;
  product: string;
  delivery: string;
  comment?: string;
  utmSource: string;
  utmMedium: string;
  pageUrl: string;
  timestamp: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, product, delivery, comment, utmSource, utmMedium, pageUrl } = body;

    // Валидация полей
    if (!name || !phone || !product || !delivery) {
      return NextResponse.json(
        { message: "Заполнены не все обязательные поля" },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone.startsWith("375") || cleanPhone.length !== 12) {
      return NextResponse.json(
        { message: "Некорректный формат телефона" },
        { status: 400 }
      );
    }

    // Проверяем, существует ли папка src/app/data, если нет — создаём
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    // Читаем все файлы в папке для проверки дублей и автоочистки
    const files = fs.readdirSync(DATA_DIR);
    let recentLeadFound = false;

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(DATA_DIR, file);
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const lead: LeadData = JSON.parse(fileContent);

          // 1. Защита от дублей (проверяем по телефону за последние 10 минут)
          if (lead.phone === cleanPhone && now - lead.timestamp < TEN_MINUTES) {
            recentLeadFound = true;
          }

          // 2. Автоочистка: если файл старше 7 дней — удаляем к хуям
          if (now - lead.timestamp > SEVEN_DAYS) {
            fs.unlinkSync(filePath);
          }
        } catch (e) {
          // Игнорируем битые файлы, если вдруг что пошло не так
        }
      }
    }

    if (recentLeadFound) {
      return NextResponse.json(
        { message: "Вы уже отправили заявку. Мы свяжемся с вами в ближайшее время!" },
        { status: 429 }
      );
    }

    // Формируем новую заявку
    const newLead: LeadData = {
      name: name.trim(),
      phone: cleanPhone,
      product,
      delivery,
      comment: comment ? comment.trim() : "",
      utmSource,
      utmMedium,
      pageUrl,
      timestamp: now,
    };

    // Сохраняем лид в индивидуальный файл (например: lead_1718829300000.json)
    const newFile = path.join(DATA_DIR, `lead_${now}.json`);
    fs.writeFileSync(newFile, JSON.stringify(newLead, null, 2), "utf-8");

    // Telegram-уведомление (если прописаны env переменные)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = 
        `☕ **Новый заказ Kvart Coffee!**\n\n` +
        `👤 **Имя:** ${newLead.name}\n` +
        `📞 **Телефон:** +${newLead.phone}\n` +
        `📦 **Товар:** ${newLead.product}\n` +
        `🚚 **Получение:** ${newLead.delivery}\n` +
        `💬 **Комментарий:** ${newLead.comment || "нет"}\n` +
        `📊 **Источник:** ${newLead.utmSource} / ${newLead.utmMedium}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.error("Ошибка отправки в Telegram:", tgErr);
      }
    }

    return NextResponse.json({ success: true, message: "Заявка успешно принята" });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}