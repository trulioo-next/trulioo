
export default async (req, res) => {  
  try {

    let date = new Date();
    date.setMinutes ( date.getMinutes() + 5 );

    // date.setHours( date.getHours() + 1 );

     const body = JSON.parse(req.body)
  
     let user = {
       userName:body.userName,
       isAuth: true,
       expire:date
     }
 
     res.json(user)
     return
  } catch(error) {
    res.status(400).send({ error: error.message })
  }
};