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
        refresh_token: GOOGLE_REFRESH 
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
        `
        <div
        style=
        "
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        ">
            <div 
            style=
            "
            background-color: rgb(23, 21, 21);
            color: whitesmoke;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 10%;
            height: 100vh;
            ">
                <h1
                style=
                "
                text-align: center;
                padding: 0;
                color: rgb(12, 227, 109);
                ">
                Thank you for signing in!
                </h1>
                <h2>Verify your email address</h2>
                <p
                style=
                "
                text-align: center;
                padding: 0% 10%;
                ">Hi ${mail}, thank you for registration on our site! Please click on the button below to verify and activate your account!</p>
                <a href='http://localhost:4000/auth/verification/${code}'
                style=
                "
                background-color: rgb(12, 227, 109);
                color: rgb(23, 21, 21);
                font-weight: 500;
                padding: 12px 18px;
                border-radius: 0.5rem;
                text-decoration: none;
                ">click to verify your account!</a>
                <p style="font-weight: bold; font-style: italic;">SURFACE</p>
            </div>
        </div>
        `
    }
    await transport.sendMail(mailOptions, (error, response) => { 
        console.log('enviado')
        if(error){
            console.log(error)
        } else {
            console.log("mail send to "+mail)
        }
    })
}
module.exports = sendMail