# 📧 Email Notification Microservice - Back Office

This microservice is reponsible for sending email notification to a **single user (YOU)**.  
No database is used — credentials are stored in a `.env` file.

---

## 🚀 How It Works

The service exposes **a single notification route** that returns a **success** or **failure** based on the result of the email sending process.

---

## 📦 Installation & Launch

### Clone the project

    >   git clone <repo-url>

### Navigate to the project folder

    >   cd project-folder-name

### Install dependencies

    >   npm install

### Add environment variables

Create a `.env` file at the root of the project with the following content :

```
PORT=4001
SMTP_SERVICE=gmail
SMTP_USER=yourmail
SMTP_PASS=yourpassword
NOTIFY_TO=yourmail

```

### Run tests

    >   npm test

### Start the server

    >   npm start

---

## 📡 Available Route

### POST /notification

- **URL :** `http://localhost:4001/notification`.
- **BODY (JSON) :**

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello from the contact form!"
}
```

---

## 🎴 Technologies Used

- ⚛️[**Express**](https://expressjs.com/): A minimal and flexible Node.js web application framework for building APIs and web applications.
- ⚛️[**nodemailer**](https://www.npmjs.com/package/nodemailer): A module to send emails easily from Node.js applications.
- ⚛️[**handlebars**](https://www.npmjs.com/package/handlebars): A templating engine to generate dynamic email content.
- ⚛️[**mjml**](https://www.npmjs.com/package/mjml): A markup language to create responsive email templates
- ⚛️[**express-rate-limit**](https://www.npmjs.com/package/express-rate-limit): Middleware to limit repeated requests to public APIs and prevent abuse.
- ⚛️[**CORS**](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing.
- ⚛️[**dotenv**](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into process `.env`.

---

## 🔒 Security

Make sure to **never** commit your `.env` file to a public repository._

---

## 📬 Notes

It simply send a mail. Use with care 😄

---

## 🏯 License

This project is licensed under the [MIT License](LICENSE.md) - share, modify, live in peace! ☠️

---

## 🗺️ Contact

For any inquiries, suggestions, or collaboration opportunities, don't hesitate to contact me. 📜

---

## 🧑🏻‍💻 Author

Created by TheLeon 🦁.

> "Creativity is intelligence having fun." - Albert Einstein ☄️

Thanks for visiting my github! 🩵

And as we say in France : Merci ! 💙🤍❤️
