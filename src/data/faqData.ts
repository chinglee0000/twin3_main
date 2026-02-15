import type { InteractionInventory } from '../types/a2ui';

export const FAQ_INVENTORY: InteractionInventory = [
    // ============================================================
    // CORE PHILOSOPHY & VISION
    // ============================================================
    {
        id: 'faq-01',
        triggers: ['core goals', 'vision', 'data values', 'what is twin3'],
        response: {
            text: "Simply put, we want computers to truly understand \"who you are.\" We transform your experiences, thoughts, and tastes into a \"digital twin model\" that machines can understand (think of it as your Digital DNA). This data becomes a permanent digital ID (SBT) that belongs only to you and cannot be taken away. We believe this data represents valuable labor, so when companies use it, you deserve to be paid.",
            delay: 600
        }
    },
    {
        id: 'faq-02',
        triggers: ['future', 'long-term vision', 'human-machine', 'symbiosis'],
        response: {
            text: "To establish a human-centric Web3+AI infrastructure where experience is the core asset, moving towards a new civilization of symbiotic collaboration between human experience and AI agents.",
            delay: 600
        }
    },

    // ============================================================
    // TECHNICAL SPECIFICATIONS (TWIN MATRIX)
    // ============================================================
    {
        id: 'faq-03',
        triggers: ['twin matrix', '256 dimensions', 'how matrix works'],
        response: {
            text: "Think of it like a comprehensive scorecard that describes your traits using 256 different indicators. It records your real-world senses (Physical Dimension), your online skills (Digital Dimension), your social circle's culture (Social Dimension), and your inner values (Spiritual Dimension). The system gets to know you through fun quizzes or by connecting your social accounts, and the more tasks you do, the better it understands you.",
            delay: 600
        }
    },
    {
        id: 'faq-04',
        triggers: ['physical dimension', 'spiritual dimension', 'commercial value', 'why collect data'],
        response: {
            text: "It's very useful! For example, the \"Physical Dimension\" helps restaurants know what flavors people like. The \"Spiritual Dimension\" quantifies your moral standards to teach AI right from wrong, helping train AI models that are more empathetic and human-like.",
            delay: 600
        }
    },
    {
        id: 'faq-06',
        triggers: ['3d poa', 'proof of authenticity', 'verify human', 'not a bot'],
        response: {
            text: "Our 3D Proof of Authenticity doesn't just confirm \"you are human\" (like scanning an iris). It goes further to prove \"you are trustworthy\" and \"what kind of person you are.\" This allows companies to find the \"right person,\" not just \"any living person.\"",
            delay: 600
        }
    },
    {
        id: 'faq-07',
        triggers: ['sdk', 'developer', 'api', 'build on twin3'],
        response: {
            text: "We provide a toolkit (SDK) that allows other Apps or games to use twin3's identity system. They can even issue their own digital certificates (SBTs) and connect directly to our data marketplace.",
            delay: 600
        }
    },

    // ============================================================
    // BUSINESS MODEL & REVENUE
    // ============================================================
    {
        id: 'faq-05',
        triggers: ['market value', 'competitive advantage', 'moat', 'vs web2'],
        response: {
            text: "Investing in twin3 is investing in the future \"Experience-as-a-Service\" market. Our biggest advantage is that we are willing to share 70% of the value with users. Big companies like Google or Facebook are used to taking user data for free, so they can't easily copy our profit-sharing model. This is our strongest defense (moat).",
            delay: 600
        }
    },
    {
        id: 'faq-08',
        triggers: ['revenue', 'pricing', 'cold start', 'business model'],
        response: {
            text: "Companies pay to buy \"experiences.\" We only keep a small portion for operations; up to 85% is distributed, with the majority (70%) going directly to the users doing the tasks. To start, we will use our existing ZOO platform users to build traffic and send free tokens (airdrops) to attract new players.",
            delay: 600
        }
    },
    {
        id: 'faq-17',
        triggers: ['sustainability', 'where money comes from', 'revenue source'],
        response: {
            text: "Our revenue comes from B2B Enterprise Clients. Companies like Nike need product design testing, and OpenAI needs human value alignment data; they pay for HaaS. We simply distribute the majority (70%) of this money to you, the data providers, while the platform takes a 15% service fee.",
            delay: 600
        }
    },

    // ============================================================
    // TOKENOMICS
    // ============================================================
    {
        id: 'faq-09',
        triggers: ['token supply', 'allocation', 'token utility', '1 billion'],
        response: {
            text: "There are 1 billion tokens in total. They aren't just money; they are also used to vote on the platform's future. The largest portion (30%) is reserved for the general community. The team's share is locked for a long time and cannot be sold immediately, ensuring everyone's interests are tied together.",
            delay: 600
        }
    },
    {
        id: 'faq-10',
        triggers: ['deflation', 'burn', 'buyback', 'token value'],
        response: {
            text: "We have designed a deflationary mechanism. We will use part of the service fees paid by companies to buy back tokens from the market and destroy (burn) them. As the number of tokens decreases, their value has a chance to rise.",
            delay: 600
        }
    },
    {
        id: 'air-07',
        triggers: ['secondary market', 'investor', 'flywheel'],
        response: {
            text: "We have established a B2B Buyback & Burn flywheel. Whenever enterprises pay HaaS service fees, a portion of the 15% platform fee is used to buy back $twin3 from the market and burn it. This means the more business twin3 does, the lower the token supply becomes, supporting value appreciation.",
            delay: 600
        }
    },

    // ============================================================
    // AIRDROP & EARNINGS
    // ============================================================
    {
        id: 'air-01',
        triggers: ['sybil attack', 'multiple wallets', 'farming'],
        response: {
            text: "Unlike traditional projects that rely solely on wallet interactions, twin3 uses 3D Proof of Authenticity (PoA). Beyond basic identity (1D), we verify the depth of your Twin Matrix data (3D Profile). Creating empty wallets without authentic physical, social, or spiritual data (like taste or value tests) will fail verification, and these accounts will be excluded from rewards.",
            delay: 600
        }
    },
    {
        id: 'air-02',
        triggers: ['bot', 'automation', 'scripts', 'cheating'],
        response: {
            text: "The core of twin3 is HaaS (Human-as-a-Service), such as \"Taste Alignment\" or moral judgment. These tasks require subjective human sensory experience (e.g., aesthetic judgment) and complex emotional reasoning. Current bots cannot generate this \"deep human data.\" The system uses implicit behavioral learning to detect anomalies; bot accounts will see their reputation scores drop to zero.",
            delay: 600
        }
    },
    {
        id: 'air-03',
        triggers: ['dumping', 'selling pressure', 'vesting', 'long term'],
        response: {
            text: "While 30% is allocated to the community, these tokens have a 60-month linear vesting schedule. This prevents \"Airdrop Tourists\" from dumping on day one and encourages users to hold long-term and build the ecosystem.",
            delay: 600
        }
    },
    {
        id: 'air-04',
        triggers: ['income', 'earnings', 'points', 'money'],
        response: {
            text: "Unlike projects that only give \"points,\" twin3 returns 70% of enterprise payments directly to users. This means the data you provide (like UX feedback) is a directly monetizable asset, not just a points game for a potential airdrop.",
            delay: 600
        }
    },
    {
        id: 'air-09',
        triggers: ['how to earn more', 'maximize airdrop', 'key metrics'],
        response: {
            text: "We value Twin Matrix Completeness and Reputation Score. A user with rich data across all 4 interaction dimensions (Physical, Digital, Social, Spiritual) who consistently provides high-quality feedback will receive more weight than someone who just spams low-quality interactions. We reward \"High-Quality Data Contributors.\"",
            delay: 600
        }
    },

    // ============================================================
    // TEAM & ROADMAP
    // ============================================================
    {
        id: 'faq-12',
        triggers: ['team', 'founder', 'background', 'ming', 'lawrence'],
        response: {
            text: "Founder Ming is an expert specializing in \"how humans interact with computers\" (HCI). CIO Lawrence is a veteran with 15 years of experience at the data analytics giant Experian. This is a team of experts who understand both AI and human nature.",
            delay: 600
        }
    },
    {
        id: 'faq-13',
        triggers: ['roadmap', 'timeline', 'scaling', 'goals'],
        response: {
            text: "In early 2026, we will lay the foundation and open for beta testing. Our goal is to have 1.5 million people using our service within 18 months, serving 50 large enterprise clients.",
            delay: 600
        }
    },
    {
        id: 'air-14',
        triggers: ['beta launch', 'airdrop date', 'when launch'],
        response: {
            text: "According to the roadmap, we expect to launch the Beta version and the first round of airdrops in Q2 2026. Before that, you can follow our community channels and participate in early validation events to accumulate whitelist eligibility.",
            delay: 600
        }
    },

    // ============================================================
    // PRIVACY & LEGAL
    // ============================================================
    {
        id: 'faq-14',
        triggers: ['legal', 'regulation', 'compliance'],
        response: {
            text: "We have incorporated in the Cayman Islands and engaged top-tier international legal advisors to ensure that all operations comply with legal regulations.",
            delay: 600
        }
    },
    {
        id: 'air-10',
        triggers: ['privacy', 'data protection', 'security', 'leak'],
        response: {
            text: "Your Twin Matrix data is your asset, protected by Data Sovereignty. When enterprises use this data for AI training, it is done in a privacy-preserving computation environment. They receive aggregated insights, not your raw personal profile. All data usage requires your authorization.",
            delay: 600
        }
    }
];
