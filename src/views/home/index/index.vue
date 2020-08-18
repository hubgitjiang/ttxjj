<template>
  <div class="index">
    <van-nav-bar class="mynav" title="首页" :fixed="true" />
    <van-tabs sticky :offset-top="46" v-model="active">
      <van-tab
        v-for="(item, index) in channelList"
        :key="index"
        :title="item.name"
      >
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh">
            <van-cell v-for="(item, index) in item.articleList" :key="index">
              <template #title>
                <h4>{{ item.title }} ----- {{ item.cover.type }}</h4>
                <van-grid
                  v-if="item.cover.type != 0"
                  :border="false"
                  :column-num="3"
                >
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
                  <div class="right">
                    <van-icon name="cross" @click="openmore(item)" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="menus" @click="openChannel">
      <van-icon name="bars" />
    </div>
    <channel ref="channel" :channelList="channelList" :active="active" />
    <more ref="more" @delitem="delitem" :artid="artid" />
  </div>
</template>

<script>
import { apiGetChannel } from '../../../api/channel'
import { apiGetArticle } from '../../../api/article'
import { getToken } from '@/utils/mytoken.js'
import channel from './coms/channel'
import more from './coms/more'
export default {
  data () {
    return {
      channelList: [],
      active: 0,
      artid: null
    }
  },
  methods: {
    async onLoad () {
      var currentChannel = this.channelList[this.active]
      const res = await apiGetArticle({
        channel_id: currentChannel.id,
        timestamp: Date.now(),
        with_top: 0
      })
      currentChannel.articleList = [
        ...currentChannel.articleList,
        ...res.data.data.results
      ]
      currentChannel.loading = false
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true
      }
    },
    onRefresh () {
      var currentChannel = this.channelList[this.active]
      currentChannel.articleList = []
      currentChannel.refreshing = false
      currentChannel.finished = false
      currentChannel.loading = true
      this.onLoad()
    },
    async getChannel () {
      if (this.$store.state.token.token) {
        const res = await apiGetChannel()
        this.channelList = res.data.data.channels
      } else {
        const arr = getToken('channels')
        if (arr) {
          this.channelList = arr
        } else {
          const res = await apiGetChannel()
          this.channelList = res.data.data.channels
        }
      }
      console.log(4)
      this.addOtherProp()
    },
    addOtherProp () {
      this.channelList.forEach(item => {
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'refreshing', false)
      })
    },
    openChannel () {
      this.$refs.channel.show = true
    },
    openmore (item) {
      this.$refs.more.show = true
      this.artid = item.art_id
    },
    delitem () {
      var currentChannel = this.channelList[this.active]
      currentChannel.articleList.forEach((item, index) => {
        if (item.art_id === this.artid) {
          currentChannel.articleList.splice(index, 1)
        }
      })
    }
  },
  created () {
    this.getChannel()
  },
  components: {
    channel,
    more
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 46px;
  margin-bottom: 50px;
  .mynav {
    background: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  /deep/ .van-tabs__wrap {
    width: 90%;
  }
  .menus {
    position: fixed;
    top: 46px;
    right: 0;
    width: 10%;
    background-color: pink;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 12px;
      span {
        margin-right: 10px;
      }
    }
    .right {
      border: 1px solid #ccc;
      width: 25px;
      height: 18px;
      text-align: center;
    }
  }
}
</style>
