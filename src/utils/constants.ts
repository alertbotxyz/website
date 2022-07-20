export default {
    api: {
        url: `${import.meta.env.PROD ? "https://api.alert-bot.xyz" : "http://localhost:50451"}/v1`,
    },
    env: import.meta.env.PROD ? "production" : "development",
    daysOfTheWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
};