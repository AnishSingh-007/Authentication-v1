const { promisify } = require("util");
const { StudentRegister } = require("../models/student-register");
const { Footer } = require("../models/footer");
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Node.js built-in module for generating random tokens
const { sentOtp } = require("../common/sent-otp");
const axios = require('axios');
const https = require('https'); // Import the https module
const sdk = require('api');

const jwt = require("jsonwebtoken");


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
const createSendToken = async (user, statusCode, res, message) => {
    // console.log("USER._ID", user);
    const token = signToken(user._id);

    currentUser = await StudentRegister.findOne({email_id: user.email_id})

    console.log(currentUser);
    await currentUser.saveToken(token);
    await currentUser.save();
  
    // res.cookie('jwt', token, {
    //   expires: new Data( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 ),
    //   secure: true,
    //   httpOnly: true
    // });
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      //secure; true,
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    res.cookie("jwt", token, cookieOptions);
  
    user.password = undefined; // remove the password from the output
  

    res.status(statusCode).json({
      status: "success",
      message: message,
      details: user,
    //   token,
    //   data: {
    //     user,
    //   },
    });
  };

exports.termsConditions = async (req, res) => {
    try {
        const result = await Footer.find({})
        res.json(result)
    } catch (e) {
        console.log('error ' + e)
        res.json({'status': 'failed', 'message': 'error ' })
    }
}

exports.loginWithEmail = async (req, res) => {
    const email_id = req.body.email_id;
    console.log(email_id);
    try {
        const resultSR = await StudentRegister.find({email_id: email_id});
        res.json(resultSR);
    } catch (e) {
        console.log(e)
        res.json({"status": "failed", "message" : 'error login with email'})
    }
}

exports.loginEmailPass = async (req, res) => {
    let resultSR;
    try {
        const userId = req.body.userid;
        const pass = req.body.pass;
        if (userId.includes("@")) {
             resultSR = await StudentRegister.find({email_id: userId})
            if (resultSR.length > 0) {
                let details = resultSR[0];
                if (details.password !== undefined && details.password !== '') {
                    if (details.password == pass) {

                        // console.log("resultSR", resultSR);
                        createSendToken(details, 200, res)
                        // res.json({'status': 'success', 'details': resultSR});
                    } else {
                        res.json({'status': 'failed', 'message': 'Incorrect password'});
                    }
                } else {
                    res.json({'status':'failed', 'message': 'Password not found'});
                }
            } else {
                res.json({'status':'failed', 'message': 'No user id found'});
            }
        } else {
            const resultSR = await StudentRegister.find({mobile_number: userId})
            if (resultSR.length > 0) {
                let details = resultSR[0];
                if (details.password !== undefined && details.password !== '') {
                    if (details.password == pass) {
                        res.json({'status': 'success', 'details': resultSR});
                    } else {
                        res.json({'status': 'failed', 'message': 'Incorrect password'});
                    }
                } else {
                    res.json({'status':'failed', 'message': 'Password not found'});
                }
            } else {
                res.json({'status':'failed', 'message': 'No user id found'});
            }
        }
    } catch (e) {
        console.log('error in login ', e)
        res.json({"status": "failed", "message" : 'error login with userid & password'})
    }
}

exports.setPassword = async (req, res) => {
    const email_id = req.body.email_id;
    const pass = req.body.pass;
    console.log(email_id);
    console.log(pass);
    var result = "";
    try {
        await StudentRegister.updateOne({ email_id: email_id }, {
            password: pass
          });
        console.log('updated : password')
        const resultSR2 = await StudentRegister.find({email_id: email_id});
        res.json(resultSR2);
    } catch (e) {
        result = {"status":"failed", "message": "error updating password"};
        res.json(result);
    }
}

exports.tokenDetails = async (req, res) => {
    const token = req.body.token;
    console.log(token);
    try {
        const result = await StudentRegister.find({token: token});
        if (result.length > 0) {
            await StudentRegister.updateOne({ token: token }, {
                token_status: '1'
                });
            console.log('updated : goal with email')
            const result2 = await StudentRegister.find({token: token});
            console.log("RESULT 1 : ", result);
            console.log("RESULT 2 :", result2);
            res.json(result2);
        } else {
            res.json(result);
        }
    } catch (e) {
        console.log('error in token details ' + e)
        res.json({"status":"failed"});
    }
}

exports.updateGoal = async (req, res) => {
    const email_id = req.body.email_id;
    const goal = req.body.goal;
    console.log(email_id);
    console.log(goal);
    try {
        await StudentRegister.updateOne({ email_id: email_id }, {
            goal: goal
            });
        console.log('updated : goal with email')
        const resultSR2 = await StudentRegister.find({email_id: email_id});
        res.json(resultSR2);
    } catch (e) {
        result = {"status":"failed", "message": "error updating goal"};
        res.json(result);
    }

}

exports.updateGoalMobile = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const goal = req.body.goal;
    console.log(mobile_number);
    console.log(goal);
    try {
        await StudentRegister.updateOne({ mobile_number: mobile_number }, {
            goal: goal
            });
        console.log('updated : goal with mobile')
        const resultSR2 = await StudentRegister.find({mobile_number: mobile_number});
        res.json(resultSR2);
    } catch (e) {
        result = {"status":"failed", "message": "error updating goal"};
        res.json(result);
    }

}

exports.updateMobileOtp = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const otp = req.body.otp;
    console.log(mobile_number);
    console.log(otp);
    try {
        const resultSR = await StudentRegister.find({mobile_number: mobile_number});
        if (resultSR.length > 0) {
            await StudentRegister.updateOne({ mobile_number: mobile_number }, {
                otp: otp
                });
                const currentUser = await StudentRegister.findOne({mobile_number: mobile_number});
                
                token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                  });

                  console.log("LATEST TOKEN;", token)
                await currentUser.saveToken(token);
                await currentUser.save();



            const resultSR2 = await StudentRegister.find({mobile_number: mobile_number});
            
            // let details = await resultSR2[0];
            // console.log("DETAILS", resultSR2);   
            // createSendToken(resultSR2, 200, res)
            res.json(resultSR2);
        } else {
            const student = new StudentRegister({
                mobile_number: mobile_number,
                otp: otp
            });
            await student.save()
            const resultSR3 = await StudentRegister.find({mobile_number: mobile_number});
            res.json(resultSR3);
        }
    } catch (e) {
        let result = {"status":"failed", "message": "error updating mobile otp"};
        res.json(result);
        console.log(e)
    }
}

exports.updateMobileOtpEmail = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const email_id = req.body.email_id;
    const otp = req.body.otp;
    console.log(mobile_number);
    console.log(otp);
    console.log(email_id);
    try {
        await StudentRegister.updateOne({ email_id: email_id }, {
            otp: otp,
            mobile_number: mobile_number
            });
        const resultSR2 = await StudentRegister.find({mobile_number: mobile_number});
        res.json(resultSR2);
    } catch (e) {
        let result = {"status":"failed", "message": "error updating mobile otp"};
        res.json(result);
        console.log(e)
    }
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MANDRILL_APP_HOST, // Replace with your email service provider
    port:  process.env.MANDRILL_APP_PORT,
    secure: false, // For TLS support
    auth: {
        user:  process.env.MANDRILL_APP_USER,
        pass:  process.env.MANDRILL_APP_PASS
    }
});

const updateTokenToServer = async (token, email) => {
    try {
        const resultSR = await StudentRegister.find({email_id: email});
        if (resultSR.length > 0) {
            //update token and token status
            await StudentRegister.updateOne({ email_id: email }, {
                token: token,
                token_status: '0'
              });
            // console.log('updated : token and token_status')
        } else {
            //insert to student register
            const student = new StudentRegister({
                email_id: email,
                token: token,
                token_status: '0'
            });
            await student.save()
            console.log('inserted : email_id & token & token_status')
        }
    } catch (e) {
        console.log('error update token. ' + e)
    }
}

exports.sentEmail = async (req, res) => {
    const email_id = req.body.email_id;
    console.log(email_id);
    var result = '';
    const verificationToken = crypto.randomBytes(20).toString('hex'); // Generate a random token
    //send token to server with 0 status and emailid
    updateTokenToServer(verificationToken, email_id);
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    const mailOptions = {
        from: 'support@ssccglpinnacle.com',
        to: email_id,
        subject: 'Registration Email',
        text: `Click the following link to verify your email: ${verificationLink}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ' + error);
            result = {"status": "failed", "message": error}
        } else {
            console.log('Email sent: ' + info.response)
            result = {"status": "success", "message": info.response}
        }
        res.json(result);
    });
}

const updateTokenToServerWithMobileFullName = async (token, email, mobile, full_name) => {
    try{
        console.log(token, email, mobile, full_name);
        const resultSR = await StudentRegister.find({mobile_number: mobile});
        if (resultSR.length > 0) {
            console.log('mobile found')
            //update student register
            await StudentRegister.updateOne({ mobile_number: mobile }, {
                token: token,
                token_status: '0',
                full_name: full_name,
                email_id: email
              });
            // console.log('updated : token & token_status & full_name & email')
        } else {
            console.log('mobile not found')
        }
    } catch (e) {
        console.log('error update token.')
    }
}

exports.emailVerificationMobileFullName = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const email_id = req.body.email_id;
    const full_name = req.body.full_name;
    console.log(mobile_number);
    console.log(full_name);
    var result = '';
    const verificationToken = crypto.randomBytes(20).toString('hex'); // Generate a random token
    //send token to server with 0 status and emailid
    updateTokenToServerWithMobileFullName(verificationToken, email_id, mobile_number, full_name);
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    const mailOptions = {
        from: 'support@ssccglpinnacle.com',
        to: email_id,
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

exports.mobileVerificationEmailFullName = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const email_id = req.body.email_id;
    const full_name = req.body.full_name;
    console.log(email_id);
    console.log(mobile_number);
    console.log(full_name);
    try {
        var otp = Math.floor(1000 + Math.random() * 9000);
        sentOtp(mobile_number, "Student", otp)
        var result = {'status':'success', "otp": otp};
        const currentUser = await StudentRegister.updateOne({ email_id: email_id }, {
            full_name: full_name
            });
            // const resultSR2 = await StudentRegister.find({email_id: email_id});
            // const details = resultSR2[0];
            // console.log("DETAILS",details);
            // createSendToken(details, 200, res)
        res.json(result);
    } catch (e) {
        res.json({"status":"failed", 'message': "failed to update name"})
    }
}

exports.loginGmail = async (req, res) => {
    try {
        const email_id = req.body.email;
        const full_name = req.body.name;
        console.log(email_id);
        console.log(full_name);
        const resultSR = await StudentRegister.find({email_id: email_id});
        if (resultSR.length > 0) {
            //update token and token status
            await StudentRegister.updateOne({ email_id: email_id }, {
                updated_ts: Date.now(),
                full_name: full_name
              });
            console.log('updated : date time')
            res.json({'status': 'success', 'message': 'updated'})
        } else {
            //insert to student register
            const student = new StudentRegister({
                email_id: email_id,
                register_type: 'gmail',
                full_name: full_name
            });
            await student.save()
            console.log('inserted : email & register type')
            res.json({'status': 'success', 'message': 'inserted'})
        }
   } catch (e) {
        console.log('error ' + e)
        res.json({'status': 'failed', 'message': 'error login gmail'})
   }
}

//WHATSAAP OTP SENDING
const optInNumber = async (mobile) => {
    const axiosConfig = {
        url: 'https://api.gupshup.io/sm/api/v1/app/opt/in/PinnacleCivilServices',
        method: 'POST',
        data: mobile,
        headers: {
          'apikey': 'dax9pdciu3eh90621lhn1ylbgd8dmjix', // Replace with your actual API key
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // Disabling SSL verification (not recommended for production)
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    try {
        const response = await axios(axiosConfig);
        console.log(response.status)
        console.log(response.data)
        //res.status(response.status).json(response.data);
    } catch (error) {
        console.log('error to opt in')
        console.log(error)
        //res.status(error.response?.status || 500).json({ error: 'An error occurred' });
    }
}

const sendTemplate = async (data) => {
    const axiosConfig = {
        url: 'http://api.gupshup.io/sm/api/v1/template/msg',
        method: 'POST',
        data: data,
        headers: {
          'apikey': 'dax9pdciu3eh90621lhn1ylbgd8dmjix', // Replace with your actual API key
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        // Disabling SSL verification (not recommended for production)
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    try {
        const response = await axios(axiosConfig);
        console.log(response.status)
        console.log(response.data)
        //res.status(response.status).json(response.data);
    } catch (error) {
        console.log('error to opt in')
        console.log(error)
        //res.status(error.response?.status || 500).json({ error: 'An error occurred' });
    }
}

exports.whatsAppOtp = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    console.log(mobile_number);
    let mobile = 'user=91' + mobile_number
    console.log(mobile);
    optInNumber(mobile)
    var otp = Math.floor(1000 + Math.random() * 9000);
    otp = otp + ''
    console.log(otp);
    let source = '917217743806'
    let destination  = '91' + mobile_number
    var templateJson = {
		id : '22d80f86-945e-4762-9d57-b94758196e9b',
		params : [otp]
	};
    console.log(templateJson);
    var data = "template=" + JSON.stringify(templateJson) + "&source=" + source + "&destination=" + destination;
    console.log(data);
    sendTemplate(data)
    res.json({'otp': otp})
}

exports.logout = async (req, res) => {
    console.log(req.body.authenticationToken);
    // const token = req.body.authenticationToken;

    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const currentUser = await StudentRegister.findById(decoded.id);

    // // const currentUser = await StudentRegister.find({authenticationToken: token});

    // console.log(currentUser);
    // // const authenticationToken = data.authenticationToken;

    //   try {
    //     await StudentRegister.updateOne({ _id: decoded.id}, {
    //         authenticationToken: ""
    //         });
    //     res.json({'status': 'success', 'message': 'Logout successfully'});
    // } catch (e) {
    //     let result = {"status":"failed", "message": "error updating mobile otp"};
    //     res.json(result);
    //     console.log(e)
    // }

    res.json({'status': 'success', 'message': 'Logout successfully'})

};

