const Inquiry = require("../model/Inquiry");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const handleNewInq = async (req, res) => {
  const { purpose, name, phoneno, email, branch, questions } = req.body;
  const myemail = process.env.SENDER_EMAIL;
  if (!email)
    return res.status(400).json({ message: "Inquiry must not be empty." });

  try {
    //create and store the new user
    const result = await Inquiry.create({
      purpose: purpose,
      name: name,
      phoneno: phoneno,
      email: email,
      branch: branch,
      questions: questions,
    });

    const oauth2Client = new OAuth2(
      "674632630176-s9o246a6jfgh05tteiploruisfhka5mn.apps.googleusercontent.com", // ClientID
      "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", // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04rvDRAsihX0mCgYIARAAGAQSNwF-L9Ir5P_s06pukcAZTlIMNQ_XISTqTkt-UuoLvGkaZjGksg08ycBIgr3urhsW5fJ8s0XUfeM",
    });
    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: myemail,
        clientId:
          "674632630176-s9o246a6jfgh05tteiploruisfhka5mn.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:
          "1//04rvDRAsihX0mCgYIARAAGAQSNwF-L9Ir5P_s06pukcAZTlIMNQ_XISTqTkt-UuoLvGkaZjGksg08ycBIgr3urhsW5fJ8s0XUfeM",
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: myemail,
      to: email,
      subject: "Inquiry for Marlyn's House Rental",
      generateTextFromHTML: true,
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Confirmation Email for Rent Inquiry</title>
        
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <h1>Marlyn's House Rental</h1>
          <hr style="border:none;border-top:1px solid #eee" />
        <p> Hello ${name}, <br>
        Thank you for sending us an inquiry. </p>
    
        <p> You can visit the apartment in ${branch} for a full view of the
        apartment and its conditions. <br>
    
        Your contact throughout your visit will be Norlyn Fernandez Coronel, 
        their mobile number is 09673196494 and home no. 02-8254-6878, please retain this
         throughout your visit in the event of an emergency or you simply need to
         contact the landowner. Please ensure you are familiar with all the details of
         the apartment you have booked by reading the apartment details on the website. <br>
    
        Visits to the apartment is from 10:00am - 7:00pm. 
        If you wish to come earlier than 10:00am on your day of visit, please 
        contact Norlyn Fernandez Coronel to schedule your visit as soon as possible. <br><br>
    
        Thank you for your interest in availing an apartment from us! <br> </p>
    
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Marlyn's House Rental</p>
            <p>Quiapo, Manila</p>
            <p>NCR</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });

    console.log(result);

    res.status(201).json({ success: `Inquiry sent!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewInq };
