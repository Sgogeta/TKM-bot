const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Y3T0JqbDUzRzhTQ29mNVJ1djY1ekRXcys3ZGhUc1FyZFk4Tkp0bHNrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXJOT3MrZ09HUEdRVjM0WnhPOFhaTXdTeW9WSzZWWWpxWWNnaFN4Nzh4VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSkNaZWFXQlFiUDJFU1gwek1RRUliUGZqV3NkamF3bnRqMHZUdzA1V2xJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZldQRHc5OHpXTnlqZncrL1pGMWdhbzA2MnIza2VwS2daTDdSVE5LOGtjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQeXpBV1pxOWhRbkRoV0tURzBxNUxjd3RwMmRneEtVTnpFdEN0UFFtV2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg5cWErcThLK2h3a01iODdCSVlsc3BHQzVZMm11V1FzblNORnBoRmFkU0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUI1UlA2T1N1VTBmRjF1cjVmbEM4a25ZcG5JNjBHT1lTSUovSVFKV3ltYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDExQ3FDTkxPWFIvb2Z6ZEduWjloaVIxUnJXQ0hzZGR5Y1JRTDNJSnAwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ2ZUZJVGRkMmg1YXpqV1VIaDFEbmhmei9XOWk4enNvWTFWc1RHTXJuNTV4Um4xZDVHNHgxY2prTnJhdkFMTkR3Q2JndDJrOENhWHp4TkdiSUM0bWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMsImFkdlNlY3JldEtleSI6Ikp2L0NlT1N6bllmblJEc3Z6cE9zeUM2eVV3eXYxRnpodVdDZVU4RFBHSmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjIwMjAzOTQ3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZBNjkxRDkzMkM1RDNBODUzODUzNUIyNDEyNzREQjQ5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIxNzY0OTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzYyMDIwMzk0N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENTUwMEJDMzMxOEVCRTE4NjMzOUE4RTI5QkFCNzE1MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMTc2NDkzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnSzNWSjBWWFQwcTZyWm01TmEwaU9BIiwicGhvbmVJZCI6ImY4ZWRjMWQyLWRiYTktNDQwZS1hYjExLTdmNWNlNjUyMzU3NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZNHNKR2ptQ1laLzV6NjJzY1VDbE1xSVU1Z1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnFzcXpHLzJVUTd0VmpiWkJiN3BVaFI2bTZrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhMVzZCUjIzIiwibWUiOnsiaWQiOiIyMzc2MjAyMDM5NDc6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4pWw4oC/4pWv56m04Ly68J2Vr/CdlorwnZaS8J2WlPCdlpMg8J2VtvCdlo7wnZaT8J2WjCDwnZW44pWw4oC/4pWv56m04Ly6In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQSHdqZk1ERU4ybm1iVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtTWxhb3Z5c25WcHR4T21Bb0E5OGR3M0hramFIU3BTRnpmc0lRZGVaY0ZBPSIsImFjY291bnRTaWduYXR1cmUiOiJWS0huSDFqU0tpcWpCSzRORXMvdHpVWHNFTEd1Q0s5UTBja0tqY0wzcmF3U25DUXl4UWJKY01sdTVHT1dRVU4yWDZhSUVZc29jR0FLd2VZSmNPb21CZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWjQ1V0JqVy9ZaTYzSXNNcWxXWkNObzNQQy9vTnBIdW51aFZKUU1xN1ljRHVOby9LaHpUZTAvUThDampmak1WUkhyZGhWelV2VVhHcTdvNmpKSlYrakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2MjAyMDM5NDc6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmpKV3FMOHJKMWFiY1RwZ0tBUGZIY054NUkyaDBxVWhjMzdDRUhYbVhCUSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjE3NjQ5MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGVTMifQ==',
    PREFIXE: process.env.PREFIX || "/",
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
