export default {
    api: {
        url: `${import.meta.env.PROD ? "https://api.alert-bot.xyz" : "http://localhost:50451"}/api/v1`,
    },
};