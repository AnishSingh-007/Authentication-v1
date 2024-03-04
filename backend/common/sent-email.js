const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Node.js built-in module for generating random tokens
const { StudentRegister } = require("../models/student-register");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MANDRILL_APP_HOST, // Replace with your email service provider
    port: process.env.MANDRILL_APP_PORT,
    secure: false, // For TLS support
    auth: {
        user: process.env.MANDRILL_APP_USER,
        pass:  process.env.MANDRILL_APP_PASS
    }
});

const updateTokenToServer = async (token, email) => {
    try{
        const resultSR = await StudentRegister.find({email_id: email});
        if (resultSR.length > 0) {
            console.log('email result found')
            //update student register
            const r1 = await StudentRegister.updateOne({ email_id: email }, {
                token: token,
                token_status: '0'
              });
            // console.log('updated : token and token_status')
            console.log(r1)
        } else {
            console.log('email result not found')
            //insert to student register
            const student = new StudentRegister({
                email_id: email,
                token: token,
                token_status: '0'
            });
            const r2 = await student.save()
            // console.log('inserted : email_id & token & token_status')
            console.log(r2)
        }
    } catch (e) {
        console.log('error update token.')
    }
}

const sentEmail = async (req, res) => {
    const email_id = req.body.email_id;
    console.log(email_id);
    var result = '';
    const verificationToken = crypto.randomBytes(20).toString('hex'); // Generate a random token
    //send token to server with 0 status and emailid
    updateTokenToServer(verificationToken, "haridutt@ssccglpinnacle.com");
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    const mailOptions = {
        from: 'support@ssccglpinnacle.com',
        to: 'haridutt@ssccglpinnacle.com',
        subject: 'Registration Email',
        text: `Click the following link to verify your email: ${verificationLink}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            result = {"status": "failed", "message": error};
            //res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            result = {"status": "success", "message": info.response};
            //res.send('Email sent successfully');
        }
        res.json(result);
    });
}

module.exports = {
    sentEmail
}