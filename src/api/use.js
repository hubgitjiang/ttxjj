import myhttp from '../utils/http'

// 登录方法
function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 取消关注
function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE'
  })
}

// 关注作者：
function apiFollow (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 点赞文章
function apiZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 取消点赞文章
function apiDisZan (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE'
  })
}

// 不喜欢
function dislike (artid) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 取消不喜欢
function undislike (artid) {
  return myhttp({
    url: `/app/v1_0/article/dislikes/${artid}`,
    method: 'DELETE'
  })
}

export { apiLogin, apiUnFollow, apiFollow, apiZan, apiDisZan, dislike, undislike }
