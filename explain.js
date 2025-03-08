const apiKey = "AIzaSyCgZmaMu3z1WSVv8nP6--22eL1NSHtufiM";

document.getElementById('explainBtn').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('languageSelect').value;
    const explanationBox = document.getElementById('explanationBox');
    
    if (!code.trim()) {
        explanationBox.innerHTML = '<p class="error">Please enter some code to explain.</p>';
        return;
    }

    explanationBox.innerHTML = '<p class="loading">Analyzing code...</p>';

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const prompt = `Explain this ${language} code in detail:\n\n${code}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const explanation = data.candidates[0].content.parts[0].text;
        explanationBox.innerHTML = `<div class="explanation">${explanation}</div>`;
    } catch (error) {
        explanationBox.innerHTML = '<p class="error">Failed to generate explanation. Please try again.</p>';
        console.error("Error:", error);
    }
});
