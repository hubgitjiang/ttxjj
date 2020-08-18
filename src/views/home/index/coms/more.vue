<template>
  <van-popup class="more" v-model="show" round>
    <van-cell-group v-if="isReport === false">
      <van-cell @click="dislike" title="不感兴趣" icon="bill-o" />
      <van-cell @click="report" title="反馈垃圾内容" icon="warn-o" is-link />
      <van-cell @click="blackList" title="拉黑作者" icon="delete" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell @click="isReport = false" icon="arrow-left"></van-cell>
      <van-cell
        @click="reportServe(item.type)"
        v-for="(item, index) in reportType"
        :key="index"
      >
        {{ item.name }}
      </van-cell>
    </van-cell-group>
    {{ artid }}
  </van-popup>
</template>

<script>
import { apiDislike, apiReport } from '@/api/article.js'
export default {
  props: ['artid'],
  data () {
    return {
      show: false,
      reportType: [
        { type: 0, name: '其他问题' },
        { type: 1, name: '标题夸张' },
        { type: 2, name: '低俗色情' },
        { type: 3, name: '错别字多' },
        { type: 4, name: '旧闻重复' },
        { type: 5, name: '广告软文' },
        { type: 6, name: '内容不实' },
        { type: 7, name: '涉嫌违法犯罪' },
        { type: 8, name: '侵权' }
      ],
      isReport: false
    }
  },
  methods: {
    async dislike () {
      if (this.$store.state.token.token) {
        this.$emit('delitem')
        await apiDislike({
          target: this.artid
        })
        this.$toast.success('成功')
      } else {
        this.$toast('需要登录之后才能不咸兴趣')
      }
      this.show = false
    },
    report () {
      if (this.$store.state.token.token) {
        this.isReport = true
      } else {
        this.$toast.fail('没有登录')
      }
    },
    async reportServe (type) {
      try {
        await apiReport({
          target: this.artid,
          type: type,
          remark: ''
        })
        this.$toast.success('举报成功')
      } catch {
        this.$toast.fail('举报失败')
      }
      this.isReport = false
      this.show = false
    },
    blackList () {}
  }
}
</script>

<style lang="less" scoped>
.more {
  width: 90%;
}
</style>
