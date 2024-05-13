

const timeout = ()=> {
  const env = process.env.TIMEOUT;
  if(!env) {
    return 3600;
  }
  const time = parseInt(env)
  if(Number.isNaN(time) || time < 0) {
    return 3600;
  }
  return time
}

const constants = {
  BASE_URL : process.env.BASE_URL,
  CACHE_TIMEOUT : timeout(),
  FEEDBACK_URL: process.env.FEEDBACK_URL
}

export default {
  constants
}
