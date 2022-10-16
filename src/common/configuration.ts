export default () => ({
    port: +process.env.APP_PORT,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,

    table: {
        template: process.env.TABLE_TEMPLATE,
        id: process.env.TABLE_ID,
        sheet: process.env.TABLE_SHEET,
        path: process.env.TABLE_PATH,
        filename: process.env.TABLE_FILENAME,
    },

    telegram: {
        token: process.env.TELEGRAM_TOKEN,
    },

    database: {
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
});
