export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = config.telegramChatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Telegram bot sozlamalari mavjud emas',
    });
  }

  const body = await readBody(event);

  // Honeypot spam protection
  if (body?.company_website) {
    return { success: true };
  }

  const name = String(body?.name || '').trim();
  const contact = String(body?.contact || '').trim();
  const subject = String(body?.subject || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || name.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
    });
  }

  if (!contact || contact.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: "Aloqa ma'lumotlari kiritilishi shart",
    });
  }

  if (!message || message.length < 5) {
    throw createError({
      statusCode: 400,
      statusMessage: "Xabar matni kamida 5 ta belgidan iborat bo'lishi kerak",
    });
  }

  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const timestamp = new Intl.DateTimeFormat('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'Noma\'lum';

  const textLines = [
    '<b>🚀 YANGI XABAR | PORTFOLIO SAYTDAN</b>',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 <b>Ism:</b> ${escapeHtml(name)}`,
    `📞 <b>Aloqa:</b> <code>${escapeHtml(contact)}</code>`,
    subject ? `💼 <b>Mavzu:</b> ${escapeHtml(subject)}` : null,
    '━━━━━━━━━━━━━━━━━━━━',
    '💬 <b>Xabar:</b>',
    `<i>${escapeHtml(message)}</i>`,
    '━━━━━━━━━━━━━━━━━━━━',
    `🕒 <b>Vaqt:</b> ${timestamp} (Toshkent)`,
    `🌐 <b>IP:</b> <code>${clientIp}</code>`,
  ].filter(Boolean);

  const telegramPayload = {
    chat_id: chatId,
    text: textLines.join('\n'),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramPayload),
        signal: AbortSignal.timeout(10000),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('[Telegram Error]', data);
      throw createError({
        statusCode: 502,
        statusMessage: data.description || 'Telegramga yuborishda xatolik yuz berdi',
      });
    }

    return {
      success: true,
      messageId: data.result?.message_id,
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }
    console.error('[Telegram Network Error]', error);
    throw createError({
      statusCode: 500,
      statusMessage:
        'Serverda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
    });
  }
});
