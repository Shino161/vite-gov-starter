import fetch from './fetch'

// e.g.
export const getUserInfo = (params) => {
  return fetch.request({
    url: '/userinfo',
    method: 'get',
    params,
  })
}
