import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

// Create a transporter
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail", // or your email service provider
  auth: {
    user: "muhammedrashi59@gmail.com",
    pass: "pzjd zbqf nrxl rffa", // Replace with your App Password
  },
});

// Define a function to send an email with HTML content
export function sendEmail(subject: string, Content: string, to: string): void {
  const mailOptions: SendMailOptions = {
    from: "muhammedrashi59@gmail.com",
    to: to,
    subject: subject,
    html: Content, // Use HTML content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
}

// Example usage with an HTML email template


// Call the function with the HTML email content

