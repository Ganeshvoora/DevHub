document.addEventListener('DOMContentLoaded', () => {
    const editors = {
        html: document.getElementById('htmlEditor'),
        css: document.getElementById('cssEditor'),
        js: document.getElementById('jsEditor')
    };

    const runBtn = document.getElementById('runCode');
    const clearBtn = document.getElementById('clearCode');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const previewFrame = document.getElementById('previewFrame');

    function runCode() {
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
                <script>${js}<\/script>
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

    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', clearCode);

    // Initialize editor visibility
    editors.html.classList.remove('hidden');
    editors.css.classList.add('hidden');
    editors.js.classList.add('hidden');
});
