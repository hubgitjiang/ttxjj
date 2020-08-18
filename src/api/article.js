import myhttp from '../utils/http'

function apiGetArticle (data) {
  return myhttp({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: data
  })
}

function apiDislike (data) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: data
  })
}

function apiReport (data) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: data
  })
}

function apiSearch (data) {
  return myhttp({
    url: '/app/v1_0/search',
    method: 'GET',
    params: data
  })
}

function apiGetArt (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    method: 'GET'
  })
}

export { apiGetArticle, apiDislike, apiReport, apiSearch, apiGetArt }
