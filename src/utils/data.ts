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
        contact: {
            email: string;
        };
        socials: {
            patreon: string;
            twitter: string;
            github: string;
            discord: string;
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
        "contact": {
            "email": "contact@alertbot.net"
        },
        "socials": {
            "patreon": "https://www.patreon.com/alertbot",
            "twitter": "https://twitter.com/alertbot",
            "github": "https://github.com/alertbot",
            "discord": "https://discord.gg/YzjQZjX"
        },
    },
};

export default data;