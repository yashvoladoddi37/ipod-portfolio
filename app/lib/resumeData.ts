export const profile = {
  name: "Yashpreet Voladoddi",
  title: "AI Engineer",
  targetRole: "Applied AI Engineer",
  location: "Bangalore, India",
  email: "yash.voladoddi2@gmail.com",
  phone: "+91 9606897799",
  linkedin: "https://www.linkedin.com/in/yashpreet-voladoddi/",
  github: "https://github.com/yashvoladoddi37",
  resumeUrl: "/Yashpreet_Voladoddi_Resume_2026.pdf",
  summary: "AI Engineer with hands-on experience building products from zero to one, specializing in Generative AI, agentic workflows, and production-ready RAG systems. I build scalable AI platforms using Azure OpenAI, AWS, Golang, Python, and TypeScript, with ownership from prototype through deployment.",
  focus: "I build applied AI systems where product quality, backend reliability, and model behavior all matter. My work is strongest in production RAG, LLM agents, observability, and integrations that move from prototype to shipped product.",
  proofPoints: [
    "Built multi-tenant RAG and Azure OpenAI workflows at Kapi AI across Go, Node.js, Python, and Next.js.",
    "Shipped ReAct-style agents with tool calling, human approvals, PII guardrails, and Langfuse observability.",
    "Reduced lead-generation cost by 80% and automated workflows processing 500+ leads/month at HeyCoach."
  ],
  photoUrl: "/profile-pic.jpeg"
};

export const experiences = [
  {
    company: "Kapi AI",
    role: "AI Engineer",
    duration: "Apr 2025 - Present",
    location: "Bangalore, India",
    bullets: [
      "Engineered scalable RAG pipelines and managed Azure OpenAI endpoints for multi-tenant GenAI environments, focusing on hybrid retrieval, prompt optimization, and structured output.",
      "Programmed multi-step ReAct agent workflows, including a compliance-aware SDR agent with tool calling, human approvals, and PII redaction guardrails.",
      "Integrated Langfuse for system observability and built a visual GenAI App Builder (Next.js, ReactFlow) with unified Composio tool authentication.",
      "Contributed 350+ commits as an early engineering team member, shipping zero-to-one AI products across Golang (CLI), Node.js (API), and Python (AI services)."
    ]
  },
  {
    company: "HeyCoach",
    role: "AI Engineer",
    duration: "Dec 2024 - Mar 2025",
    location: "Bangalore, India",
    bullets: [
      "Achieved an 80% cost reduction per lead and a 10% response rate by prototyping an AI-driven lead generation MVP and scaling the outreach workflow using Mistral 7B LLM.",
      "Saved about 25 manual hours monthly by deploying LangGraph AI agents for social media workflows and CRM integrations that process 500+ leads/month."
    ]
  },
  {
    company: "Lumio TV, Circuit House",
    role: "Backend AI Intern",
    duration: "Sep 2024 - Nov 2024",
    location: "Bangalore, India",
    bullets: [
      "Reduced server load by about 35% and improved response times by 30-40% by developing Golang AWS Lambda APIs with Redis caching.",
      "Fine-tuned LLaMA 3.2 (11B) and T5 models for systematic metadata extraction, and provisioned the backing AWS infrastructure using Terraform (IaC)."
    ]
  },
  {
    company: "Centre for AI and Robotics, DRDO",
    role: "ML Research Intern",
    duration: "Aug 2023 - Nov 2023",
    location: "Bangalore, India",
    bullets: [
      "Enhanced detection accuracy by 20% and boosted mAP to 0.91 by designing a real-time YOLOv5 drone detection system powered by iterative data augmentation."
    ]
  }
];

export const projects = [
  {
    id: "plum-claims",
    name: "Plum Claims",
    description: "AI Insurance Claim Adjudication",
    link: "https://plum-claims-production.up.railway.app",
    bullets: [
      "Constructed an agentic AI claims adjudication system using Vercel AI SDK and Llama, featuring a real-time SSE streaming pipeline for live reasoning visualization.",
      "Delivered an 80% zero-API-cost extraction rate via a 3-tier OCR cascade pipeline, and evaluated hybrid confidence scoring using a RAG-augmented vector store."
    ]
  },
  {
    id: "paysense-concierge",
    name: "PaySense Agentic Concierge",
    description: "Top 10 Finalist, Pine Labs Playground AI Hackathon 2025",
    link: "https://drive.google.com/file/d/1--c62UaGqfqhc07RLNWP-E8oN3xtTZkW/view",
    bullets: [
      "Prototyped a multi-agent e-commerce workflow using AWS Bedrock (Claude Sonnet), placing in the Top 10 out of hundreds of participants."
    ]
  },
  {
    id: "kanji-gen",
    name: "Japanese Kanji Generation Model & OCR Pipeline",
    description: "GitHub / HuggingFace Profiles",
    link: "https://huggingface.co/datasets/yashvoladoddi37/kanjienglish",
    bullets: [
      "Generated 6,000+ unique Kanji characters from English prompts utilizing Stable Diffusion; processed 11,000+ movie posters utilizing AI-assisted title extraction over LLaMA 3.2 (11B)."
    ]
  }
];

export const education = {
  college: "B.M.S College of Engineering, Bangalore, India",
  degree: "Bachelor of Engineering in Artificial Intelligence and Machine Learning",
  duration: "Dec 2020 - Jun 2024",
  cgpa: "8.0/10.0"
};

export const skills = [
  {
    category: "AI/ML",
    items: ["Agentic AI Workflows", "RAG Pipelines", "GenAI", "Prompt Engineering", "MLOps", "ReAct Framework", "MCP", "Vercel AI SDK", "LangChain", "LangGraph", "Langfuse", "Azure OpenAI (GPT-4)", "Claude API", "Groq", "Mistral 7B", "Llama 3.2/4", "T5", "PyTorch", "HuggingFace"]
  },
  {
    category: "Languages",
    items: ["Golang (Go)", "Python", "SQL", "JavaScript", "TypeScript", "Bash", "C++"]
  },
  {
    category: "Cloud & Infra",
    items: ["Azure (AI Search, OpenAI)", "AWS (Lambda, EC2, ElastiCache, DynamoDB, IAM)", "Linux", "Terraform (IaC)", "Docker", "Redis", "Claude Code (CLI)", "Antigravity (AI IDE)"]
  },
  {
    category: "Backend & Integrations",
    items: ["RESTful APIs", "Microservices", "FastAPI", "Express.js", "Node.js", "PostgreSQL", "MongoDB", "ChromaDB", "Turso", "Vector Databases", "Composio", "GitHub/Slack/Jira"]
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "CI/CD", "VS Code", "ONNX Runtime", "ReactFlow", "Streamlit"]
  }
];
