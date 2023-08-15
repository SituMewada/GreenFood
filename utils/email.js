const pug= require('pug');
const nodemailer = require('nodemailer');

module.exports =
class Email{
    constructor(user,url){
        this.to=user.Email,
        this.firstName=user.name.split(' ')[0],
        this.url=url,
        this.from=`Sitaram Mewada <${process.env.EMAIL_FROM}>`
    }

    newTransport(){
        if(process.env.NODE_ENV==='production'){
            //Sending
        }

        return nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD,
            }
        })
    }

    async send(template, subject){    
        //1)render the HTML
        
        
        //2 Define email options
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
        }
        //Create transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome(){
        await this.send('Welcome','Welcome to GreenFood Family!');
    }
    
    async sendPasswordResetEmail(){
         await this.send(
            'passwordReset',
            'Your password rest token (valid fot only 10 minutes)'
         )
    } 
};