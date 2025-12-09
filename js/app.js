// Shared JS for all pages
// Placeholder configs - replace with real values
const WEBHOOK_URL = "<REPLACE_WITH_WEBHOOK_URL>"; // e.g., from n8n or Zapier
const CHATGPT_API_KEY = "<REPLACE_WITH_CHATGPT_API_KEY>"; // For real AI chat, use OpenAI API
// const TWILIO_SID = "<REPLACE>"; // For WhatsApp/SMS
// const TWILIO_AUTH = "<REPLACE>";
// const STRIPE_PUBLISHABLE_KEY = "<REPLACE>"; // For payments

// Form submit handler (for newsletter, signup, contact)
function handleFormSubmit(formId, dataMapper) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = dataMapper ? dataMapper(formData) : Object.fromEntries(formData);
            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) alert('Submitted!');
                else alert('Error submitting.');
            } catch (err) {
                alert('Network error.');
            }
        });
    }
}

// Newsletter (all pages)
handleFormSubmit('newsletter-form', (fd) => ({ email: fd.get('email'), type: 'newsletter' }));

if (document.location.pathname.endsWith('index.html') || document.location.pathname === '/') {
    // IoT simulation on home
    const canvas = document.getElementById('iot-chart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let data = [];
        function updateChart() {
            data.push(Math.random() * 100); // Simulated sensor value
            if (data.length > 20) data.shift();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - data[0]);
            data.forEach((val, i) => ctx.lineTo(i * 20, canvas.height - val));
            ctx.stroke();
        }
        setInterval(updateChart, 2000);
        updateChart();
    }
}

if (document.location.pathname.endsWith('bot.html')) {
    // Bot builder
    handleFormSubmit('bot-form', () => false); // Override to generate JSON locally
    const botForm = document.getElementById('bot-form');
    const jsonPre = document.getElementById('workflow-json');
    const copyBtn = document.getElementById('copy-json');
    botForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trigger = document.getElementById('trigger').value;
        const action = document.getElementById('action').value;
        const fields = document.getElementById('fields').value.split(',');
        const workflow = { trigger, action, fields };
        jsonPre.textContent = JSON.stringify(workflow, null, 2);
        copyBtn.hidden = false;
    });
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(jsonPre.textContent);
        alert('Copied!');
    });

    // Chat demo (simulated; plug in API for real)
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');
    const window = document.getElementById('chat-window');
    sendBtn.addEventListener('click', () => {
        const msg = input.value;
        window.innerHTML += `<p>User: ${msg}</p>`;
        // Simulated reply; replace with fetch to OpenAI
        window.innerHTML += `<p>AI: Simulated response to "${msg}". // Use CHATGPT_API_KEY here</p>`;
        input.value = '';
    });
}

if (document.location.pathname.endsWith('pricing.html')) {
    // Signup modal
    const modal = document.getElementById('signup-modal');
    const openBtn = document.getElementById('signup-button');
    const closeBtn = document.getElementById('close-modal');
    openBtn.addEventListener('click', () => modal.showModal());
    closeBtn.addEventListener('click', () => modal.close());
    handleFormSubmit('signup-form', (fd) => ({
        name: fd.get('name'),
        email: fd.get('email'),
        business: fd.get('business'),
        plan: fd.get('plan'),
        type: 'signup'
    }));
}

if (document.location.pathname.endsWith('contact.html')) {
    handleFormSubmit('contact-form', (fd) => ({
        name: fd.get('name'),
        company: fd.get('company'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        message: fd.get('message'),
        interested: document.getElementById('product-interest').checked,
        type: 'contact'
    }));
}

// Optional service worker for offline
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw.js'); // Uncomment and add sw.js for real
}

// Example device mock (commented; run in separate script)
// function sendTelemetry() {
//     fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ value: Math.random() * 100 }) });
// }
// setInterval(sendTelemetry, 2000);
