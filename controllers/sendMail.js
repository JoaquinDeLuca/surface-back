const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const {
    GOOGLE_ID,
    GOOGLE_SECRET,
    GOOGLE_URL,
    GOOGLE_REFRESH,
    GOOGLE_USER
} = process.env
const sendMail = async (mail, code) => {
    const client = new OAuth2(
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
    client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESH   
    })  
    const accessToken = client.getAccessToken()
   
    const transport = nodemailer.createTransport({ 
        service: "gmail",
        auth: {
            user: GOOGLE_USER,
            type: "OAuth2",
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false 
        }
    })
    const mailOptions = {
        form: GOOGLE_USER,
        to: mail,
        subject: "Verify your SurFace account",
    html:
    `<div>
    <h1>Hi! ${mail}</h1>
    <a href='http://localhost:4000/auth/verify/${code}'>click to verify your account!</a>
    </div>`
        
    }
    await transport.sendMail(mailOptions, (error, response) => { 
        if(error){
            console.log(error)
        } else {
            console.log("mail send to "+mail)
        }
    })
}
module.exports = sendMail