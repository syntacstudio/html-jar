'use strict'
/**
** mail base function using node mailer 
** @Param Mail , string url
**/
const nodemailer = require('nodemailer');

class Mailer {
	constructor() {
		this.to  =  'hello@example.io';
		this.from = 'hello@example.io';
		this.subject  = 'hello';
		this.text = 'hello';
		this.html = false;
		this.attachments =  false;
	}
	To(mail) {
		this.to  =  mail;
	}
	From(from) {
		this.from  =  from;
	}
	Subject(subject) {
		this.subject  =  subject;
	}
	Text(text) {
		this.text  =  text;
	}
	Template(html) {
		this.html  =  html;
	}
	Attachments(file) {
		this.attachments =  file;
	}
	async Send() {
		try {
			let transporter = nodemailer.createTransport({
			    host: process.env.MAIL_HOST,
			    port: process.env.MAIL_PORT,
			    secure:process.env.MAIL_SECURE == 'true' ? true : false , 
			    auth: {
			      user: process.env.MAIL_USERNAME, 
			      pass: process.env.MAIL_PASSWORD
			    }
			  });
			 await transporter.sendMail({
			    from:this.from,
			    to: this.to, 
			    subject:this.subject , 
			    html:this.html  ,
			    attachments:this.attachments
			  });
		} catch(e) {
			console.log(e)
		}
	} 
}
module.exports = Mailer;