var HEADERS = [
  'חותמת זמן','שם פרטי','שם משפחה','כיתה',
  'חוויה כללית','מוכנות לשירות',
  'יחס פיקוד','משמעת מותאמת','למידה מהמפקד',
  'פעילות מועדפת','תכנים עיוניים','קושי מרכזי',
  'דירוג אוכל','דירוג מגורים','מענה לצרכים','פירוט צרכים',
  'גיבוש','חברים חדשים',
  'שינויים מוצעים','המלצה','מסר לשנה הבאה'
];

function doGet(e) {
  e = e || {};
  var p = e.parameter || {};
  var cb = p.callback || '';

  try {
    var sheet = getSheet();
    var data = JSON.stringify(sheet.getDataRange().getValues());
    return respond(data, cb);
  } catch (err) {
    return respond('{"status":"error","msg":"' + err.message + '"}', cb);
  }
}

function doPost(e) {
  e = e || {};
  var p = e.parameter || {};

  try {
    var sheet = getSheet();
    sheet.appendRow([
      p.timestamp, p.firstName, p.lastName, p['class'],
      p.overallExperience, p.militaryReadiness,
      p.commandAttitude, p.disciplineAdequate, p.lessonFromCommander,
      p.favoriteActivity, p.theoreticalContent, p.mainDifficulty,
      p.foodRating, p.housingRating, p.personalNeeds, p.personalNeedsDetails,
      p.cohesionRating, p.newFriends,
      p.scheduleChanges, p.recommendRating, p.messageForNext
    ]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message);
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('תגובות') || ss.insertSheet('תגובות');

  // הוספת כותרות אם השורה הראשונה ריקה או לא מכילה את הכותרת הצפויה
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== 'חותמת זמן') {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  return sheet;
}

function respond(json, cb) {
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
