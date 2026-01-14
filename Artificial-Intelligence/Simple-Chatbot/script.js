document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatHistory = document.getElementById('chat-history');
    const typingIndicator = document.getElementById('typing-indicator');


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


        if (knowledgeBase[cleanText]) {
            return knowledgeBase[cleanText];
        }


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
        msgDiv.innerText = text;
        chatHistory.appendChild(msgDiv);


        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleUserMessage() {
        const text = inputField.value.trim();
        if (text === "") return;


        appendMessage(text, 'user');
        inputField.value = "";


        typingIndicator.style.display = 'block';
        chatHistory.scrollTop = chatHistory.scrollHeight;


        setTimeout(() => {
            const response = getResponse(text);


            typingIndicator.style.display = 'none';

            appendMessage(response, 'bot');

        }, 800 + Math.random() * 800);
    }


    sendBtn.addEventListener('click', handleUserMessage);

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });


    setTimeout(() => {
        appendMessage("Hello! I'm ready to chat.", 'bot');
    }, 500);
});
