const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

// transport
const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.API_SANDGRID,
        },
    })
);

const sendEmailController = (req, res) => {
    try {
        const [name, email, msg] = req.body;

        //validation
        if (!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                msg: 'Please Provide All Fields !',
            })
        }

        //email matter
        transporter.sendMail({
            to: "ravindrathombre01@gmail.com",
            from: "ravindrathombre01@gmail.com",
            subject: "Regarding My Portfolio App",
            html: `
                <h5>Details Information</h5>
                <ul>
                    <li><p>Name: ${name}</p></li>
                    <li><p>Email: ${email}</p></li>
                    <li><p>Message: ${msg}</p></li>
                </ul>
            `
        })

        res.status(200).send({
            success: true,
            message: 'Your Message Send Successfully',

        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Send Email Api Error !',
            error
        });
    }
};
module.exports = { sendEmailController };