export default {
    api: {
        url: `${import.meta.env.PROD ? "" : "http://localhost:50451"}/api/v1`,
    },
};