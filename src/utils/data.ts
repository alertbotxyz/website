type changeType = "Added" | "Removed" | "Improved" | "Fixed" | "Updated";

const images = {
    "logo": "/images/logo.png",
    "create_template_example": "/images/alertbot_create_template.png",
    "discord_bot_example": "/images/alertbot_discord_bot.png",
    "user_avatar": "/images/alertbot_user_avatar.png",
    "send_alert_example": "/images/alertbot_create_template.png",
    "alert_history_example": "/images/alertbot_create_template.png",
    "add_server_example": "/images/alertbot_add_server.png",
    "default_avatar": "/images/alertbot_default_avatar.png",
    "open_tracked_trade_example": "/images/tracked-trade.png",
    "alerter_profile_example": "/images/alerter-profile.png",
};
const data: {
    blog: {
        data: {
            category: string;
            date: string;
            title: string;
            description: string;
            thumbnail: {
                url: string;
            };
            tags: string[];
            author: {
                name: string;
                avatar: {
                    url: string;
                };
            };
        }[]
    };
    changelog: {
        data: {
            version: string;
            date: string;
            description: string;
            updates: {
                title: string;
                description: string;
                changes: {
                    types: changeType[];
                    link?: {
                        text: string;
                        url: string;
                    };
                    description: string;
                }[];
            }[];
        }[];
    };
    core: {
        name: string;
        version: string;
        about: string;
        websiteUrl: string;
        contact: {
            email: string;
            feedback: string;
            development: string;
            privacy: string;
            terms: string;
            cookies: string;
            refunds: string;
        };
        socials: {
            patreon: string;
            twitter: string;
            github: string;
            discord: string;
        };
    };
    features: {
        title: string;
        description: string;
        icon: string;
        imageUrl: string;
        action: {
            text: string;
            url: string;
        };
    }[];
    legal: {
        privacy: {
            lastUpdated: string;
        };
        terms: {
            lastUpdated: string;
        };
        cookies: {
            lastUpdated: string;
        };
        refunds: {
            lastUpdated: string;
        };
    };
    premium: {
        plans: {
            free: {
                name: string;
                price: string;
                description: string;
            };
            premium: {
                name: string;
                price: string;
                description: string;
            };
            extra: {
                name: string;
                price: string;
                description: string;
            };
        };
    };
    images: {
        logo: string;
        create_template_example: string;
        discord_bot_example: string;
        send_alert_example: string;
        alert_history_example: string;
        user_avatar: string;
        default_avatar: string;
    };
} = {
    "blog": {
        "data": [
            {
                "category": "About",
                "date": "03/07/2022",
                "title": "About alertbot",
                "description": "In this blog I talk about what alertbot is, its history and its road-map.",
                "thumbnail": {
                    "url": "https://storage.googleapis.com/alertbot-images/examples/landing_page.png",
                },
                "tags": [ "Development" ],
                "author": {
                    "name": "Atom",
                    "avatar": {
                        "url": "/images/logo.png",
                    },
                },
                // "content": [
                //     {
                //         "type": "paragraph",
                //         "data": "This blog is still being written.",
                //     },
                //     {
                //         "type": "title",
                //         "data": "What is alertbot?",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "Alertbot allows you to create templates to enable alerting with maximum customisability. You can fully edit what your alert embed looks like and you can add parameters to the template.",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "Once you have created all the templates you need you can add servers to alert to. When you see a market opportunity enter values for your preset parameters and send the alert to all servers in one click.",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "Alertbot saves your alerts so you can view them a reflect back upon past alerts.",
                //     },
                //     {
                //         "type": "title",
                //         "data": "A history of alertbot",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": `
                //             I started working on alert bot back in ~August 2021 and was very close to releasing it before summer ended.
                //             However I never released it as I was having issues with compatibility on IOS browsers.
                //             This along with the fact that I was getting bored of the project meant that I never ended up releasing it.
                //         `,
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "However I am thankful I didn't as at the time I was not a great programmer and the product would be barely useable and people would likely not use it at all.",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "Eventually I came back to the project, almost a year later, with my improved skills and ability to produce a viable product.",
                //     },
                //     {
                //         "type": "paragraph",
                //         "data": "This time it was built way better, with more and better features and with a completely different framework (Svelte). I implemented various good practices into my code (unlike before) ensuring a better user experience and a reliable product.",
                //     },
                // ],
            },
        ],
    },
    "changelog": {
        "data": [
            {
                "version": "0.1.0",
                "date": "02/07/2022",
                "description": "Initial beta release for alertbot",
                "updates": [
                    {
                        "title": "Alerts",
                        "description": "Send alerts to your Discord server",
                        "changes": [
                            {
                                "types": [ "Added" ],
                                "description": "Send alerts to multiple servers at once",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "Preview alert in Discord-like UI",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "View alert history and stats",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "Retry failed alerts",
                            },
                        ],
                    },
                    {
                        "title": "Templates",
                        "description": "Templates allow you to have a preset format to send your alerts with",
                        "changes": [
                            {
                                "types": [ "Added" ],
                                "description": "Create, update and delete templates",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "Add, re-order and remove parameters within your template",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "Import and share templates",
                            },
                            {
                                "types": [ "Added" ],
                                "description": "Preview template in discord-like UI",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    "core": {
        "name": "Alertbot",
        "version": "Alpha v0.1.0",
        "about": "Create presets and templates for seamless alerting.",
        "websiteUrl": "https://alert-bot.xyz",
        "contact": {
            "email": "contact@alert-bot.xyz",
            "feedback": "feedback@alert-bot.xyz",
            "development": "development@alert-bot.xyz",
            "privacy": "privacy@alert-bot.xyz",
            "terms": "terms@alert-bot.xyz",
            "cookies": "cookies@alert-bot.xyz",
            "refunds": "refunds@alert-bot.xyz",
        },
        "socials": {
            "patreon": "https://www.patreon.com/alertbotxyz",
            "twitter": "https://twitter.com/alertbotxyz",
            "github": "https://github.com/alertbotxyz",
            "discord": "https://discord.com/invite/WpQT3jzfum",
        },
    },
    "features": [
        {
            "title": "Create Templates",
            "description": "Alertbot allows you to create templates to enable alerting with maximum customisability. You can fully edit what your alert embed looks like and you can add parameters to the template.",
            "icon": "dashboard",
            "imageUrl": images.create_template_example,
            "action": {
                "text": "Create a Template",
                "url": "/dashboard/templates/create",
            },
        },
        {
            "title": "Send Alerts",
            "description": "Once you have created all the templates you need you can add servers to alert to. When you see a market opportunity enter values for your preset parameters and send the alert to all servers in one click.",
            "icon": "white-bell",
            "imageUrl": images.send_alert_example,
            "action": {
                "text": "Send an Alert",
                "url": "/dashboard/templates/send-alert",
            },
        },
        // {
        //     "title": "Discord Bot",
        //     "description": "You can invite alertbot to your server to handle financial data for your users: stock charts, top news, whale alerts and more.",
        //     "icon": "bot",
        //     "imageUrl": images.discord_bot_example,
        //     "action": {
        //         "text": "Invite Alertbot",
        //         "url": "/redirect?link=bot-invite",
        //     },
        // },
        {
            "title": "Add Servers",
            "description": "You can add your bot to any server so you can send alerts to multiple servers at once.",
            "icon": "server",
            "imageUrl": images.add_server_example,
            "action": {
                "text": "Add a Server",
                "url": "/dashboard/templates/servers",
            },
        },
        {
            "title": "Alert History",
            "description": "Alertbot saves your alerts so you can view them a reflect back upon past alerts.",
            "icon": "history",
            "imageUrl": images.alert_history_example,
            "action": {
                "text": "View Alert History",
                "url": "/dashboard/account#alert-history",
            },
        },
        {
            "title": "Tracked Alerts",
            "description": "Structured alerts for which stats are tracked allowing you to evaluate your alerts and see how they are performing. At the end of the week you can send a recap of your alerts to your servers.",
            "icon": "chart-white",
            "imageUrl": images.open_tracked_trade_example,
            "action": {
                "text": "Track Your Alerts",
                "url": "/dashboard/tracked/open-trade",
            },
        },
        {
            "title": "Alerter Profiles",
            "description": "You can setup an alerter profile which people can view to get a brief understanding on  your alerts and find your social media links.",
            "icon": "profile",
            "imageUrl": images.alerter_profile_example,
            "action": {
                "text": "Setup Your Profile",
                "url": "/dashboard/account",
            },
        },
    ],
    "legal": {
        "privacy": {
            "lastUpdated": "09/07/2022",
        },
        "terms": {
            "lastUpdated": "28/05/2022",
        },
        "cookies": {
            "lastUpdated": "28/05/2022",
        },
        "refunds": {
            "lastUpdated": "25/06/2022",
        },
    },
    "premium": {
        "plans": {
            "free": {
                "name": "Free",
                "price": "0.00",
                "description": "For small alerters",
            },
            "premium": {
                "name": "Premium",
                "price": "9.99",
                "description": "For medium alerters",
            },
            "extra": {
                "name": "Extra",
                "price": "19.99",
                "description": "For large alerters",
            },
        },
    },
    images,
};

export default data;