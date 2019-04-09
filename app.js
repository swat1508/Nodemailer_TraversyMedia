const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  main();
/*
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
  //  host: 'mail.YOURDOMAIN.com',
  //host: 'smtp.gmail.com',
  //service: 'gmail',
    host: 'mail.google.com',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'swarajsinha150889@gmail.com', // generated ethereal user
        pass: 'MID@ugu$t1988'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Swaraj Sinha" <swarajsinha150889@gmail.com>', // sender address
      to: 'swatantrasinha1508@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('some error occured !!!');
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  */
  });


//new changes starts
async function main(){
console.log('in main method !!!');
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.google.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'swarajsinha150889@gmail.com', // generated ethereal user
      pass: 'MID@ugu$t1988'  // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Swaraj Sinha" <swarajsinha150889@gmail.com>', // sender address
    to: 'swatantrasinha1508@gmail.com', // list of receivers
    subject: "Hello World !!!", // Subject line
    text: "Hello world yo yo yoy ", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
//new changes ends

app.listen(3000, () => console.log('Server started...'));