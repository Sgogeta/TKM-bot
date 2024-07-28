const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Viay9BYjkrbDl1UllWcXBJenRvYU5pMHdTdk9wVURzQnV1L2Q2aDZVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUR3WmhuelhzZ3lLeE5DMTVCTGdTZ1YxNENjcmVJZWZGS3V3ekZ3MkRVTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtS0ZGOVYzMC8vYk1pS0E3clRjWFdaaUF2TWdPcStnWmpmb2ZZS2tJeW1NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1WklsaGJ1KytXby81TE9zTldGR1M4TDFTS21pajdrZ1BOWnpFVGovVUZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJGblhWNUpVd1pJZUpTMkhaWEdFSU5pckpXMDJPNWFwbHliSjR6Q3hNR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBINWFubWxJZHdreWp3em5oNEs1QkdFeVgyWEE4b25ENVpyTFdQNXBWeXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJIYzR5YWdiR2ZCQXNpdUI2LzRJdTh6M255YWRLSEdGZFdrRkdDa0JHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWi9tNmF2K1NBTFVCenRyT3F5WlhpaXk0Y1BWTW80b29KNXdPYks3aDhscz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI3QjNrSjRMY2FCNS9iaDVZSUJwcnQvSWxYSnZCL3FocWNTUFluTzIycVR5cUl0bUJWc2J2cDIwUHl5M0t4dWlxVHFMejZiMTlJOEVDVDQ5emJDY0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY1LCJhZHZTZWNyZXRLZXkiOiI3disxWGVHSllnRm9MbE1FMm82dXNJeVc2czd6MzZZK2pnS0MycTk3cGdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNzYyMDIwMzk0N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NjkyQ0U5NDdBODk1QkUxN0UwOEIwMUQyMjA2OUQyMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMTcwMjQ5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2MjAyMDM5NDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjgyNjQ1MTFDMjlBRDEwRkI4NUVCQUEzQTZGRUM5QjcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjE3MDI0OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiX1p4cHRZczNUYUNHcFFuNlpucWJjdyIsInBob25lSWQiOiI4ZTZjNmY3My0yYjk4LTRkNTItOWQyOC0yOWFiZGYzOGViZGMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2I0aDE4aG50MHVLRk5ybUhxbDQ3M05KRnlJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InB3OU5Sam9rbk51SkY3dCs2V0dtbWJzclVVTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJRM1dXM0pGQyIsIm1lIjp7ImlkIjoiMjM3NjIwMjAzOTQ3OjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKVsOKAv+KVr+eptOC8uvCdla/wnZaK8J2WkvCdlpTwnZaTIPCdlbbwnZaO8J2Wk/Cdlowg8J2VuOKVsOKAv+KVr+eptOC8uiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUER3amZNREVQcjJtTFVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibU1sYW92eXNuVnB0eE9tQW9BOThkdzNIa2phSFNwU0Z6ZnNJUWRlWmNGQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibm1LOTdObkJXQ2tLZTV5MVN6akU5RFJMT0g3NTQ0ckYxaVpYZDdpVU5DMlN3K0hHZC9LNEwwRWFlbWhETG93Y3UyY2EzL0w2b0liSGoxK2MvckJ1QlE9PSIsImRldmljZVNpZ25hdHVyZSI6InZoc3l5SC9wclNUYkc0Y2dYZWc5ZWQwMFJBM3IzaUhzRzgrZ2NpbzBaamVPYlVzZ2N1MVlrNUtrd3EzUUZIUFI2dGlmd2I5T1BQQkxmM1o3c0hRWkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjIwMjAzOTQ3OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpqSldxTDhySjFhYmNUcGdLQVBmSGNOeDVJMmgwcVVoYzM3Q0VIWG1YQlEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIxNzAyNDcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRlUwIn0=',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "◥꧁ⓘⓣⓐⓒⓗⓘ ⓤⓒⓗⓘⓗⓐ◥꧁",
    NUMERO_OWNER : process.env.OWNER_NUM || "237698459117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '╰‿╯穴༺𝕯𝖊𝖒𝖔𝖓 𝕶𝖎𝖓𝖌 𝕸╰‿╯穴༺',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/31442555f379e8c40b4ac.jpg',
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
