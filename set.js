const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0FPbVhkOUIyeWRaanlJMTNibUFWZkk3d3lSY2NHUTExcDR0NzNvNndYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnY2ajBiZmI0VVIzUWJNWWRDdHhXRGc3Z0p6UDFyNDhiZzVNY0JEd3h5MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRRlRaeVE3WGlENlpYd0pqTmZYRFI4MlUzVTBoMVJMNHY2UlBpcWJDeEhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPL3JBZTEwS210MDgzL1UrNDZsQjlsUVdubkFsMVdIRHUzSmEwQU03N2dRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNdUdWNzdCTkhxYncvaXg1Zk9pSWUwNXI2WU0rWGNXcXAxUWtNdU9DSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNkbVFjYjY4dXpRNnlvZXc4L3RtRUJiZGQrTnNSOGVYODZLdVM5QlZGUjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JWaVIremg5ZDN4aDRhcGpBa2hHdkl5NUlVQmpoTGp2ZlhoSWx5cWVFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzJQdVVyblVUUHVQaVhNQ3VUNTFRS253U0NYRzN0TS80NEZkNGFYOHJBQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA3WkozLzZOcWdtM1NReWlpTzBqRnZTUTNNMnk4QW1lY2N5bjh4enlzbCttNjgxZWZRcTNXaFQwYUpaMlowRUhUK1RqcWtOaGl1cmhvcWwxM0w0d0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJZV29YamEybytpUW5td2tMS0FFTW9mVUwxdFEvL0RsNUYxTlhpeXZzNFRvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxMXhuU0dEX1Q1VzVfdXRwelZGMlJnIiwicGhvbmVJZCI6ImE3YzNhYzNhLTNlNTEtNGQxZi04YjEzLTFlYTVkNDUyZWY0NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVODBtSklrdXZuNi9RSWs0L1lmcFErNHkvcFU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkVjRzR4Zk0wdEtoQXdRbk5JV0l3NFZIQkZZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjIzWDVYUUxXIiwibWUiOnsiaWQiOiIyMzc2OTg0NTkxMTc6NTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tTYzJNY0VFTlRubUxVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldrWnpHT3N2bUV2UXBENW16T0JwQW91N0xpK3lTekdJN080QmNaRzZtd3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im5teGU5dEJPQ3ZReGhZcHVONHJOOVE1Y2ZhRXozdjNPNXJLWXp1aWdKZFhnbER1UXIyc3hZNmYzZXRMaTcyUXdGaHZPTG42d2pEak5VcWNJelM5TEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0YlEyRlFQVVZycTN6MnZuQ3k2OHF4b2w0K01wZFdUYUFEWXYzTW5VT0pBK0lKQWFrZDIzOHhneWFYMlFSVysrb3VPbmVFbDhseXBMeEh2amJnZVRBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5ODQ1OTExNzo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWcEdjeGpyTDVoTDBLUStac3pnYVFLTHV5NHZza3N4aU96dUFYR1J1cHNMIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTY4Mjg5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlZZSJ9',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "◥꧁ⓘⓣⓐⓒⓗⓘ ⓤⓒⓗⓘⓗⓐ◥꧁",
    NUMERO_OWNER : process.env.OWNER_NUM || "237698459117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '╰‿╯穴༺𝕯𝖊𝖒𝖔𝖓 𝕶𝖎𝖓𝖌 𝕸╰‿╯穴༺',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/ac3671f18ecfccf15d787.jpg',
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
