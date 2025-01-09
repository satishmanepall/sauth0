const nodemailer = require("nodemailer");
const { Template } = require("../dbModel/template/schema");
const Handlebars = require('handlebars');
require("dotenv").config();
//Creating the transport
const smtpUsername = 'AKIAQRHV5B4WA6WSWDHK';
const smtpPassword = 'BKjAhfSwWe1AgA3agftX+fgOKGZUihhn6XDDcIBWTt+o';

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'SMTP',
  host: 'email-smtp.ap-south-1.amazonaws.com', // Your SMTP server
  port: 465, // Port for secure SMTP
  secure: true, // true for 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});
// const sendEmail = async (toEmail, emailBody) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp-relay.gmail.com",
//       port: 465,
//       secureConnection: false,
//     });
//     message = await transporter.sendMail({
//       from: '"No Reply" <no-reply@ezsixty.com>',
//       to: toEmail,
//       subject: "Easy Sixty Account Verification",
//       html: emailBody,
//     });
//     console.log("Message sent: %s", message.messageId);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// Function to send OTP via mobilenumberemail
const sendEmail = async (email, subject, text) => {
  try {
    // Sending email
    await transporter.sendMail({
      from: 'contact@clawking.in',
      to: email,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending  email:', error);
  }
};

const sendEmailCreate = async (name, email, subject, password, templateName) => {
  // Fetch the template from MongoDB
  const template = await Template.findOne({ template_name: templateName });

  if (!template) {
    throw new Error("Email template not found");
  }

  // Compile the HTML content with dynamic values
  const compiledTemplate = Handlebars.compile(template.html_content);
  const htmlContent = compiledTemplate({
    name,
    password,
    admin_url: process.env.ADMIN_APP_URI || "https://dev-admin.sriramanavami.com"
  });
  try {
    // Sending email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'contact@clawking.in',
      to: email,
      subject: template?.subject,
      html: htmlContent,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending  email:', error);
  }
};
const sendResetList = async (name, email, subject, resetLink,templateName) => {
  try {
      const template = await Template.findOne({ template_name: templateName });
      if (!template) throw new Error("Template not found");
      // Compile HTML with dynamic values
      const compiledTemplate = Handlebars.compile(template.html_content);
      const htmlContent = compiledTemplate({ name, resetLink });

       // Sending email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'contact@clawking.in',
      to: email,
      subject: template?.subject,
      html: htmlContent,
    });
    console.log('Email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
  }
};
// // Function to send OTP via email
// const sendEmail = async (name, email, subject, password, templateName) => {
//   try {
//     // Fetch the template from MongoDB
//     const template = await Template.findOne({ template_name: templateName });

//     if (!template) {
//       throw new Error("Email template not found");
//     }

//     // Compile the HTML content with dynamic values
//     const compiledTemplate = Handlebars.compile(template.html_content);
//     const htmlContent = compiledTemplate({
//       name,
//       password,
//       admin_url: process.env.ADMIN_APP_URI || "https://dev-admin.sriramanavami.com"
//     });

//     // Set up email options
//     const mailOptions = {
//       from: '"No Reply" <no-reply@samyutha.com>', // sender address
//       to: email, // recipient's email
//       subject: template?.subject, // email subject
//       html: htmlContent, // email body with compiled HTML
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');

//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };
module.exports = { sendEmail ,sendEmailCreate,sendResetList};
