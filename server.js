const creds = require("./nodemon.json");

// console.log(creds)

let express = require("express");
let app = express();
let nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const path = require("path");

// Static folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // service: 'Gmail',
  auth: {
    user: "archu.sen98@gmail.com",
    pass: "archu@123",
  },
});

app.post("/mail", (req, res, next) => {
  var email = req.body.sender;
  var message = req.body.content;
  var subject = req.body.subject;
  var recipient = req.body.recipient;

  const mailOptions = {
    from: "no-reply@archusen.com",
    to: recipient,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        status: "err",
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Email Sent" + data.response);
    }
  });
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

// serve PORT running here
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.info(`server has started on ${PORT}`));
