# IoT + AI Automation Website

A complete static website for an IoT + AI automation company. Built with HTML/CSS/JS (vanilla, no frameworks).

## Run Locally
1. Clone or download the files.
2. Open `index.html` in a browser, or use `npx serve` for a local server.

## Deploy to Replit
1. Create a new Replit project (HTML/CSS/JS template).
2. Upload all files/folders: index.html, product.html, bot.html, pricing.html, contact.html, css/styles.css, js/app.js, assets/ (empty), .env.example, LAUNCH_NOTE.txt.
3. Click "Run" – Replit will serve the site at the preview URL.

## Configure Webhook
- Replace `<REPLACE_WITH_WEBHOOK_URL>` in `js/app.js` with your n8n/Zapier webhook.
- Example n8n workflow: HTTP Request node (webhook) → Parse JSON → Gmail/SMS node.
- Test with curl: `curl -X POST YOUR_WEBHOOK_URL -H "Content-Type: application/json" -d '{"email":"test@example.com","type":"newsletter"}'`
- Example JSON payload from forms: {"name":"John","email":"john@example.com","type":"contact"}

## Replace API Keys
- In `js/app.js`, replace placeholders for CHATGPT_API_KEY, etc. (see comments).
- Get keys from: OpenAI, Twilio, Stripe.

## Production Checklist
- Add SSL (via host like Replit/Netlify).
- Set CORS on webhook if needed.
- Compress hero images (though URL-based; use tools like TinyPNG if localizing).
- Enable loading="lazy" on imgs (already on map iframe).
- Add real favicon and manifest.

To zip: `zip -r site.zip .` (run in project folder).
