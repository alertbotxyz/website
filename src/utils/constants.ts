export default {
    api: {
        url: `${import.meta.env.PROD ? "https://someapiurl" : "http://localhost:50451"}/api/v1`,
    },
};