const apiKey = "AIzaSyCgZmaMu3z1WSVv8nP6--22eL1NSHtufiM";
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            <p>${text}</p>
        </div>
    `;
    chatBox.appendChild(messageDiv);
    // Smooth scroll to bottom
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const requestBody = {
        contents: [{ parts: [{ text: message }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        addMessage(aiResponse);
    } catch (error) {
        addMessage("Sorry, I encountered an error. Please try again.");
        console.error("Error:", error);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Enable textarea submit on Enter
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
