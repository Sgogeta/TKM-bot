const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0puQlNXSHpHRk1vY2Jyc3B4Ni9OTU5hY280SmFqc01NZHNxL0thYmoyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1ZMRlZabjJvNWJwTVBCK0lyT2hHQVhleHhKdFdGbUtZUzA2YTZFN1Yxaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTEhqbm1CeFR1QVgrSkRzSUd6ZlJTTnB4bFcvS0d3dENrbFgrUmdNZm1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEak5PUUdSS04rOWlmL3lSUU1iRlZnb0VmZnNiTUcwYUFuMVZ6Z05nT1E4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1IUXp2VmdLZ014RWxNeUhvekgrSStNSzdlS0hDK0FMOUorQ0RMV1dvR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRQb2p4d2tDQktLdFVNbjJXMFoveStSV00vYnJTOWJWVGE5NUVYc2Rkek09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0s4RjB6ZDFybXJOUkVnOEZpVjF1ZmRVTzkzb0RURDl2Q2hMeWVRUGswMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFBjVkZzNTJoZEJ5N2Z5NlhKd1R2eUZCK0ZBK2JSRnBwU0NvL1FsWVpoOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imk5OTkxNEVwTVZOa3g3VlkxNElrM0ZBRHpjOXpWMm1YbnZYUmFYbnJYZ2dEZTF1cHBiUnNvSDFnc0tlZXlpZStIcDF1d2d5dGpFa2NjUU9NK3NJd0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoidGpQMDRyK3ErV2NlWm84cFNqdGwwNGplSVEwY3QyTVpiR1d6TU5rZDlBTT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2MjAyMDM5NDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjFFMjNBNzA3Njg5QjlGM0Y3RTJBQzJGREY0NUVEOUUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjE3MTE2M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjIwMjAzOTQ3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRFQjUzMTMwOUMyMzUzMjcwNzA4NjM2REM2RjNFQUIyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIxNzExNjN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im5BNGp0Wm9tUXBhMG1BbkxkRmFDYnciLCJwaG9uZUlkIjoiMDZiNTI5YWYtZjM1OC00YTBkLTg2OTctZjRkZDQ4ZGZjZTcxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhLRXZIcWd3bU42YnZvQUtENVRrNmlmOXl4WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzdkFDaWZIOXVRL2RVQ2lzb2FVOStaeHJIMjg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVk4S0taWUMiLCJtZSI6eyJpZCI6IjIzNzYyMDIwMzk0NzoxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLilbDigL/ila/nqbTgvLrwnZWv8J2WivCdlpLwnZaU8J2WkyDwnZW28J2WjvCdlpPwnZaMIPCdlbjilbDigL/ila/nqbTgvLoifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BEd2pmTURFSXYrbUxVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1NbGFvdnlzblZwdHhPbUFvQTk4ZHczSGtqYUhTcFNGemZzSVFkZVpjRkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxmVUJWaC9YSFJEd3lVbDNUYkFmbnRUNXIzRU84T2MrKzVJSDhGMDVEZ003UE02bWRPcjB2SE1PMXlvNDVkL3J6enIxTjhCTFRTRWhaU2hZK3RUakFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOdHBBN2NNenNOekl2N2FiSkI4TmlET2JvU2l5RGpUT1NoOVZSTit2TFI2Q0dQcHFycGdmQURlK3hUcStNVVhNQjNENGY1SlZkRGxETzJlWUZXUlFEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzYyMDIwMzk0NzoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaakpXcUw4ckoxYWJjVHBnS0FQZkhjTng1STJoMHFVaGMzN0NFSFhtWEJRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTcxMTYwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZVdCJ9',
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
