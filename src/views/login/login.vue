<template>
  <div class="content">
    <van-nav-bar class="mynav" title="登录" :fixed="true" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #left-icon>
          <i class="iconfont icon-lock"></i>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { apiLogin } from '../../api/use'
import { setToken } from '../../utils/mytoken'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '输入的验证码长度应该为 6'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await apiLogin(this.user)
      console.log(res)
      // 保存用户登录信息
      setToken('token', res.data.data)
      // 保存到 vuex 中
      this.$store.commit('setToken', res.data.data)
      if (this.$route.path === '/login') {
        this.$router.push('/')
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less">
.content {
  margin-top: 46px;
  .mynav {
    background: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
