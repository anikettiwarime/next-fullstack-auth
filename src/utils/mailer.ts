import nodemailer from "nodemailer";
import { EMAIL_TYPES } from "./constant";

import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === EMAIL_TYPES.VERIFY_EMAIL) {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyEmailToken: hashedToken,
          verifyEmailTokenExpires: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === EMAIL_TYPES.RESET_PASSWORD) {
      await User.findByIdAndUpdate(userId, {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordTokenExpires: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT as string),
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "aniket@gmail.com",
      to: email,
      subject:
        emailType === EMAIL_TYPES.VERIFY_EMAIL
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === EMAIL_TYPES.VERIFY_EMAIL ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === EMAIL_TYPES.VERIFY_EMAIL
          ? "verify your email"
          : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === EMAIL_TYPES.VERIFY_EMAIL ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error("Error in sendEmail", error);
    throw new Error(error.message);
  }
};

export { sendEmail };
