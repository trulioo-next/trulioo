const fetch = require('../../utils/fetch')
import { GOOGLE_RECAPTCHA_V3_SECRET } from '../../utils/recaptcha'


export default async (req, res) => {  
	try {
		const body = JSON.parse(req.body);
		if (!body.token)
		{	return false;
		}

		const verify = await fetch('https://www.google.com/recaptcha/api/siteverify',
		{
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `secret=${GOOGLE_RECAPTCHA_V3_SECRET}&response=${body.token}`
		})

		console.log(verify);

		res.json(verify)
		return

	} catch(error) {
		res.json({ error: error })
	}
};
