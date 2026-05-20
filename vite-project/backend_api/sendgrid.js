import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error("SENDGRID_API_KEY is not set. Make sure backend_api/.env is loaded before route imports.");
}

sgMail.setApiKey(apiKey);
export default sgMail;
