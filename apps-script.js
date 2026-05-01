function doGet(e) {
  var p = e.parameter;
  var cb = p.callback;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('תגובות') || ss.insertSheet('תגובות');

  if (p.firstName) {
    sheet.appendRow([
      p.timestamp, p.firstName, p.lastName, p['class'],
      p.overallExperience, p.militaryReadiness,
      p.commandAttitude, p.disciplineAdequate, p.lessonFromCommander,
      p.favoriteActivity, p.theoreticalContent, p.mainDifficulty,
      p.foodRating, p.housingRating, p.personalNeeds, p.personalNeedsDetails,
      p.cohesionRating, p.newFriends,
      p.scheduleChanges, p.recommendRating, p.messageForNext
    ]);
    var ok = '{"status":"ok"}';
    if (cb) return ContentService.createTextOutput(cb + '(' + ok + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(ok).setMimeType(ContentService.MimeType.JSON);
  }

  var data = JSON.stringify(sheet.getDataRange().getValues());
  if (cb) return ContentService.createTextOutput(cb + '(' + data + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}
