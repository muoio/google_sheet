const keys = require('./sheet-api-352807-77b71aa2fef2.json');
const { google } = require('googleapis');

const sheets = google.sheets('v4');


let email = keys.client_email
let keyFile = null
let key = keys.private_key
let scopes = 'https://www.googleapis.com/auth/spreadsheets'
const jwtClient = new google.auth.JWT(email, keyFile, key, scopes)


let SHEET_ID = '1Kuy2qAJEzwNFU2u5fO4T7kdvyE3yAzsfTgom0yf7VT0'
async function read_data(){
    const response = await sheets.spreadsheets.values.batchGet(
     {
        spreadsheetId: SHEET_ID,
        ranges: ['Sheet1!A1:E4'],
        auth: jwtClient,
     }
    );

    return response.data.valueRanges[0].values;
}

async function append_data(){
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: ['Sheet1!A2:C'],
      auth: jwtClient,
      valueInputOption: "RAW",
      resource: {
         values:  [['Ton Ngo Khong', 21, 'King of Monkeys'],['Kim Jong Un', 30,'President']]
      }
   });
}

async function write_data(){
      const response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SHEET_ID,
      auth: jwtClient,
      resource: {
         valueInputOption: "RAW",
         data: [{
            range: "Sheet1!E2:F",
            values: [[1, 2], [3, 4]],
         },
         {
            range: "Sheet1!H2:I",
            values: [["haha", "hehe"], ["huhu", "hichic"]],
         }
         ],

      },
   });
}

(async () => {
    console.log(await read_data());
    await write_data();
})();

