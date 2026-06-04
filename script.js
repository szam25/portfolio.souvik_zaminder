/**
 * UI Architecture Interaction Logic Layer - Souvik Zaminder Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileScrollWidget();
    initDesktopChatbotWidget();
    initDownloadCVAction();
});

/**
 * Mobile 'Go to Top' Display Threshold Configurations
 */
function initMobileScrollWidget() {
    const mobileScrollBtn = document.getElementById("mobileGoToTop");
    
    if (!mobileScrollBtn) return;

    window.addEventListener("scroll", () => {
        // Toggle interaction states only when inside mobile dimensions below 768px
        if (window.innerWidth <= 768) {
            if (window.scrollY > 300) {
                mobileScrollBtn.classList.add("show-scroll");
            } else {
                mobileScrollBtn.classList.remove("show-scroll");
            }
        }
    });

    mobileScrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * Modern Automation Simulated Assistant (Desktop Specific Architecture Widget)
 */
function initDesktopChatbotWidget() {
    const chatWidget = document.getElementById("desktopChatbotWidget");
    const closeBtn = document.getElementById("closeChatbot");
    const sendBtn = document.getElementById("sendChatbotBtn");
    const inputField = document.getElementById("chatbotInput");
    const logsContainer = document.getElementById("chatbotLogs");

    if (!chatWidget || !sendBtn || !inputField) return;

    // Direct conversational lookups targeting system expertise metrics
    const engineeringDatabase = {
        "vitals": "Souvik achieved 35% average load-time improvement and dropped bundle budgets by over 1MB across monorepos.",
        "web vitals": "Souvik achieved 35% average load-time improvement and dropped bundle budgets by over 1MB across monorepos.",
        "angular": "Expert with Angular (v8 to v20+). He builds enterprise components and manages scale inside modular environments.",
        "react": "Proficient in React.js component architectures and token-driven independent platform integrations.",
        "accessibility": "Deep WCAG 2.1 AA knowledge. Souvik received the internal Star Performer Award at Infosys specifically for Accessibility excellence.",
        "a11y": "Deep WCAG 2.1 AA knowledge. Souvik received the internal Star Performer Award at Infosys specifically for Accessibility excellence.",
        "microfrontend": "Specializes in microfrontend composition and independent module systems within complex corporate monorepos.",
        "contact": "You can reach Souvik directly at s.zaminder@gmail.com or call +91 89024 59912 in Bengaluru."
    };

    closeBtn.addEventListener("click", () => {
        chatWidget.style.display = "none";
    });

    function handleOutgoingMessage() {
        const queryText = inputField.value.trim().toLowerCase();
        if (!queryText) return;

        // Render user bubble
        appendChatBubble(inputField.value, "user-msg");
        inputField.value = "";

        // Evaluate automated context matched keywords response
        setTimeout(() => {
            let reply = "I am a structured engineering helper. Try asking about 'Angular', 'Web Vitals', 'Accessibility', or 'Contact'.";
            
            for (const key in engineeringDatabase) {
                if (queryText.includes(key)) {
                    reply = engineeringDatabase[key];
                    break;
                }
            }
            appendChatBubble(reply, "bot-msg"); 
        }, 400);
    }

    sendBtn.addEventListener("click", handleOutgoingMessage);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleOutgoingMessage();
    });

    function appendChatBubble(text, className) {
        const pElement = document.createElement("p");
        pElement.className = className;
        pElement.textContent = text;
        logsContainer.appendChild(pElement);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
}



