function doGet(e) {
  e = e || {};
  var p = e.parameter || {};
  var cb = p.callback || '';

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('תגובות') || ss.insertSheet('תגובות');
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
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('תגובות') || ss.insertSheet('תגובות');
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

function respond(json, cb) {
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
