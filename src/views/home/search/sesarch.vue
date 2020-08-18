<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      background="#3296fa"
      @search="onSearch"
      @input="think"
    >
      <template #action>
        <div @click="cancle">取消</div>
      </template>
    </van-search>
    <van-cell-group v-if="searchList.length !== 0">
      <van-cell title="联想区域" />
      <van-cell
        icon="search"
        v-for="(item, index) in searchList"
        :key="index"
        @click="onSearch(item.oldItem)"
      >
        <template #title>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete" @click="delAll" />
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in histroyLost"
        :key="index"
        icon="search"
        @click="onSearch(item)"
      >
        <template #right-icon>
          <van-icon name="cross" @click.stop="delOne(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiGetThink } from '@/api/search.js'
import { setToken, getToken, removeToken } from '@/utils/mytoken.js'
export default {
  data () {
    return {
      value: '',
      searchList: [],
      histroyLost: getToken('history') || []
    }
  },
  methods: {
    onSearch (value) {
      this.$router.push(`/searchResult/${value}`)
      this.histroyLost.unshift(value)
      this.histroyLost = [...new Set(this.histroyLost)]
      setToken('history', this.histroyLost)
    },
    async think () {
      if (this.value.trim().length === 0) {
        this.searchList = []
      } else {
        const res = await apiGetThink({
          q: this.value
        })
        this.searchList = res.data.data.options.map(item => {
          return {
            oldItem: item,
            newItem: item.replace(
              this.value,
              '<span style="color: red">' + this.value + '</span>'
            )
          }
        })
      }
    },
    cancle () {
      this.value = ''
      this.searchList = []
    },
    delOne (index) {
      this.histroyLost.splice(index, 1)
      this.histroyLost = [...new Set(this.histroyLost)]
      setToken('history', this.histroyLost)
    },
    delAll () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否清除数据'
        })
        .then(() => {
          removeToken('history')
          this.histroyLost = []
        })
        .catch(() => {
          console.log('删除数据')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  /deep/ .van-search__action {
    color: #fff;
    background-color: #3296fa;
    &:active {
      color: red;
    }
  }
}
</style>
