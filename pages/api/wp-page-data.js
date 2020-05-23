const fetch = require('../../utils/fetch')

const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let id = 'home';

    if(body.payload) {
      id = body.payload
    }

    if(id === 'favicon.ico' ) {
      res.json({error:"Page data couldn't loaded"});
      return;
    }

    // console.log('BODY PASSED  ',  req.body )

    // console.log('PAGE ID ', id )
   
    // TODO: Normalise page ID : 
    const response = await fetch(ENDPOINT_URL+'/api/v1/page/'+id,
     {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })
 
     res.json(response)
     return
  } catch(error) {
     console.log("ERROR FETCHING PAGE", error )
     res.json({error:"Page data couldn't loaded"})
     // res.status(502).send({ error: error })
  }
};
