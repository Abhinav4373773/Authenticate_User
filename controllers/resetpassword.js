const User = require('../models/UserModel');
const nodemailer = require('nodemailer');


exports.resetpassword=async (req, res) => {
    try {
        const { userName } = req.body;
        // Check if user exists with provided email
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User with this email doesn't exist." });
        }

        // Generate a password reset token
        function generateRandomToken(length = 20) {
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let token = '';
            for (let i = 0; i < length; i++) {
                token += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return token;
        }
        const token = generateRandomToken(); // You need to implement this function

        // Save the token to the user document in the database
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send email with password reset link
        const transporter = nodemailer.createTransport({
            // Configure your email provider here
            // Example for Gmail:
            service: 'Gmail',
            auth: {
              // ihave removed email and password for the security purpose.
                user: 'your-email@gamil.com',//
                pass: 'your-email-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
                + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
                + `http://${req.headers.host}/reset-password/${token}\n\n`
                + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending email.' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Password reset email sent.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
