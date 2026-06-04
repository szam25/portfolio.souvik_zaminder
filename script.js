// Souvik Zaminder - Portfolio Functional Controllers
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeChatWidget();
  initializeGoTopButton();
});

// 1. Core Smooth Navigation & Mobile Routing
function initializeNavigation() {
  // Select all links in your actual header navigation
  const navLinks = document.querySelectorAll('header nav a, header > a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Ensure it's a valid internal anchor link
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          // Calculate an offset for your fixed header navbar
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// 2. Chatbot Widget Functionality (Interactive AI Assistant Demo)
function initializeChatWidget() {
  const chatWidget = document.getElementById('chatWidget');
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const quickActions = document.querySelectorAll('.quick-action-btn');

  if (!chatWidget || !chatToggleBtn || !closeChatBtn) return;

  // Open Chat UI
  chatToggleBtn.addEventListener('click', () => {
    chatWidget.classList.remove('hidden');
    chatToggleBtn.classList.add('hidden');
  });

  // Close Chat UI
  closeChatBtn.addEventListener('click', () => {
    chatWidget.classList.add('hidden');
    chatToggleBtn.classList.remove('hidden');
  });

  // Render text message bubbles
  function appendMessage(text, sender) {
    const bubbleWrapper = document.createElement('div');
    bubbleWrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

    bubbleWrapper.innerHTML = `
      <div class="p-3 rounded-lg max-w-[85%] text-sm ${
        sender === 'user' 
        ? 'bg-[#F3D3A8] text-black rounded-tr-none' 
        : 'bg-white/10 text-white rounded-tl-none border border-white/5'
      }">
        <p>${text}</p>
      </div>
    `;
    chatMessages.appendChild(bubbleWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Keep view on lowest message
  }

  // Simplified Bot response logic engine
  function processBotResponse(promptText) {
    setTimeout(() => {
      let response = "That is a great question! Souvik specializes in scalable frontend frameworks, architecture design, and UI performance optimizations.";
      const textLower = promptText.toLowerCase();

      if (textLower.includes('design') || textLower.includes('system')) {
        response = "Souvik designs enterprise-level, token-driven component libraries using atomic patterns with WCAG 2.1 AA accessibility guidelines baked in directly by default.";
      } else if (textLower.includes('performance') || textLower.includes('speed') || textLower.includes('win')) {
        response = "He has driven optimization sprints slashing production code bundles by 35-40% (~1MB+ absolute weight reduction) resulting in much faster Core Web Vitals times.";
      } else if (textLower.includes('contact') || textLower.includes('email') || textLower.includes('phone')) {
        response = "You can securely connect with Souvik over email via s.zaminder@gmail.com, or over telephone at +91-8902459912.";
      }

      appendMessage(response, 'bot');
    }, 550);
  }

  // Submit via click or enter triggers
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const inputVal = chatInput.value.trim();
      if (inputVal) {
        appendMessage(inputVal, 'user');
        chatInput.value = '';
        processBotResponse(inputVal);
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });
  }

  // Monitor quick response selection action items
  quickActions.forEach(actionBtn => {
    actionBtn.addEventListener('click', () => {
      const standardText = actionBtn.innerText.trim();
      appendMessage(standardText, 'user');
      processBotResponse(standardText);
    });
  });
}

// 3. Back to Top Smooth Scroll Visibility Controller
function initializeGoTopButton() {
  const goTopBtn = document.getElementById('goTopBtn');
  if (!goTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      // Cleanly clear Tailwind's invisible click safety locks
      goTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      goTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      goTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      goTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  goTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
