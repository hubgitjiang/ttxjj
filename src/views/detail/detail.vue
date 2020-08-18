<template>
  <div class="detail">
    <van-nav-bar
      class="mynav"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      :fixed="true"
    />
    <h3>{{ detail.title }}</h3>
    <van-cell>
      <template #title>
        <div class="box">
          <div class="left">
            <img :src="detail.aut_photo" alt="" />
          </div>
          <div class="mid">
            <div>{{ detail.aut_name }}</div>
            <div>{{ detail.pubdate | mytime }}</div>
          </div>
          <div class="right">
            <van-button
              type="info"
              @click="followed"
              v-if="detail.is_followed === false"
              >+ 关注</van-button
            >
            <van-button type="info" @click="unfollowed" v-else
              >已关注</van-button
            >
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <div v-html="detail.content"></div>
      </template>
    </van-cell>
    <div class="btns">
      <div class="item">
        <van-button
          round
          plain
          type="danger"
          @click="disZan"
          v-if="detail.attitude === 1"
        >
          <van-icon name="like" /> 点赞
        </van-button>
        <van-button round plain type="default" @click="zan" v-else>
          <van-icon name="like-o" /> 点赞
        </van-button>
      </div>
      <div class="item">
        <van-button
          round
          plain
          type="danger"
          @click="unDisLike"
          v-if="detail.attitude === 0"
        >
          <van-icon name="delete" /> 不喜欢
        </van-button>
        <van-button round plain type="default" @click="disLike" v-else>
          <van-icon name="delete" /> 不喜欢
        </van-button>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment v-for="(item, index) in commentList" :key="index" :item="item" />
    </van-list>
    <write @addComment="addComment" />
    <reply ref="reply" />
  </div>
</template>

<script>
import comment from './coms/comment.vue'
import write from './coms/write.vue'
import reply from './coms/reply.vue'
import { apiGetArt } from '@/api/article.js'
import { apiGetComment } from '@/api/comment.js'
import {
  apiUnFollow,
  apiFollow,
  apiZan,
  apiDisZan,
  dislike,
  undislike
} from '@/api/use.js'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      artid: this.$route.params.artid,
      detail: {},
      offset: null,
      limit: 10,
      commentList: []
    }
  },
  methods: {
    // 添加评论
    addComment (item) {
      this.commentList.unshift(item)
    },
    // 加载数据
    async onLoad () {
      const res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      this.commentList = [...this.commentList, ...res.data.data.results]
      this.loading = false
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 关注用户
    async followed () {
      await apiFollow(this.detail.aut_id)
      this.detail.is_followed = true
    },
    // 取消关注
    async unfollowed () {
      await apiUnFollow(this.detail.aut_id)
      this.detail.is_followed = false
    },
    // 点赞
    async zan () {
      await apiZan(this.detail.art_id)
      this.detail.attitude = 1
    },
    // 取消点赞
    async disZan () {
      await apiDisZan(this.detail.art_id)
      this.detail.attitude = -1
    },
    // 不喜欢
    async disLike () {
      await dislike(this.detail.art_id)
      this.detail.attitude = 0
    },
    // 取消不喜欢
    async unDisLike () {
      await undislike(this.detail.art_id)
      this.detail.attitude = -1
    }
  },
  async created () {
    const res = await apiGetArt(this.artid)
    this.detail = res.data.data
  },
  components: {
    comment,
    write,
    reply
  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-top: 46px;
  margin-bottom: 50px;
  .mynav {
    background: #3296fa;
    z-index: 999;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon-arrow-left {
      color: #fff;
    }
  }
  h3 {
    text-align: center;
    padding: 10px;
  }
  .box {
    display: flex;
    .left {
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .mid {
      flex: 1;
    }
    .right {
    }
  }
  .btns {
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
