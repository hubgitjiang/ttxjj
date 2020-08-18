import myhttp from '../utils/http.js'

// 得到评论列表
function apiGetComment ({ artid, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

// 添加评论
function apiAddComment ({ target, content }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: target,
      content: content
    }
  })
}

// 点赞评论
function apiLikeComment (commentId) {
  return myhttp({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}

// 取消点赞评论
function apiUnLikeComment (commid) {
  return myhttp({
    url: `/app/v1_0/comment/likings/${commid}`,
    method: 'DELETE'
  })
}

export { apiGetComment, apiAddComment, apiLikeComment, apiUnLikeComment }
