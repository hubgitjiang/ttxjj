import myhttp from '@/utils/http.js'

function apiGetThink (data) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: data
  })
}

export { apiGetThink }
