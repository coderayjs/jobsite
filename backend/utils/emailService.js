// utils/emailService.js
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options) {
    try {
      // Render email template if template name is provided
      let html = options.html;
      if (options.template) {
        html = await this.renderTemplate(options.template, options.data);
      }

      const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error("Email error:", error);
      throw error;
    }
  }

  async renderTemplate(templateName, data) {
    const templatePath = path.join(
      __dirname,
      "../templates/emails",
      `${templateName}.ejs`
    );
    return await ejs.renderFile(templatePath, data);
  }

  // Email templates
  async sendVerificationEmail(user, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    await this.sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      template: "verification",
      data: {
        name: user.firstName,
        verificationUrl,
      },
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await this.sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      template: "passwordReset",
      data: {
        name: user.firstName,
        resetUrl,
      },
    });
  }

  async sendApplicationNotification(employer, application) {
    await this.sendEmail({
      to: employer.email,
      subject: "New Job Application Received",
      template: "newApplication",
      data: {
        employerName: employer.firstName,
        jobTitle: application.job.title,
        applicantName: `${application.applicant.firstName} ${application.applicant.lastName}`,
      },
    });
  }

  async sendApplicationStatusUpdate(application) {
    await this.sendEmail({
      to: application.applicant.email,
      subject: "Application Status Updated",
      template: "applicationStatus",
      data: {
        name: application.applicant.firstName,
        jobTitle: application.job.title,
        status: application.status,
        company: application.job.company,
      },
    });
  }

  async sendJobAlert(user, job) {
    await this.sendEmail({
      to: user.email,
      subject: "New Job Match Found",
      template: "jobAlert",
      data: {
        name: user.firstName,
        jobTitle: job.title,
        company: job.company,
        jobUrl: `${process.env.FRONTEND_URL}/jobs/${job._id}`,
      },
    });
  }
}

module.exports = new EmailService();
