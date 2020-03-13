<template>
  <div class="registers">

    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <hminput placeholder="请输入用户名/手机号码" msg_err="用户名不规范" v-model="users.username"  type="text" :rules="/^1\d{10}$/"></hminput>
          <!-- <hminput placeholder="请输入用户名" :value="users.username" @input="handleinputs"></hminput> -->
          <br />
      <hminput placeholder="请输入昵称"  type="text" msg_err="昵称不能为空"  v-model="users.nickname"></hminput>   <br />
       <hminput placeholder="请输入密码" type="password" msg_err="密码不能为空"  v-model="users.password"></hminput>   <br />

        </div>
        <p class="tips">
          没有账号？
          <a href="#/login" >去登录</a>
        </p>
        <!-- <div data-v-4bc01e24 class="button">登录按钮</div> -->
        <hmbtn text="登录按钮" @btnhandle="hangleregister"></hmbtn>
      </div>
    </div>
  </div>

</template>

<script>
import { registerInfo } from '@/api/user.js'
import hminput from '@/components/hminput.vue'
import hmbtn from '@/components/hmbtn.vue'
export default {
  components: {
    hmbtn,
    hminput
  },
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async hangleregister () {
      console.log(this.users)

      let res = await registerInfo(this.users)
      console.log(res)
      if (!/^1\d{10}$/.test(this.users.username)) {
        this.$toast.fail('手机号不正确')
      } else if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'index' })
      } else if (res.data.message === '用户名已经存在') {
        this.$toast.fail(res.data.message)
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
