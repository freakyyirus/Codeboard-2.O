export interface RoadmapStep {
    id: string
    title: string
    description: string
    resources: { title: string, url: string }[]
    status: "pending" | "in-progress" | "completed"
}

export interface Roadmap {
    id: string
    title: string
    description: string
    icon: string
    color: string
    category: "DSA" | "Frontend" | "Backend" | "Full Stack" | "AI/ML" | "Blockchain" | "DevOps" | "Custom"
    steps: RoadmapStep[]
}

export const PREDEFINED_ROADMAPS: Roadmap[] = [
    {
        id: "dsa-mastery",
        title: "DSA Mastery",
        description: "Complete roadmap to master Data Structures & Algorithms from basics to advanced competitive programming.",
        icon: "🧩",
        color: "#3b82f6",
        category: "DSA",
        steps: [
            { id: "dsa-1", title: "Time & Space Complexity", description: "Big O notation, best/worst/average case analysis.", resources: [{ title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/" }], status: "pending" },
            { id: "dsa-2", title: "Arrays & Strings", description: "Two pointers, sliding window, prefix sums.", resources: [{ title: "LeetCode Explore", url: "https://leetcode.com/explore/learn/card/array-and-string/" }], status: "pending" },
            { id: "dsa-3", title: "Linked Lists", description: "Singly, doubly, circular lists. Floyd's cycle detection.", resources: [{ title: "Visualgo", url: "https://visualgo.net/en/list" }], status: "pending" },
            { id: "dsa-4", title: "Stacks & Queues", description: "Monotonic stacks, deque problems, implementations.", resources: [{ title: "LeetCode", url: "https://leetcode.com/tag/stack/" }], status: "pending" },
            { id: "dsa-5", title: "Recursion & Backtracking", description: "N-Queens, Sudoku solver, subset generation.", resources: [{ title: "Striver's A2Z", url: "https://takeuforward.org/strivers-a2z-dsa-course/" }], status: "pending" },
            { id: "dsa-6", title: "Trees & BST", description: "Traversals, LCA, balanced BSTs, segment trees.", resources: [{ title: "CP Algorithms", url: "https://cp-algorithms.com/" }], status: "pending" },
            { id: "dsa-7", title: "Graphs", description: "BFS, DFS, Dijkstra, Bellman-Ford, topological sort.", resources: [{ title: "William Fiset", url: "https://www.youtube.com/c/WilliamFiset-videos" }], status: "pending" },
            { id: "dsa-8", title: "Dynamic Programming", description: "Memoization, tabulation, classic DP patterns.", resources: [{ title: "Aditya Verma", url: "https://www.youtube.com/c/AdityaVermaTheProgrammingLord" }], status: "pending" },
            { id: "dsa-9", title: "Greedy Algorithms", description: "Activity selection, Huffman, interval scheduling.", resources: [{ title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/greedy-algorithms/" }], status: "pending" },
            { id: "dsa-10", title: "Advanced Topics", description: "Tries, segment trees, Fenwick trees, string hashing.", resources: [{ title: "CSES Problemset", url: "https://cses.fi/problemset/" }], status: "pending" },
        ]
    },
    {
        id: "fullstack-mern",
        title: "MERN Stack",
        description: "Build modern full-stack applications with MongoDB, Express, React, and Node.js.",
        icon: "🚀",
        color: "#10b981",
        category: "Full Stack",
        steps: [
            { id: "mern-1", title: "HTML, CSS, JavaScript", description: "The foundational trio of web development.", resources: [{ title: "MDN Web Docs", url: "https://developer.mozilla.org" }], status: "pending" },
            { id: "mern-2", title: "React Fundamentals", description: "Components, props, state, hooks, context API.", resources: [{ title: "React.dev", url: "https://react.dev" }], status: "pending" },
            { id: "mern-3", title: "Node.js & Express", description: "Server-side JS, REST APIs, middleware patterns.", resources: [{ title: "Node.js Docs", url: "https://nodejs.org/docs" }], status: "pending" },
            { id: "mern-4", title: "MongoDB & Mongoose", description: "NoSQL database design, CRUD, aggregation pipeline.", resources: [{ title: "MongoDB University", url: "https://university.mongodb.com" }], status: "pending" },
            { id: "mern-5", title: "Authentication & Security", description: "JWT, OAuth, bcrypt, CORS, rate limiting.", resources: [{ title: "Auth0 Docs", url: "https://auth0.com/docs" }], status: "pending" },
            { id: "mern-6", title: "State Management", description: "Redux Toolkit, Zustand, React Query.", resources: [{ title: "Redux Toolkit", url: "https://redux-toolkit.js.org" }], status: "pending" },
            { id: "mern-7", title: "Deployment", description: "Docker, CI/CD, Vercel, AWS, Nginx.", resources: [{ title: "Vercel Docs", url: "https://vercel.com/docs" }], status: "pending" },
        ]
    },
    {
        id: "fullstack-nextjs",
        title: "Next.js Full Stack",
        description: "Master Next.js 14+ with App Router, Server Components, and full-stack patterns.",
        icon: "⚡",
        color: "#f59e0b",
        category: "Full Stack",
        steps: [
            { id: "next-1", title: "React & TypeScript", description: "Strong typing, generics, utility types.", resources: [{ title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/" }], status: "pending" },
            { id: "next-2", title: "Next.js App Router", description: "File-based routing, layouts, loading states.", resources: [{ title: "Next.js Docs", url: "https://nextjs.org/docs" }], status: "pending" },
            { id: "next-3", title: "Server Components & Actions", description: "RSC, server actions, data fetching patterns.", resources: [{ title: "Next.js Learn", url: "https://nextjs.org/learn" }], status: "pending" },
            { id: "next-4", title: "Database & ORM", description: "Prisma, Drizzle, PostgreSQL, Supabase.", resources: [{ title: "Prisma Docs", url: "https://www.prisma.io/docs" }], status: "pending" },
            { id: "next-5", title: "Authentication", description: "NextAuth.js, Clerk, middleware protection.", resources: [{ title: "Clerk Docs", url: "https://clerk.com/docs" }], status: "pending" },
            { id: "next-6", title: "Testing & Deployment", description: "Jest, Playwright, Vercel Edge, caching.", resources: [{ title: "Playwright Docs", url: "https://playwright.dev" }], status: "pending" },
        ]
    },
    {
        id: "ai-ml-fundamentals",
        title: "AI / Machine Learning",
        description: "From linear regression to neural networks — master ML fundamentals.",
        icon: "🤖",
        color: "#8b5cf6",
        category: "AI/ML",
        steps: [
            { id: "ml-1", title: "Python for ML", description: "NumPy, Pandas, Matplotlib, Scikit-learn basics.", resources: [{ title: "Kaggle Learn", url: "https://www.kaggle.com/learn" }], status: "pending" },
            { id: "ml-2", title: "Statistics & Probability", description: "Distributions, hypothesis testing, Bayes theorem.", resources: [{ title: "Khan Academy", url: "https://www.khanacademy.org/math/statistics-probability" }], status: "pending" },
            { id: "ml-3", title: "Supervised Learning", description: "Linear/logistic regression, SVM, decision trees, random forests.", resources: [{ title: "Andrew Ng (Coursera)", url: "https://www.coursera.org/specializations/machine-learning-introduction" }], status: "pending" },
            { id: "ml-4", title: "Unsupervised Learning", description: "K-means, DBSCAN, PCA, anomaly detection.", resources: [{ title: "Scikit-learn Docs", url: "https://scikit-learn.org" }], status: "pending" },
            { id: "ml-5", title: "Neural Networks", description: "Perceptrons, backpropagation, activation functions.", resources: [{ title: "3Blue1Brown", url: "https://www.youtube.com/c/3blue1brown" }], status: "pending" },
            { id: "ml-6", title: "Deep Learning", description: "CNNs, RNNs, Transformers with PyTorch/TF.", resources: [{ title: "Fast.ai", url: "https://course.fast.ai" }], status: "pending" },
            { id: "ml-7", title: "MLOps & Deployment", description: "Model serving, MLflow, Docker, cloud deploy.", resources: [{ title: "MLOps Guide", url: "https://ml-ops.org" }], status: "pending" },
        ]
    },
    {
        id: "llm-engineering",
        title: "LLM Engineering",
        description: "Learn to build applications powered by Large Language Models.",
        icon: "🧠",
        color: "#ec4899",
        category: "AI/ML",
        steps: [
            { id: "llm-1", title: "NLP Foundations", description: "Tokenization, embeddings, attention mechanism.", resources: [{ title: "Hugging Face Course", url: "https://huggingface.co/learn" }], status: "pending" },
            { id: "llm-2", title: "Transformer Architecture", description: "Self-attention, multi-head attention, positional encoding.", resources: [{ title: "Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/" }], status: "pending" },
            { id: "llm-3", title: "Prompt Engineering", description: "Few-shot, chain-of-thought, system prompts.", resources: [{ title: "OpenAI Cookbook", url: "https://cookbook.openai.com" }], status: "pending" },
            { id: "llm-4", title: "RAG (Retrieval Augmented Gen)", description: "Vector DBs, embeddings, chunking strategies.", resources: [{ title: "LangChain Docs", url: "https://python.langchain.com" }], status: "pending" },
            { id: "llm-5", title: "Fine-tuning", description: "LoRA, QLoRA, PEFT, instruction tuning.", resources: [{ title: "Hugging Face PEFT", url: "https://huggingface.co/docs/peft" }], status: "pending" },
            { id: "llm-6", title: "LLM Apps & Deployment", description: "Streaming, function calling, guardrails, eval.", resources: [{ title: "Vercel AI SDK", url: "https://sdk.vercel.ai" }], status: "pending" },
        ]
    },
    {
        id: "agentic-ai",
        title: "Agentic AI",
        description: "Build autonomous AI agents that reason, plan, and use tools.",
        icon: "🕹️",
        color: "#f43f5e",
        category: "AI/ML",
        steps: [
            { id: "agent-1", title: "Agent Fundamentals", description: "ReAct pattern, tool use, planning loops.", resources: [{ title: "LangChain Agents", url: "https://python.langchain.com/docs/modules/agents/" }], status: "pending" },
            { id: "agent-2", title: "Tool Integration", description: "Function calling, API tools, code execution.", resources: [{ title: "OpenAI Functions", url: "https://platform.openai.com/docs/guides/function-calling" }], status: "pending" },
            { id: "agent-3", title: "Memory & State", description: "Conversation memory, vector stores, long-term recall.", resources: [{ title: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" }], status: "pending" },
            { id: "agent-4", title: "Multi-Agent Systems", description: "CrewAI, AutoGen, agent orchestration.", resources: [{ title: "CrewAI Docs", url: "https://docs.crewai.com" }], status: "pending" },
            { id: "agent-5", title: "Evaluation & Safety", description: "Benchmarks, guardrails, human-in-the-loop.", resources: [{ title: "DeepEval", url: "https://docs.confident-ai.com" }], status: "pending" },
            { id: "agent-6", title: "Production Agents", description: "Deployment, monitoring, cost optimization.", resources: [{ title: "LangSmith", url: "https://smith.langchain.com" }], status: "pending" },
        ]
    },
    {
        id: "blockchain-web3",
        title: "Blockchain & Web3",
        description: "Master decentralized application development from smart contracts to DeFi.",
        icon: "⛓️",
        color: "#6366f1",
        category: "Blockchain",
        steps: [
            { id: "bc-1", title: "Blockchain Fundamentals", description: "Distributed ledger, consensus, cryptographic hashing.", resources: [{ title: "Blockchain.com Learn", url: "https://www.blockchain.com/learning-portal" }], status: "pending" },
            { id: "bc-2", title: "Ethereum & EVM", description: "Gas, accounts, transactions, Ethereum Virtual Machine.", resources: [{ title: "Ethereum.org", url: "https://ethereum.org/developers" }], status: "pending" },
            { id: "bc-3", title: "Solidity Smart Contracts", description: "Contract structure, data types, inheritance, events.", resources: [{ title: "Solidity Docs", url: "https://docs.soliditylang.org" }], status: "pending" },
            { id: "bc-4", title: "Hardhat & Testing", description: "Local dev environment, testing, deployment scripts.", resources: [{ title: "Hardhat Docs", url: "https://hardhat.org/docs" }], status: "pending" },
            { id: "bc-5", title: "Web3.js & Ethers.js", description: "Frontend integration, wallet connection, contract interaction.", resources: [{ title: "Ethers.js Docs", url: "https://docs.ethers.org" }], status: "pending" },
            { id: "bc-6", title: "DeFi & NFTs", description: "ERC-20, ERC-721, AMMs, lending protocols.", resources: [{ title: "OpenZeppelin", url: "https://docs.openzeppelin.com" }], status: "pending" },
            { id: "bc-7", title: "Security & Auditing", description: "Reentrancy, overflow, common attack vectors.", resources: [{ title: "Ethernaut", url: "https://ethernaut.openzeppelin.com" }], status: "pending" },
        ]
    },
    {
        id: "devops-cloud",
        title: "DevOps & Cloud",
        description: "Infrastructure as code, CI/CD pipelines, and cloud-native development.",
        icon: "☁️",
        color: "#0ea5e9",
        category: "DevOps",
        steps: [
            { id: "devops-1", title: "Linux & Shell Scripting", description: "Command line mastery, bash scripting, file management.", resources: [{ title: "Linux Journey", url: "https://linuxjourney.com" }], status: "pending" },
            { id: "devops-2", title: "Docker & Containers", description: "Images, containers, Docker Compose, multi-stage builds.", resources: [{ title: "Docker Docs", url: "https://docs.docker.com" }], status: "pending" },
            { id: "devops-3", title: "Kubernetes", description: "Pods, services, deployments, Helm charts.", resources: [{ title: "Kubernetes Docs", url: "https://kubernetes.io/docs" }], status: "pending" },
            { id: "devops-4", title: "CI/CD Pipelines", description: "GitHub Actions, Jenkins, GitLab CI, automated testing.", resources: [{ title: "GitHub Actions", url: "https://docs.github.com/en/actions" }], status: "pending" },
            { id: "devops-5", title: "AWS / Cloud Fundamentals", description: "EC2, S3, Lambda, RDS, IAM, VPC.", resources: [{ title: "AWS Training", url: "https://aws.amazon.com/training" }], status: "pending" },
            { id: "devops-6", title: "Infrastructure as Code", description: "Terraform, Pulumi, CloudFormation.", resources: [{ title: "Terraform Docs", url: "https://developer.hashicorp.com/terraform/docs" }], status: "pending" },
        ]
    },
    {
        id: "system-design",
        title: "System Design",
        description: "Design scalable, reliable, and maintainable systems for interviews and production.",
        icon: "🏗️",
        color: "#14b8a6",
        category: "Backend",
        steps: [
            { id: "sd-1", title: "Fundamentals", description: "CAP theorem, load balancing, caching, CDN.", resources: [{ title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }], status: "pending" },
            { id: "sd-2", title: "Database Design", description: "SQL vs NoSQL, sharding, replication, indexing.", resources: [{ title: "Database Internals", url: "https://www.databass.dev" }], status: "pending" },
            { id: "sd-3", title: "API Design", description: "REST, GraphQL, gRPC, rate limiting, versioning.", resources: [{ title: "API Design Guide", url: "https://cloud.google.com/apis/design" }], status: "pending" },
            { id: "sd-4", title: "Message Queues", description: "Kafka, RabbitMQ, pub/sub patterns, event sourcing.", resources: [{ title: "Kafka Docs", url: "https://kafka.apache.org/documentation" }], status: "pending" },
            { id: "sd-5", title: "Microservices", description: "Service mesh, containerization, API gateways.", resources: [{ title: "Microservices.io", url: "https://microservices.io" }], status: "pending" },
            { id: "sd-6", title: "Case Studies", description: "Design Twitter, Uber, Netflix, URL shortener.", resources: [{ title: "ByteByteGo", url: "https://bytebytego.com" }], status: "pending" },
        ]
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Learn offensive and defensive security from fundamentals to advanced penetration testing.",
        icon: "🔐",
        color: "#ef4444",
        category: "DevOps",
        steps: [
            { id: "sec-1", title: "Networking Fundamentals", description: "TCP/IP, DNS, HTTP, TLS, firewalls.", resources: [{ title: "Professor Messer", url: "https://www.professormesser.com" }], status: "pending" },
            { id: "sec-2", title: "Web Security", description: "OWASP Top 10, XSS, CSRF, SQL injection, SSRF.", resources: [{ title: "PortSwigger Academy", url: "https://portswigger.net/web-security" }], status: "pending" },
            { id: "sec-3", title: "Cryptography", description: "Symmetric/asymmetric encryption, hashing, digital signatures.", resources: [{ title: "Crypto101", url: "https://www.crypto101.io" }], status: "pending" },
            { id: "sec-4", title: "Penetration Testing", description: "Recon, exploitation, post-exploitation, reporting.", resources: [{ title: "TryHackMe", url: "https://tryhackme.com" }], status: "pending" },
            { id: "sec-5", title: "CTF Practice", description: "Capture the Flag challenges for hands-on practice.", resources: [{ title: "HackTheBox", url: "https://hackthebox.com" }], status: "pending" },
        ]
    },
]
