"use server";

import nodemailer from "nodemailer";

export type ContactState = {
  success: boolean;
  error: string | null;
  message: string | null;
};

export async function sendContactEmail(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return {
        success: false,
        error: "Tous les champs sont requis.",
        message: null,
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nouveau message de contact de ${name}`,
      text: `Message de contact depuis Saveur Rentable\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              background-color: #F8F5F2; /* cream */
              color: #4A3C31; /* darkBrown */
              margin: 0;
              padding: 0;
            }
            .container {
              max-w-4xl max-width: 600px;
              margin: 40px auto;
              background-color: #FFFFFF;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0,0,0,0.05);
              border: 1px solid rgba(212, 196, 173, 0.5); /* beige */
            }
            .header {
              background-color: #1A365D; /* dark blue or use terracotta? Let's use terracotta #C15C3D */
              background-color: #C15C3D;
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              font-family: 'Playfair Display', serif;
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .content {
              padding: 40px 30px;
            }
            .label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: rgba(74, 60, 49, 0.6);
              margin-bottom: 5px;
              font-weight: 700;
            }
            .value {
              font-size: 16px;
              margin-bottom: 25px;
              padding-bottom: 15px;
              border-bottom: 1px solid #D4C4AD; /* beige */
            }
            .message-box {
              background-color: #F8F5F2; /* cream */
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #C15C3D; /* terracotta */
              margin-top: 10px;
              line-height: 1.6;
              font-size: 15px;
            }
            .footer {
              background-color: #F8F5F2;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: rgba(74, 60, 49, 0.5);
              border-top: 1px solid rgba(212, 196, 173, 0.5);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SAV<span style="font-style: italic;">EUR</span> RENTABLE</h1>
            </div>
            <div class="content">
              <h2 style="font-family: 'Playfair Display', serif; margin-top: 0; color: #4A3C31;">Nouveau Message de Contact</h2>
              
              <div class="label">Expéditeur</div>
              <div class="value"><strong>${name}</strong></div>
              
              <div class="label">Adresse Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #C15C3D; text-decoration: none;">${email}</a></div>
              
              <div class="label">Contenu du Message</div>
              <div class="message-box">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div class="footer">
              Cet email a été envoyé depuis le formulaire de contact de votre site web Saveur Rentable.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      error: null,
      message: "Votre message a été envoyé avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return {
      success: false,
      error: "Une erreur s'est produite lors de l'envoi du message.",
      message: null,
    };
  }
}
