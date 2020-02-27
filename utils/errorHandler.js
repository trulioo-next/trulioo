'use strict'


// TODO: Implement message domain

const MESSAGES = {
  ERROR:{
    API: "Server not available, please try later"
  }
}

// TODO: Implement error handler loggin to file

module.exports = {
  network: (error) => {
    if(error.message.includes('request failed')) throw new Error(MESSAGES.ERROR.API)
    throw error
  },
}
