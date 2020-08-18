<template>
  <div class="searchResult">
    <van-nav-bar class="mynav" title="搜索结果" :fixed="true" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell @click="toDetail(item.art_id)" v-for="(item, index) in list" :key="index">
        <template #title>
          <h4>{{ item.title }}</h4>
          <van-grid v-if="item.cover.type != 0" :border="false" :column-num="3">
            <van-grid-item
              v-for="(imgitem, imgindex) in item.cover.images"
              :key="imgindex"
            >
              <van-image :src="imgitem" />
            </van-grid-item>
          </van-grid>
          <div class="content">
            <div class="left">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }} 条评论</span>
              <span>{{ item.pubdate | mytime }}</span>
            </div>
          </div>
          <van-grid direction="horizontal" :column-num="3">
            <van-grid-item @click.stop="comment" icon="comment-o" text="留言" />
            <van-grid-item @click.stop="zan" icon="like-o" text="点赞" />
            <van-grid-item @click.stop="share" icon="exchange" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearch } from '@/api/article.js'
export default {
  data () {
    return {
      list: [],
      key: this.$route.params.key,
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    }
  },
  methods: {
    async onLoad () {
      const res = await apiSearch({
        page: this.page,
        per_page: this.perpage,
        q: this.key
      })
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    comment () {
      if (!this.$store.state.token.token) {
        this.$toast.fail('登录失败，请重新登录')
        this.$router.push('/clogin')
      } else {
        console.log('开始留言')
      }
    },
    zan () {
      if (!this.$login()) {
        return null
      } else {
        console.log('点赞')
      }
    },
    share () {
      console.log('share')
    },
    toDetail (artid) {
      this.$router.push(`/detail/${artid}`)
    }
  }
}
</script>

<style lang="less" scoped>
.searchResult {
  margin-top: 46px;
  margin-bottom: 50px;
  .content {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 12px;
      span {
        margin-right: 10px;
      }
    }
  }
  .mynav {
    background: #3296fa;
    z-index: 9999;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  /deep/ .van-icon {
    font-size: 16px;
  }
}
</style>
