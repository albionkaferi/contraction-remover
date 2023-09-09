const textarea = document.getElementById('textarea');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const outputarea = document.getElementById('outputarea');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

const contractionsMap = new Map([
    ["ain't", "isn't"],
    ["aren't", "are not"],
    ["can't", "cannot"],
    ["couldn't", "could not"],
    ["didn't", "did not"],
    ["doesn't", "does not"],
    ["don't", "do not"],
    ["hadn't", "had not"],
    ["hasn't", "has not"],
    ["haven't", "have not"],
    ["he'd", "he would"],
    ["he'll", "he will"],
    ["he's", "he is"],
    ["i'd", "I would"],
    ["i'll", "I will"],
    ["i'm", "I am"],
    ["i've", "I have"],
    ["isn't", "is not"],
    ["it'd", "it would"],
    ["it'll", "it will"],
    ["it's", "it is"],
    ["let's", "let us"],
    ["mustn't", "must not"],
    ["she'd", "she would"],
    ["she'll", "she will"],
    ["she's", "she is"],
    ["shouldn't", "should not"],
    ["that's", "that is"],
    ["they'd", "they would"],
    ["they'll", "they will"],
    ["they're", "they are"],
    ["they've", "they have"],
    ["wasn't", "was not"],
    ["we'd", "we would"],
    ["we'll", "we will"],
    ["we're", "we are"],
    ["we've", "we have"],
    ["weren't", "were not"],
    ["what's", "what is"],
    ["where's", "where is"],
    ["who's", "who is"],
    ["won't", "will not"],
    ["wouldn't", "would not"],
    ["you'd", "you would"],
    ["you'll", "you will"],
    ["you're", "you are"],
    ["you've", "you have"]
]);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const normalizedText = normalizeApostrophes(textarea.value);
    outputarea.textContent = replaceContractions(normalizedText);
    copyBtn.innerHTML = '<i class="fa-regular fa-copy text-gray-500"></i>';
    output.hidden = false;
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    textarea.value = '';
});

function replaceContractions(text) {
    const pattern = new RegExp(Array.from(contractionsMap.keys()).join("|"), "gi");
    return text.replace(pattern, (matched) => {
        let lowerCaseMatched = matched.toLowerCase();
        let expanded = contractionsMap.get(lowerCaseMatched);
        return (matched[0] === matched[0].toUpperCase()) ? expanded.charAt(0).toUpperCase() + expanded.slice(1) : expanded;
    });
}

function normalizeApostrophes(text) {
    return text.replace(/[\u0027\u2019\u2018\u2032\u0060\u00B4\u02BC\uFF07]/g, "'");
}

async function copyToClipboard() {
    const text = outputarea.value;
    try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>';
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}