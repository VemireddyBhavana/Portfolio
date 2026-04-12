function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append a new row with timestamp and form data
    sheet.appendRow([
      data.name,
      data.email,
      data.subject,
      data.message,
      data.timestamp || new Date().toLocaleString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (f) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": f.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
