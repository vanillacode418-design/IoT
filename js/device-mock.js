// Example device mock - run in Node or browser console
// Comment: Replace WEBHOOK_URL with real API endpoint
const WEBHOOK_URL = "<REPLACE_WITH_WEBHOOK_URL>";

function sendTelemetry() {
    const value = Math.random() * 100;
    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: 1, value, timestamp: new Date().toISOString() })
    }).then(() => console.log('Sent:', value));
}

setInterval(sendTelemetry, 2000);
