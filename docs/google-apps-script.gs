/**
 * RSVP handler — Артём и Олеся, 17.07.2026
 *
 * Принимает POST из приглашения, пишет ответ в таблицу,
 * не даёт дублей по имени.
 *
 * Деплой: см. docs/google-sheets-setup.md
 */

// ── Настройки ──────────────────────────────────────────────────────────────

// Если хотите получать уведомление о каждом ответе на почту — впишите её
// и раскомментируйте отправку ниже. Пустая строка = выключено.
const NOTIFY_EMAIL = '';

// На какой лист писать. По инструкции мы переименовали Лист 1 в "Ответы".
// Если хотите другое название — поменяйте здесь и в самой таблице.
const SHEET_NAME = 'Ответы';

// Простой shared-секрет — должен совпадать со значением SHEETS_SECRET в
// parts/RSVP.jsx. Это лёгкий фильтр от случайного спама, не криптозащита.
const SECRET = 'lesya-artem-2026';

// ── Логика ─────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // Тело приходит как text/plain с JSON внутри (так обходим CORS preflight).
    const data = JSON.parse(e.postData.contents);

    // Проверка shared-секрета — отсекаем случайные запросы и ботов.
    if (data.secret !== SECRET) {
      return jsonResponse({ status: 'error', message: 'forbidden' });
    }

    const name      = String(data.name || '').trim();
    const attending = !!data.attending;
    const guests    = Number(data.guests || 0);
    const drinks    = Array.isArray(data.drinks) ? data.drinks.join(', ') : String(data.drinks || '');
    const comment   = String(data.comment || '').trim();

    if (!name) {
      return jsonResponse({ status: 'error', message: 'Имя не заполнено.' });
    }

    const sheet = SHEET_NAME
      ? (SpreadsheetApp.getActive().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActive().getSheets()[0])
      : SpreadsheetApp.getActive().getSheets()[0];

    // Проверка дубля по нормализованному имени.
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const names = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      const norm = normalize(name);
      for (let i = 0; i < names.length; i++) {
        if (normalize(names[i][0]) === norm) {
          return jsonResponse({
            status: 'duplicate',
            message: 'Такое имя уже подтверждено. Если вы хотите изменить ответ — напишите нам.'
          });
        }
      }
    }

    // Запись.
    sheet.appendRow([
      new Date(),
      name,
      attending ? 'да' : 'нет',
      guests,
      drinks,
      comment
    ]);

    // Опционально — письмо на свою почту.
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: `RSVP · ${name}`,
          body: [
            `Имя: ${name}`,
            `Будет: ${attending ? 'да' : 'нет'}`,
            `Гостей с собой: +${guests}`,
            `Напитки: ${drinks || '—'}`,
            `Комментарий: ${comment || '—'}`
          ].join('\n')
        });
      } catch (err) {
        // не блокируем основной ответ — просто логируем
        console.log('mail error', err);
      }
    }

    return jsonResponse({ status: 'ok', message: 'Спасибо! Мы получили ваш ответ.' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err) });
  }
}

// GET — для ручной проверки, что Web App жив. Откройте URL в браузере — увидите "ok".
function doGet() {
  return jsonResponse({ status: 'ok', message: 'rsvp endpoint alive' });
}

// ── Утилиты ────────────────────────────────────────────────────────────────

function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim();
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
