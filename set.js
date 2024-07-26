const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFBUkVFaWZUekppRTZnY3dJVGFVMW1NZnFLclVRVG04c3pWREQ3eiszbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDFHbG5oS1dYYS94c1QyUFNUTXN0TXNNRUlCTHp3Zjg1c1dVdHRhYWJWcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxT3A3KzRnRGNuVkhOdTNKai9lbXBUMFVBaTFXZXIvbldLOGRsNTkzWjJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVb0NyZmVyNFBBa2JxR09ham9jWWVMMGtiVDJWNFlOakVjbUVmaDNmV2dFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVBVmxPRFZtVkw0R2NTamMzMFNkTEw1WXVQelNoTFRTZ2N2ZVZKT25Pbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM1UlZMV1l0NWM4SURrWjFHUFRJNEg3elhIVmREYkt5RTROTGpuZUt5UzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUxFazEzNXBqOGpPMFhQbzU4V0xOK1pkYUJvMGFiK3dhS2pkUGF4aVNscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmVpSjdBOUNaN2xEWXNOME9idjFKYnNNTVZ1c1BWcy9LdVlPdW9OcEVRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdDZTdHcmc4VjdnNUN2QWpjSVpEZ2pFdEtiWlRPTGVlRjZuNGxlM2dtS2NhRzkzb0ZzNkdUbFYzY2IvYlFzUjFPVnZJTktreFJZUXBUR0VBRWJWTGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk1LCJhZHZTZWNyZXRLZXkiOiJvSkZxT3BCTFVXK1lzMzVFblRVeC8zWWtPMUxkeVN3ZzljcGFCWG1JT2wwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjRUdhbHZMYlNELUtOZS1CVERKVGJBIiwicGhvbmVJZCI6ImQ0YzYxMjNmLTFkZWQtNDEzZS04NTc5LWUyNGNkOGExYjU2YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqQjVmYndtU1R1a2hyVHZZOVJLcnFvWkw3RDg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU5CTjNpRUZzWWo1YXc0eXU5K0FidGhsZ3A0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQxVk1TR0UyIiwibWUiOnsiaWQiOiIyMzc2MjAyMDM5NDc6OUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzd3amZNREVNRHZrTFVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibU1sYW92eXNuVnB0eE9tQW9BOThkdzNIa2phSFNwU0Z6ZnNJUWRlWmNGQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibWE2ZHZCeU1meHFLMDloUlFKRTRHbXZ3R0NqRHp6eW1Xd1kwWDhNS3I3NUszT1IzR3U1M2VBZk5rYkdodEhkVEhVMWFqcmRGQmVvSi9weFZlWHB2Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6InRkUlFmM0VqOW5KZVpYZFZhOTNnbEkvWnpISmNyUjNJMkJCdDlrRWZzRDc2VU1YRjV5SFFSSjE1Smdjc0ZRalJjMXZPWG1CbUFnMW5rTy9uM1RybWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjIwMjAzOTQ3OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmpKV3FMOHJKMWFiY1RwZ0tBUGZIY054NUkyaDBxVWhjMzdDRUhYbVhCUSJ9fSx7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzYyMDIwMzk0Nzo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpqSldxTDhySjFhYmNUcGdLQVBmSGNOeDVJMmgwcVVoYzM3Q0VIWG1YQlEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIwMzgyNzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRlV0In0=',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "◥꧁ⓘⓣⓐⓒⓗⓘ ⓤⓒⓗⓘⓗⓐ◥꧁",
    NUMERO_OWNER : process.env.OWNER_NUM || "237698459117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '╰‿╯穴༺𝕯𝖊𝖒𝖔𝖓 𝕶𝖎𝖓𝖌 𝕸╰‿╯穴༺',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/cd80a3edacc1b1f56537b.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
