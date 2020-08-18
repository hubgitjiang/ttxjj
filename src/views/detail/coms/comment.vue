<template>
  <div>
    <van-cell>
      <template #title>
        <div class="box">
          <div class="left">
            <img :src="item.aut_photo" alt="" />
          </div>
          <div class="mid">
            <div class="name">{{ item.aut_name }}</div>
            <div class="cont">{{ item.content }}</div>
            <div class="other">
              <span>{{ item.pubdate | mytime }}</span
              ><span class="reply" @click="openreply">回复 {{ item.reply_count }} </span>
            </div>
          </div>
          <div class="right">
            <template v-if="item.is_liking === true">
              <van-icon name="like" @click="unlikecomment" color="red" />{{ item.like_count }}
            </template>
            <template v-else>
              <van-icon name="like" @click="likecomment" />{{ item.like_count }}
            </template>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { apiLikeComment, apiUnLikeComment } from '@/api/comment.js'
export default {
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    async likecomment () {
      console.log(this.item)
      await apiLikeComment(this.item.com_id)
      this.item.is_liking = true
      this.item.like_count += 1
    },
    async unlikecomment () {
      await apiUnLikeComment(this.item.com_id)
      this.item.is_liking = false
      this.item.like_count -= 1
    },
    openreply () {
      this.$parent.$parent.$refs.reply.show = true
      console.log(this.$parent.$parent.$refs.reply)
    }
  }
}
</script>

<style lang="less" scoped>
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
    .name {
      color: #0094ff;
    }
    .cont {
      padding-left: 10px;
      line-height: 40px;
    }
    .other {
      .reply {
        background-color: #ccc;
        padding: 4px 8px;
        border-radius: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
