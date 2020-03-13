<template>
  <div class="edit">
    <div class="edit-header">
      <hmeditheader title="编辑资料">
        <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
        <span slot="right">退出</span>
      </hmeditheader>
    </div>
    <div class="images">
      <img alt :src="imginfo.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="hmcells">
      <mycell text="昵称" :text2="imginfo.nickname" @cellclick="show=!show"></mycell>
      <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handlecellClick">
        <van-field
          :value="imginfo.nickname"
          placeholder="请输入昵称"
          required
          label="用户名"
          ref="nickname"
        />
      </van-dialog>

      <mycell text="密码" :text2="imginfo.password" type="password" @cellclick="passWordshow=!passWordshow"></mycell>
      <van-dialog :beforeClose='beforeClose'  title="修改密码" v-model="passWordshow"  show-cancel-button @confirm="handlepassword">
        <van-field
          placeholder="请输入旧密码"
          required
          label="旧密码"
          ref='oldpsw'
        />
        <van-field
          placeholder="请输入新密码"
          required
          label="新密码"
          ref='newpsw'
        />
      </van-dialog>

      <mycell text="性别" :text2="imginfo.gender === 1 ?'男' :'女'" @cellclick="gendershow=!gendershow"></mycell>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="handlegender">
<van-picker :columns="['女','男']" :default-index="imginfo.gender"  @change="onChange"/>
      </van-dialog>
    </div>
    <div class="back">
      <hmbtn text="退出" @btnhandle='hanglebtn'></hmbtn>
    </div>
  </div>
</template>

<script>
import { upfile, userUpdate, getuserinfo } from '@/api/user.js'
import mycell from '@/components/hmcell.vue'
import hmbtn from '@/components/hmbtn.vue'
import hmeditheader from '@/components/hmeditheader.vue'
export default {
  data () {
    return {
      gendershow: false,
      passWordshow: false,
      value: '',
      show: false,
      imginfo: '',
      id: '',
      genderIndex: ''
    }
  },
  components: {
    hmeditheader,
    mycell,
    hmbtn
  },
  methods: {
    // 退出
    hanglebtn () {
      console.log(2)
      localStorage.removeItem('mytoken')
      localStorage.removeItem('mybaseURL')
      this.$router.push({ name: 'login' })
    },
    // 获取选中框的索引函数
    onChange (picker, value, index) {
      this.genderIndex = index
      // .this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    // 性别
    async  handlegender () {
      console.log(this.genderIndex)

      let id = this.$route.params.id
      let res4 = await userUpdate(id, { gender: this.genderIndex })
      console.log(res4)
      if (res4.data.message === '修改成功') {
        this.$toast.success('性别修改成功')
        this.imginfo.gender = res4.data.data.gender
      } else {
        this.$toast.fail('性别修改失败')
      }
    },
    beforeClose (action, done) {
      console.log(action)
      let password = this.$refs.oldpsw.$refs.input.value
      if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3-16位新密码')
      } else if (action === 'confirm' && this.imginfo.password !== password) {
        // 就是你点击了确定并且密码不正确的时候模态框才在，其他的时候点击都可以取消
        done(false)
      } else {
        done()
      }

      // let oldpsw = this.$refs.oldpsw.$refs.input.value
    },
    async handlepassword () {
      let id = this.$route.params.id
      console.log(this.$refs.oldpsw.$refs.input.value)
      let oldpsw = this.$refs.oldpsw.$refs.input.value
      if (this.imginfo.password === oldpsw) {
        let password = this.$refs.oldpsw.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3-16位新密码')
          return
        }
        // 如果原密码和输入的一致，那么就用新输入的密码作为密码
        let res3 = await userUpdate(id, { password: this.$refs.newpsw.$refs.input.value })
        console.log(res3)
        this.$toast.success('密码修改成功')
      } else {
        this.$toast.fail('旧密码和输入的密码不一致')
      }
    },
    async handlecellClick () {
      console.log(this.$refs.nickname.$refs.input.value)

      let id = this.$route.params.id
      let nickname = this.$refs.nickname.$refs.input.value
      let res2 = await userUpdate(id, { nickname: nickname })
      console.log(res2)
      if (res2.data.message === '修改成功') {
        this.$toast.success('文件修改成功')
        this.imginfo.nickname = res2.data.data.nickname
      } else {
        this.$toast.fail('文件修改失败')
      }
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      // 把图片转为二进制
      let formdata = new FormData()
      formdata.append('file', file.file)
      upfile(formdata)
        .then(res => {
          console.log(res)
          if (res.data.message === '文件上传成功') {
            this.$toast.success('文件上传成功')
            // let id = this.$route.params.id
            // console.log(id)

            userUpdate(this.id, { head_img: res.data.data.url }).then(res => {
              console.log(res)
              this.imginfo = res.data.data
              this.imginfo.head_img =
                localStorage.getItem('mybaseURL') + res.data.data.head_img
            })
            // this.imginfo = res.data.data
            // this.imginfo.url = localStorage.getItem('mybaseURL') + res.data.data.url
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('文件上传失败')
        })
    }
  },
  mounted () {
    let id = this.$route.params.id
    getuserinfo(id)
      .then(res => {
        console.log(res)
        if (res.data.message === '获取成功') {
          this.imginfo = res.data.data
          let mybaseURL = localStorage.getItem('mybaseURL')
          if (this.imginfo.head_img) {
            this.imginfo.head_img = mybaseURL + this.imginfo.head_img
          } else {
            this.imginfo.head_img = mybaseURL + '/uploads/image/default.png'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.back{
width: 100vw;
display: flex;
align-items: center;
justify-content: center
}
.edit {
  height: 100vh;
  background-color: #f2f2f2;
  /deep/.van-uploader__upload {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -50%);
    opacity: 0;
  }
}
.images {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  img {
    display: block;
    // width: 100px;
    // height: 100px;
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
    border: 1px solid red;
  }
}
</style>
