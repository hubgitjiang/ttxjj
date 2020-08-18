<template>
  <div class="channel">
    <van-popup v-model="show" position="bottom" :style="{ height: '85%' }">
      <van-cell title="我的频道">
        <template #default>
          <van-button
            size="mini"
            v-if="isEdit === false"
            class="btn"
            plain
            round
            type="info"
            @click="isEdit = true"
          >
            编辑
          </van-button>
          <van-button
            size="mini"
            v-else
            class="btn"
            plain
            round
            type="info"
            @click="isEdit = false"
          >
            完成
          </van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item
          v-for="(item, index) in channelList"
          :key="index"
          class="myitem"
        >
          <template #text>
            <span @click.stop="changeIndex(index)" :class="{ active: active === index }">{{ item.name }}</span
            ><van-icon
              name="clear"
              class="myicon"
              v-if="isEdit === true"
              @click="removeChannel(index)"
            />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道推荐"></van-cell>
      <van-grid>
        <van-grid-item
          :text="item.name"
          v-for="(item, index) in otherChannel"
          :key="index"
          @click="addChannel(item)"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannel, apiAddChannel } from '@/api/channel'
import { setToken } from '@/utils/mytoken.js'
export default {
  props: ['channelList', 'active'],
  data () {
    return {
      show: false,
      allChannel: [],
      isEdit: false
    }
  },
  computed: {
    otherChannel () {
      const ids = this.channelList.map(item => {
        return item.id
      })
      const newArr = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  },
  async created () {
    const res = await apiGetAllChannel()
    this.allChannel = res.data.data.channels
  },
  methods: {
    changeIndex (index) {
      this.$parent.active = index
    },
    async addChannel (item) {
      this.channelList.push(item)
      if (this.$store.state.token.token) {
        // 生成添加频道数组
        var channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiAddChannel({
          channels: channels
        })
      } else {
        setToken('channels', this.channelList)
      }
    },
    async removeChannel (index) {
      this.channelList.splice(index, 1)
      if (this.$store.state.token.token) {
        // 生成添加频道数组
        var channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiAddChannel({
          channels: channels
        })
      } else {
        setToken('channels', this.channelList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .btn {
    padding: 2px 15px;
    line-height: 100%;
  }
}
.myitem {
  position: relative;
  .myicon {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  /deep/ .van-grid-item__content {
    font-size: 12px;
    color: #666;
  }
  .active {
    color: red;
  }
}
</style>
