const nodemailer = require("nodemailer")

function sendMailToApproval(email, data) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'ioformcorp@gmail.com', // generated ethereal user
            pass: 'ioformhacktiv8', // generated ethereal password
        },
    });
    
    let mail = {
        from: 'ioformcorp@gmail.com',
        to: email,
        subject: 'New Approval Request',
        text: `Dear Sir/Madam, new form has been created and waiting for approval`,
        attachments: [
            {   // encoded string as an attachment
                path: data,
            }
        ]
    };
    
    transporter.sendMail(mail, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log('email sent ' + info.response)
        }
    })
}

module.exports = sendMailToApproval


