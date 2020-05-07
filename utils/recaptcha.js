import Router from 'next/router';

export const GOOGLE_RECAPTCHA_V3_KEY = process.env.GOOGLE_RECAPTCHA_V3_KEY;
export const GOOGLE_RECAPTCHA_V3_SECRET = process.env.GOOGLE_RECAPTCHA_V3_SECRET;

const MAX_BOT_SCORE = 0.5;	// Google returns: 0.0 == bot  1.0 == human


export const verify = async (recaptchaToken) => {

	const response = await fetch('/api/verifyCaptcha',
						{	method: 'POST',
							body: JSON.stringify({ "token": recaptchaToken }) 
						});
		
	const verify = await response.json();

	if (verify.success === true && verify.score < MAX_BOT_SCORE)
	{	// --- Bot detected
		console.log("Bot");
		Router.push('/');
	}else
	{	console.log("Not a bot");
	}
}


export default verify;