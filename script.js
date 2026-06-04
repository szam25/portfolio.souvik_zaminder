// Data extracted from Souvik's CV for targeted bot interactions
const CV_KNOWLEDGE_BASE = {
    frameworks: "Souvik is an expert in Angular (working with versions from v8 up to the latest Angular 20+) and robust React.js architectures.",
    microfrontends: "He specializes in Microfrontend Architecture and enterprise monorepos, allowing large-scale software systems to be delivered cleanly in isolation.",
    performance: "Souvik cut downstream production build spaces down dramatically, boasting over 35-40% bundle size reductions (saving 1MB+ from core payloads) to improve Core Web Vitals.",
    experience: "He has over 9+ years of design engineering experience across 4 global Tier-1 companies: Cognizant, TCS, and Infosys.",
    education: "Souvik holds an M.Tech from Bengal Engineering College (BEC), Shibpur, graduating in 2016."
};

document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // --- MOBILE FUNCTIONALITY: Go to Top Engine ---
        const topBtn = document.getElementById("goToTopBtn");

        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        };

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

    } else {
        // --- DESKTOP FUNCTIONALITY: Interactive Chatbot Engine ---
        const openChatBtn = document.getElementById("openChatBtn");
        const closeChatBtn = document.getElementById("closeChat");
        const chatbotWidget = document.getElementById("chatbotWidget");
        const chatInput = document.getElementById("chatInput");
        const sendChatBtn = document.getElementById("sendChat");
        const chatMessages = document.getElementById("chatMessages");

        openChatBtn.addEventListener("click", () => {
            chatbotWidget.style.display = "flex";
            openChatBtn.style.display = "none";
        });

        closeChatBtn.addEventListener("click", () => {
            chatbotWidget.style.display = "none";
            openChatBtn.style.display = "block";
        });

        const handleIncomingUserMessage = () => {
            const query = chatInput.value.trim().toLowerCase();
            if (!query) return;

            // Render User Text
            appendMessage(chatInput.value, "user");
            chatInput.value = "";

            // Evaluate simple intent matches matching your CV profile
            setTimeout(() => {
                let reply = "That sounds interesting! Feel free to drop an email to s.zaminder@gmail.com to ask Souvik about that specific architectural scope directly.";
                
                if (query.includes("angular") || query.includes("react") || query.includes("framework")) {
                    reply = CV_KNOWLEDGE_BASE.frameworks;
                } else if (query.includes("microfrontend") || query.includes("monorepo")) {
                    reply = CV_KNOWLEDGE_BASE.microfrontends;
                } else if (query.includes("performance") || query.includes("vitals") || query.includes("bundle")) {
                    reply = CV_KNOWLEDGE_BASE.performance;
                } else if (query.includes("experience") || query.includes("work") || query.includes("years")) {
                    reply = CV_KNOWLEDGE_BASE.experience;
                } else if (query.includes("education") || query.includes("college") || query.includes("m.tech")) {
                    reply = CV_KNOWLEDGE_BASE.education;
                }
                
                appendMessage(reply, "bot");
            }, 600);
        };

        sendChatBtn.addEventListener("click", handleIncomingUserMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleIncomingUserMessage();
        });

        function appendMessage(text, sender) {
            const msgBubble = document.createElement("div");
            msgBubble.classList.add("msg", sender);
            msgBubble.innerText = text;
            chatMessages.appendChild(msgBubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
});
