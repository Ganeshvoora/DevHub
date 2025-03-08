document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const webSection = document.getElementById('webSection');
    const codeSection = document.getElementById('codeSection');
    const outputBox = document.getElementById('outputBox');
    const previewFrame = document.getElementById('previewFrame');
    
    // Editor instances
    const editors = {
        html: document.getElementById('htmlEditor'),
        css: document.getElementById('cssEditor'),
        js: document.getElementById('jsEditor'),
        code: document.getElementById('codeEditor'),
        input: document.getElementById('inputEditor')
    };

    const runBtn = document.getElementById('runCode');
    const clearBtn = document.getElementById('clearCode');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function runCode() {
        if (webSection) {
            webSection.classList.remove('hidden');
            if (previewFrame) previewFrame.classList.remove('hidden');
            runWebCode();
        }
    }

    // Run web code (HTML/CSS/JS)
    function runWebCode() {
        const html = editors.html.value;
        const css = editors.css.value;
        const js = editors.js.value;

        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;

        previewFrame.srcdoc = content;
    }

    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Show selected editor
            Object.values(editors).forEach(editor => editor.classList.add('hidden'));
            editors[lang].classList.remove('hidden');
        });
    });

    // Clear code
    function clearCode() {
        Object.values(editors).forEach(editor => editor.value = '');
        runCode();
    }

    // Clear all outputs
    function clearAll() {
        Object.values(editors).forEach(editor => {
            if (editor) editor.value = '';
        });
        outputBox.innerHTML = '';
        previewFrame.srcdoc = '';
    }

    // Initialize editor visibility
    if (editors.html) editors.html.classList.remove('hidden');
    if (editors.css) editors.css.classList.add('hidden');
    if (editors.js) editors.js.classList.add('hidden');

    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', clearAll);

    // Auto-run on input (with debounce)
    let timeout;
    Object.values(editors).forEach(editor => {
        editor.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(runCode, 1000);
        });
    });

    document.getElementById('clearOutput')?.addEventListener('click', () => {
        outputBox.innerHTML = '';
        previewFrame.srcdoc = '';
    });
});
