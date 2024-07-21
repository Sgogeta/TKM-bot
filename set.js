const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU5YR1dmVGpyTXNUMmFCa09OQW5PNUwzTjQrZ2ZOUS9MSU1FbUJWeXJWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05oaE5iWHBiekF2VUF2ZzU3UkNMS011cHkydXZzSmt5TGJzOUczQlBnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SlJDWVMvS016cFRrUzdpNmhvZUR1RU1Pb1EvTEg0TEJ6cytQQmRMWjFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQ2t6YmJoOEFtbVJPWjVnSE9XRU1HUllINzhRT25wdWtPdTZBRTZCamxzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9LZUZvQzAxV0o1Tk9mMlczN2RNQlk5QnRwVm1DRzdNZUM4U1hEZUtEMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNxdEllaTY4eGYrZm5FSzI1cVJMSHRXQTJNRGdHQzVqOW1rTEJncmpIbVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0VmWW9acE5UQ2VwekJUVFpyZDM5MllPeTNIcmthN0RYL1VhNzdxYmxrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUpXc1pQSUtLczZjQ0lQQSszOHJMVU5ESUZVSlBLbDQyNFBxWWtscnJpcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJrR1Y3b3BsNDVKNFgwNFZUZmxXVXVyaVMwUmU5UGp6eXZFNjRPMzNWR25md1ljVTFqVEdnRzlqZE0xa05uN0Q4VFhDUVRack5xVTZadWdHem5kYkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzIsImFkdlNlY3JldEtleSI6IkppZkxVdStGMXlUM1NkOStlSHNTbUhNZGNjcmtySlBleHZsZUhBZVE1bGc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFILTZack9rU3JHN2JNVzFMdTk4ZGciLCJwaG9uZUlkIjoiZmI0MWU2MDYtNjlhYS00OGNkLWI5ZmEtNDM2YmM5ZmIwMjYxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRFTGxjR3dKc0ZhSDFLZk5FQ0h4V3VGbUozOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJReUkxa0QySEdaT285cVduajIyVHN6a2c4RDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMVdEREhMRUYiLCJtZSI6eyJpZCI6IjIzNzY5ODQ1OTExNzo0N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0djMk1jRUVOaUY4N1FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV2taekdPc3ZtRXZRcEQ1bXpPQnBBb3U3TGkreVN6R0k3TzRCY1pHNm13cz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiK0Z0N3dBRFFQbG03d21oTVEvSnpSc1p3dEtiNGZFMmVoRWNLaEpWYTBCMnV1dmREOFIrQXBjZm94NmMraVRMSW5LbnM3TGdGaTdxc0ZEcy9LVjVDQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IkVPMzlodEdpMmI3RzROWkt3MExkMGp5VGN6VnQwV2E1UEh1NEVBc2xPdG1PbWQ4MHhjWS8zTEltYlpzREg5eFNkKzdOcyttWWhOcTNVM3ZQVXpLd0NBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3Njk4NDU5MTE3OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZwR2N4anJMNWhMMEtRK1pzemdhUUtMdXk0dnNrc3hpT3p1QVhHUnVwc0wifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE1NDk1NDEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSVllIn0=',
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
