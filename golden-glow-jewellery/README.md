# Golden Glow Jewellery

A responsive jewellery storefront based on the supplied Golden Glow HTML design. The contact form sends an email notification to the store inbox using Node.js, Express and Nodemailer.

## Requirements
- Node.js 18 or newer
- An SMTP mailbox to send website notifications

## Run locally
1. Open this folder in VS Code.
2. In the terminal, install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to a new file named `.env`.
4. Fill in the SMTP details and the store inbox in `.env`.
5. Start the website:
   ```bash
   npm start
   ```
6. Visit http://localhost:3000

## Email setup (Gmail example)
- Turn on 2-Step Verification for the sender Google account.
- Create a Google App Password and put it in `SMTP_PASS`. Do not use your normal Gmail password.
- Set `SMTP_USER` and `FROM_EMAIL` to the sender Gmail address.
- Set `STORE_EMAIL` to the inbox where you want to receive enquiry notifications.
- Keep `.env` private. It is excluded from Git by `.gitignore`.

The contact form sends the customer's name, email, optional phone number and message to `STORE_EMAIL`. Replies to the notification are directed to the customer's email address.

## Upload to GitHub
1. Create a new empty repository on GitHub.
2. Do **not** upload your `.env` file or real email credentials.
3. Upload/push the contents of this project folder.
4. To deploy it online, choose a Node.js host that supports environment variables and configure the same variables from `.env.example` in the host dashboard.

## Project structure
```text
golden-glow-jewellery/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

Product prices and images are sample content; update them to match your real catalogue before publishing.
