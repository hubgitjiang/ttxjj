import http from '../utils/http.js'

function apiGetChannel () {
  return http({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

function apiGetAllChannel () {
  return http({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

function apiAddChannel (data) {
  return http({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: data
  })
}

export { apiGetChannel, apiGetAllChannel, apiAddChannel }
