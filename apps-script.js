// Google Apps Script — להדביק בכלים > Apps Script
// לפרוס כ-Web App: Execute as: Me, Who has access: Anyone

const SHEET_NAME = 'תגובות';

const HEADERS = [
  'חותמת זמן', 'שם פרטי', 'שם משפחה', 'כיתה',
  'חוויה כללית', 'מוכנות לשירות',
  'יחס פיקוד', 'משמעת מותאמת', 'למידה מהמפקד',
  'פעילות מועדפת', 'תכנים עיוניים', 'קושי מרכזי',
  'דירוג אוכל', 'דירוג מגורים', 'מענה לצרכים', 'פירוט צרכים',
  'גיבוש', 'חברים חדשים',
  'שינויים מוצעים', 'המלצה', 'מסר לשנה הבאה'
];

function doPost(e) {
  const sheet = getOrCreateSheet();
  const p = e.parameter;

  const row = [
    p.timestamp || new Date().toLocaleString('he-IL'),
    p.firstName, p.lastName, p.class,
    p.overallExperience, p.militaryReadiness,
    p.commandAttitude, p.disciplineAdequate, p.lessonFromCommander,
    p.favoriteActivity, p.theoreticalContent, p.mainDifficulty,
    p.foodRating, p.housingRating, p.personalNeeds, p.personalNeedsDetails,
    p.cohesionRating, p.newFriends,
    p.scheduleChanges, p.recommendRating, p.messageForNext
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const callback = e.parameter && e.parameter.callback;

  const json = JSON.stringify(data);

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  return sheet;
}
