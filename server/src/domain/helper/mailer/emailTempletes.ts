export const generateOtpEmailContent = (name:string, otp:string) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .email-container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
          color: #555555;
        }
        .otp-code {
          margin: 20px 0;
          padding: 10px 20px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          background-color: #4CAF50;
          border-radius: 5px;
          display: inline-block;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #777777;
        }
        .verify-button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .verify-button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">Verify Your Email Address</div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for registering with us. To complete your registration, please use the OTP below:</p>
          <div class="otp-code">${otp}</div>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <a href="#" class="verify-button">Verify Email</a>
        <div class="footer">
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};




export const generateResendOtpEmailContent = (name:string, otp:string) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Resend</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .email-container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
          color: #555555;
        }
        .otp-code {
          margin: 20px 0;
          padding: 10px 20px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          background-color: #4CAF50;
          border-radius: 5px;
          display: inline-block;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #777777;
        }
        .verify-button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .verify-button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">Resend OTP</div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>As requested, here is your OTP:</p>
          <div class="otp-code">${otp}</div>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <a href="#" class="verify-button">Verify Email</a>
        <div class="footer">
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
