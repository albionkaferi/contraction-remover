const textarea = document.getElementById('textarea');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const outputarea = document.getElementById('outputarea');
const copyBtn = document.getElementById('copyBtn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text = textarea.value;
    outputarea.textContent = text;
    output.hidden = false;
});

async function copyToClipboard() {
    const text = outputarea.value;
    try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied';
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}