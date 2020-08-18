<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
    <van-cell title="当前评论"></van-cell>
    <comment :item="{}" />
    <van-cell title="评论回复"></van-cell>
    <comment :item="{}" />
  </van-popup>
</template>

<script>
import comment from './comment'
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    comment
  }
}
</script>

<style></style>
