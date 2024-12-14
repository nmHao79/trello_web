/* eslint-disable no-undef */
// export const API_ROOT = ['http://localhost:8017']
let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-be.onrender.com'
}
//call backend
export const API_ROOT = apiRoot
console.log("🚀 ~ apiRoot:", apiRoot)
