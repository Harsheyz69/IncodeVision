document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatHistory = document.getElementById('chat-history');
    const typingIndicator = document.getElementById('typing-indicator');

    // Knowledge base for the bot
    const knowledgeBase = {
        "hello": "Hello there! How can I help you today?",
        "hi": "Hi! What's on your mind?",
        "hey": "Hey! Nice to see you.",
        "how are you": "I'm just a bot, but I'm feeling bug-free today! How about you?",
        "what is your name": "I'm your friendly AI Assistant. You can call me Bot.",
        "who created you": "I was created by a developer who loves code!",
        "what can you do": "I can chat with you, answer simple questions, and showcase this cool UI.",
        "time": `Current time is ${new Date().toLocaleTimeString()}`,
        "date": `Today's date is ${new Date().toLocaleDateString()}`,
        "open google": "I can't open tabs directly due to safety, but you can visit google.com!",
        "bye": "Goodbye! Have a great day ahead!",
        "thanks": "You're welcome!",
        "thank you": "Happy to help!",
        "default": "I'm not sure how to respond to that. Could you try asking something else?"
    };

    function normalizeText(text) {
        return text.toLowerCase().replace(/[^\w\s]/gi, '').trim();
    }

    function getResponse(userText) {
        const cleanText = normalizeText(userText);

        // Check for direct matches
        if (knowledgeBase[cleanText]) {
            return knowledgeBase[cleanText];
        }

        // Check for partial matches
        for (const key in knowledgeBase) {
            if (cleanText.includes(key) && key !== "default") {
                return knowledgeBase[key];
            }
        }

        return knowledgeBase["default"];
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.innerText = text; // Secure way to add text
        chatHistory.appendChild(msgDiv);

        // Scroll to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleUserMessage() {
        const text = inputField.value.trim();
        if (text === "") return;

        // Add user message
        appendMessage(text, 'user');
        inputField.value = "";

        // Show typing indicator
        typingIndicator.style.display = 'block';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Simulate network delay for realism
        setTimeout(() => {
            const response = getResponse(text);

            // Hide typing indicator
            typingIndicator.style.display = 'none';

            // Add bot message
            appendMessage(response, 'bot');

        }, 800 + Math.random() * 800); // Random delay between 800ms and 1600ms
    }

    // Event listeners
    sendBtn.addEventListener('click', handleUserMessage);

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Initial greeting
    setTimeout(() => {
        appendMessage("Hello! I'm ready to chat.", 'bot');
    }, 500);
});
