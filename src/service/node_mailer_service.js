const nodemailer = require("nodemailer");
const { Template } = require("../dbModel/template/schema");
const Handlebars = require('handlebars');
// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ramanjaneyareddy.pandugula@samyutha.com",
        pass: "gopi123456",
    },
});

// Function to send OTP via email
const sendEmail = async (name, email, subject, password,templateName) => {
    try {
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

        // Set up email options
        const mailOptions = {
            from: '"No Reply" <no-reply@samyutha.com>', // sender address
            to: email, // recipient's email
            subject: template?.subject, // email subject
            html: htmlContent, // email body with compiled HTML
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to send OTP via email
const sendResetList = async (name, email, subject, resetLink,templateName) => {
    try {
        const template = await Template.findOne({ template_name: templateName });
        if (!template) throw new Error("Template not found");
        // Compile HTML with dynamic values
        const compiledTemplate = Handlebars.compile(template.html_content);
        const htmlContent = compiledTemplate({ name, resetLink });

        // Set up email options
        const mailOptions = {
            from: '"No Reply" <no-reply@samyutha.com>', // sender address
            to: email, // recipient's email
            subject: subject, // email subject
            html: htmlContent, // email body with compiled HTML
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

    } catch (error) {
        console.error('Error sending email:', error);
    }
};
module.exports = { sendEmail ,sendResetList};
