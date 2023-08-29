import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log("in mailer file" , email, emailType, userId)


    if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000,
        }
      );
    } else if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
        }
      );
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "61de9560b163a1",
        pass: "36006cb47ec12c",
      },
    });

    const mailOptions = {
      from: "abc@abc.com",
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Password RESET",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" >here</a> to ${emailType === "VERIFY" ? "Email Verification" : "Password RESET"}</p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    // const info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "bar@example.com, baz@example.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });


  } catch (error: any) {
    throw new Error(error.message);
  }
}
