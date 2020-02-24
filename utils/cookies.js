'use strict'

export const decode = (cookies, name) => (type = 'text') => {
  if (!cookies) return false

  const decodedCookies = decodeURIComponent(cookies).split('')
  const cookie = decodedCookies.filter(ck => ck.trim().startsWith(name))[0]

  const data = type === 'json'
    ? cookie ? JSON.parse(cookie.split(`${name}=j:`)[1]) : false
    : cookie ? cookie.split(`${name}=`)[1] : false

  return data
}


/*
* Handles cookies
*/
export default function Cookies(name) {
  const cookies = document.cookie || false

  return {
    decode: decode(cookies, name),
    // Other functions this helper may need in the future
  }
}
