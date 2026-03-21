import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendWelcomeEmail(
  to: string,
  subject: string,
  content: string,
) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn("GMAIL_USER or GMAIL_PASS not set. Welcome email skipped.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #faf7f2;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(62, 44, 35, 0.08);
          }
          .header {
            background-color: #3e2c23;
            padding: 30px;
            text-align: center;
          }
          .logo {
            font-family: 'Georgia', serif;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            text-decoration: none;
          }
          .logo-amp {
            color: #c46a4a;
          }
          .content {
            padding: 40px 30px;
            line-height: 1.6;
            color: #3e2c23;
            font-size: 16px;
          }
          .content p {
            margin-bottom: 20px;
          }
          .content a {
            color: #c46a4a;
            text-decoration: underline;
          }
          .content ul, .content ol {
            padding-left: 20px;
            margin-bottom: 20px;
          }
          .content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
          }
          .footer {
            padding: 30px;
            background-color: #e8dccb;
            text-align: center;
            font-size: 14px;
            color: #3e2c23;
            opacity: 0.8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Saveurs Rentables</div>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Saveurs & Rentables. Tous droits réservés.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Saveur Rentable" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Welcome email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

export async function sendPurchaseConfirmationEmail(
  to: string,
  recipeName: string,
  recipeUrl: string,
) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn(
      "GMAIL_USER or GMAIL_PASS not set. Purchase confirmation email skipped.",
    );
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #fcfaf7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(62, 44, 35, 0.05);
            border: 1px solid rgba(62, 44, 35, 0.05);
          }
          .header {
            background: linear-gradient(135deg, #3e2c23 0%, #2a1e18 100%);
            padding: 50px 40px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: -0.5px;
          }
          .logo-accent {
            color: #c46a4a;
          }
          .content {
            padding: 50px 40px;
            line-height: 1.7;
            color: #3e2c23;
            font-size: 16px;
          }
          .welcome-text {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            color: #1a1a1a;
          }
          .recipe-card {
            background-color: #f8f5f1;
            border-radius: 12px;
            padding: 24px;
            margin: 30px 0;
            border-left: 4px solid #c46a4a;
          }
          .recipe-name {
            font-weight: 700;
            color: #c46a4a;
            display: block;
            margin-bottom: 8px;
            font-size: 18px;
          }
          .cta-container {
            text-align: center;
            margin-top: 40px;
          }
          .cta-button {
            display: inline-block;
            background-color: #c46a4a;
            color: #ffffff !important;
            padding: 18px 36px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
            box-shadow: 0 4px 15px rgba(196, 106, 74, 0.3);
          }
          .footer {
            padding: 40px;
            background-color: #f8f5f1;
            text-align: center;
            font-size: 13px;
            color: #7c6c64;
          }
          .social-links {
            margin-bottom: 20px;
          }
          .copyright {
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Saveurs <span class="logo-accent">Rentables</span></div>
          </div>
          <div class="content">
            <h1 class="welcome-text">Merci pour votre achat !</h1>
            <p>Bonjour,</p>
            <p>Votre paiement a été validé avec succès. Vous avez maintenant accès à votre nouvelle recette exclusive.</p>
            
            <div class="recipe-card">
              <span class="recipe-name">${recipeName}</span>
              <p style="margin: 0; font-size: 14px; color: #7c6c64;">Cette recette est désormais disponible dans votre espace personnel.</p>
            </div>

            <div class="cta-container">
              <a href="${recipeUrl}" class="cta-button">Accéder à ma recette</a>
            </div>

            <p style="margin-top: 40px;">Bonne cuisine,<br>L'équipe Saveurs Rentables</p>
          </div>
          <div class="footer">
            <div class="copyright">
              &copy; ${new Date().getFullYear()} Saveurs & Rentables. Tous droits réservés.<br>
              Développez votre rentabilité culinaire.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Saveur Rentable" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Confirmation d'achat : ${recipeName}`,
      html: htmlContent,
    });
    console.log("Purchase confirmation email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending purchase confirmation email:", error);
    throw error;
  }
}
