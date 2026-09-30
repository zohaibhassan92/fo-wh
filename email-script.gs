// Google Apps Script - FlameOn Inventory email receiver (PCA + WH)
const TO = "zohaibhassan.atd@gmail.com";

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const i = d.info;
  const att = [Utilities.newBlob("\ufeff" + d.csv, "text/csv", d.base + ".csv")];
  if (d.pdf) att.push(Utilities.newBlob(Utilities.base64Decode(d.pdf), "application/pdf", d.base + ".pdf"));
  const role = i.role || "Branch Manager";
  let subject = (d.title || "PCA End Count");
  let body = "";
  if (i.br) { subject += " - " + i.br; body += "<b>Branch:</b> " + i.br + "<br>"; }
  subject += " - " + i.date;
  body += "<b>" + role + ":</b> " + i.mgr + "<br><b>Date:</b> " + i.date +
    "<br><b>Start:</b> " + i.start + "<br><b>End:</b> " + i.end +
    "<br><b>Total Filling Time:</b> " + i.dur;
  MailApp.sendEmail({ to: TO, subject: subject, htmlBody: body, attachments: att });
  return ContentService.createTextOutput("ok");
}
