const isDev = !process.env.NOD_ENV || process.env.NOD_ENV === 'development'

export const BASE_IP = (isDev ? 'http://127.0.0.1:8000' : 'https://bornains.ir')
export const BASE_ADDRESS = (isDev ? 'http://127.0.0.1:8000' : 'https://bornains.ir/api')

export const HOME = `${BASE_ADDRESS}/homepage/`
export const HAFTKHAN_PRE = `${BASE_ADDRESS}/events/haftkhanpre`
export const HAFTKHAN_SIGNUP = `${BASE_ADDRESS}/events/haftkhansignup/`