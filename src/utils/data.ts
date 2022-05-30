type changeType = "Added" | "Removed" | "Improved" | "Fixed" | "Updated";
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
            content: {
                type: "title" | "paragraph";
                data: string;
            }[] | {
                type: "image";
                data: {
                    url: string;
                    alt: string;
                };
            }[];
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
            privacy: string;
            terms: string;
            cookies: string;
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
    }
} = {
    "blog": {
        "data": [
            // {
            //     "category": "Development",
            //     "date": "28/05/2022",
            //     "title": "Developing alert bot",
            //     "description": "In this blog I talk about how development of alertbot started and progress of it.",
            //     "thumbnail": {
            //         "url": "https://storage.googleapis.com/alertbot-images/dashboard-create-template.png",
            //     },
            //     "tags": ["Development"],
            //     "author": {
            //         "name": "Atom",
            //         "avatar": {
            //             "url": "https://storage.googleapis.com/alertbot-images/logo.png",
            //         },
            //     },
            //     "content": [
            //         {
            //             "type": "title",
            //             "data": "A history of alertbot"
            //         },
            //         {
            //             "type": "paragraph",
            //             "data": "I started working on alert bot back in ~August 2019 and was very close to releasing it before summer. However I never released it as I was having issues with compatibility on IOS browsers. This along with the fact that I was getting bored of the project meant that I never ended up releasing it. However I am thankful I didn't as at the time I was not a great programmer and the product would be barely useable and people would likely not use it at all."
            //         }
            //     ]
            // }
        ]
    },
    "changelog": {
        "data": [
            // {
            //     "version": "0.1.0",
            //     "date": "28/05/2022",
            //     "description": "This is the main description for the whole update",
            //     "updates": [
            //         {
            //             "title": "Change 1",
            //             "description": "This is the first big change in the update",
            //             "changes": [
            //                 {
            //                     "types": [ "Added", "Improved" ],
            //                     "description": "This is a small change 1 in the update"
            //                 },
            //                 {
            //                     "types": [ "Added", "Improved" ],
            //                     "description": "This is a small change 2 in the update"
            //                 },
            //             ]
            //         },
            //     ],
            // }
        ]
    },
    "core": {
        "name": "Alertbot",
        "version": "Alpha v0.1.0",
        "about": "Create presets and templates for seemless alerting.",
        "websiteUrl": "https://alertbot.net",
        "contact": {
            "email": "contact@alertbot.net",
            "privacy": "privacy@alertbot.net",
            "terms": "terms@alertbot.net",
            "cookies": "cookies@alertbot.net"
        },
        "socials": {
            "patreon": "https://www.patreon.com/alertbot",
            "twitter": "https://twitter.com/alertbot",
            "github": "https://github.com/alertbot",
            "discord": "https://discord.gg/YzjQZjX"
        },
    },
    "features": [
        {
            "title": "Create Templates",
            "description": "Alertbot allows you to create templates to enable alerting with maximum cusomisability. You can fully edit what your alert embed looks like and you can add parameters to the template.",
            "icon": "bxs-dashboard",
            "imageUrl": "https://storage.googleapis.com/alertbot-images/alertbot_create_template.png",
            "action": {
                "text": "Create a Template",
                "url": "/dashboard/templates/create",
            },
        },
        {
            "title": "Send Alerts",
            "description": "Once you have created all the templates you need you can add servers to alert to. When you see a market oppurtunity enter values for your preset parameters and send the alert to all servers in one click.",
            "icon": "bxs-bell",
            "imageUrl": "https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png",
            "action": {
                "text": "Send an Alert",
                "url": "/dashboard/templates/send-alert",
            },
        },
        {
            "title": "Discord Bot",
            "description": "You can invite alertbot to your server to handle financial data for your users: stock charts, top news, whale alerts and more.",
            "icon": "bxs-bot",
            "imageUrl": "https://storage.googleapis.com/alertbot-images/alertbot_discord_bot.png",
            "action": {
                "text": "Invite Alertbot",
                "url": "/redirect?link=bot-invite",
            },
        },
        {
            "title": "Alert History",
            "description": "Alertbot saves your alerts so you can view them a reflect back upon past alerts.",
            "icon": "bx-history",
            "imageUrl": "https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png",
            "action": {
                "text": "View Alert History",
                "url": "/dashboard/account#alert-history",
            },
        },
    ],
    "legal": {
        "privacy": {
            "lastUpdated": "28/05/2022",
        },
        "terms": {
            "lastUpdated": "28/05/2022",
        },
        "cookies": {
            "lastUpdated": "28/05/2022",
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
};

export default data;