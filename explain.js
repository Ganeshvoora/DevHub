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
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
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

        explanationBox.innerHTML = `
            <div class="explanation">
                <h3>Code Explanation</h3>
                <pre><code>${code}</code></pre>
                <p>${explanation}</p>
                <h4>Key Concepts:</h4>
                <ul>
                    <li><strong>Function:</strong> A reusable block of code that performs a specific task. <code>print()</code> is a function.</li>
                    <li><strong>Argument:</strong> A value passed to a function when it is called. <code>"HI"</code> is the argument passed to <code>print()</code>.</li>
                    <li><strong>String:</strong> A sequence of characters.</li>
                    <li><strong>Console/Terminal/Command Line:</strong> The text-based interface where you interact with the operating system and run programs.</li>
                    <li><strong>Output:</strong> The information displayed to the user by a program.</li>
                </ul>
                <h4>Example in Action:</h4>
                <ol>
                    <li><strong>Save the code:</strong> Create a file named, for example, <code>hello.py</code>, and paste the line <code>print("HI")</code> into it.</li>
                    <li><strong>Run from the terminal:</strong> Open your terminal or command prompt. Navigate to the directory where you saved <code>hello.py</code>. Then, type <code>python hello.py</code> and press Enter. You will see "HI" printed in the terminal.</li>
                </ol>
            </div>
        `;
    } catch (error) {
        explanationBox.innerHTML = '<p class="error">Failed to generate explanation. Please try again.</p>';
        console.error("Error:", error);
    }
});
