'use strict'


// TODO: Implement message domian

const MESSAGES = {
  ERROR:{
    API: "Server not available, please try later"
  }
}

// TODO: Implement error handler with admin notification system with log

export default {
  network: (error) => {
    if(error.message.includes('request failed')) throw new Error(MESSAGES.ERROR.API)
    throw error
  },
}
