const express = require("express")
const cors = require('cors') // Import cors package
const mongoose = require("mongoose")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // Destination directory for uploaded files
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
// require('dotenv').config()

const loginController = require('./controllers/loginController'); 

const { url } = require('./common/mongo-url')
const { mobileLogin } = require('./login-api/login-mobile');
const { loginWithMobile } = require('./login-api/login-with-mobile');
const { loginWithEmail } = require('./login-api/login-with-email');
const { loginEmailPass } = require('./login-api/login-with-email-pass');


const app = express(); 
const PORT = process.env.PORT || 5000;
//const dbURI = 'mongodb://127.0.0.1:27017/pinnacle'   

// Use cors middleware to allow requests from different origins
app.use(cors());// Use cors middleware to allow requests from different origins

// Increase payload size limit to 10MB (for example)
app.use(express.json({ limit: '10mb' }));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


async function connectToDatabase() { 
  try {   
    // await mongoose.connect(url, { 
      await mongoose.connect(process.env.MONGODB_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

connectToDatabase();

// Routes
app.post('/token-details', loginController.tokenDetails);

app.get('/mobile-login', (req, res) =>  mobileLogin(req, res)) ;
app.post('/login-with-mobile', (req, res) =>  loginWithMobile(req, res))


app.post('/whatsapp-otp', loginController.whatsAppOtp)    

app.post('/login-with-email', loginController.loginWithEmail)

app.post('/login-with-email-pass', loginController.loginEmailPass)
app.post('/send-email', loginController.sentEmail)   
app.post('/update-pass', loginController.setPassword)
app.post('/update-goal', loginController.updateGoal)
app.post('/update-goal-mobile', loginController.updateGoalMobile)
app.post('/update-mobile-otp', loginController.updateMobileOtp)

app.post('/update-mobile-otp-email', loginController.updateMobileOtpEmail)
app.post('/email-verification-mobile-fullname', loginController.emailVerificationMobileFullName)
app.post('/mobile-verification-email-fullname', loginController.mobileVerificationEmailFullName)
app.post('/terms-conditions', loginController.termsConditions)
app.post('/login-gmail', loginController.loginGmail)

app.post('/logout', loginController.logout)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

