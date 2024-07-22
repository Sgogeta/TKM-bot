const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEZzSGNSbGJIVHNlT0lBN3ZDYk50bmw2Y3lkbEtwbDA1ZFJ0K1drNDBsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTRWY2JlZ3hlUzNtQ1QxTXpvMGlsUVY1TlpLNFd3OVFteDFQTldwcm1FST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSVNKZTVwbjNQbEFLWkF5RGJIMC9WY2RaNnluT0s5cmJKODRQSkJ1dDM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJocUY1ZFAvSFdhYjE5bmx6cGNLMEdoTmFpNTZWam9wc1FTOWFYOXVFQnhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDUkhSRjJMZnVQaFhBUjFLOFZSd08wcFE3ck9jck5JUmkvYzhvNkhkVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1VNXNaZGdvRHltSTU4blhQNkhSa1JOYS9rRkczb0FLaktUMUtSVlFnQzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUpBYUJGMm5JVFRJQmtFQVVLOEMrMWtFRm5vOG0wOHUwdHNDb1FxWUZuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZG1jUXd0RC8yM1FDM3pYSURYN3dWT3hUNytSc0tERTY3OEtMZWNScFozMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpyL1BBNysyVHRhUFgzTVplZ0VMbEtCYUQyeEhLdVZUR3pjK0lXN2ptNEk2cFFGZHU1TDdzOUpQdFRVeVU3a3JER0F6Rk85S2V5elQ0aTVuK283YUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMzLCJhZHZTZWNyZXRLZXkiOiJDR2pjVllpTm9UWlFFT29rRlkxYWtvdjRIR0JoeG9uakM1VHE0QTRtd0d3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0R0loNWJyTlF4cXJnNWV3NF91N1dRIiwicGhvbmVJZCI6ImUxZTExOGVhLTIxOGQtNGJmNi04MmRmLTAyMGMzZGYyNjBhOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4dDQyRTVNbm1FRW1GR3ltZzB0dmFoTnArRjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmdrL2lUMllIMGx5N0Z5SEI5ZnlMdlBSRXFJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllUSDNTQkIzIiwibWUiOnsiaWQiOiIyMzc2OTg0NTkxMTc6NTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tTYzJNY0VFUERVKzdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldrWnpHT3N2bUV2UXBENW16T0JwQW91N0xpK3lTekdJN080QmNaRzZtd3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlAvc21CeUZPS0h2bjY5VDh3MW5JcmxYTk5RenNhdG0yOVljK2lucDhoRldkcmFXU3VLVmliNTZEMGVWaExPbDZpbThNN2pZUWIrbFBwdXdVcTFHZkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuQUQzY3ZjcitFZExvME5ZRXRiWTJJNXJieTd0cjlBSFRCM28rZkZKQkVvZFN2VUNucUIzejFYMWVyNC82SWdwdkxKREJGbmZIRWNwemxVeG9RSExDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5ODQ1OTExNzo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWcEdjeGpyTDVoTDBLUStac3pnYVFLTHV5NHZza3N4aU96dUFYR1J1cHNMIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNjkwNzQ5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlZZSJ9',
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
