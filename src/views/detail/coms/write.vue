<template>
  <van-search
    v-model="key"
    show-action
    placeholder="请输入搜索关键词"
    background="pink"
    class="write"
    @search="onSearch"
  >
    <template #action>
      <span @click="onSearch(key)">添加</span>
    </template>
  </van-search>
</template>

<script>
import { apiAddComment } from '@/api/comment.js'
export default {
  data () {
    return {
      key: ''
    }
  },
  methods: {
    async onSearch (key) {
      const res = await apiAddComment({
        target: this.$route.params.artid,
        content: this.key
      })
      this.$emit('addComment', res.data.data.new_obj)
      this.key = ''
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
