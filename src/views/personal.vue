<template>
  <div class="personal">
      <router-link :to="'/useredit/'+userinfo.id">
      <div class="header">
          <div class="h-img"><img :src="userinfo.head_img" alt=""></div>
          <div class="h-right">
              <div class="right-1"><van-icon class="icon1" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
              <div class="h-name">{{userinfo.nickname}}</div></div>

              <div class="h-time">{{userinfo.create_date}}</div>
          </div>
      </div>
      </router-link>
      <div class="cell">
          <mycell text="我的关注" text2="关注的用户" @cellclick='handlefoluu'></mycell>
          <mycell text="我的跟帖" text2="跟帖"></mycell>
          <mycell text="我的收藏" text2="文章/视频" @cellclick='mystar'></mycell>
          <mycell text="设置"></mycell>
      </div>
      <div class="btn2"><hmbtn text="退出"></hmbtn></div>

  </div>
</template>

<script>
import hmbtn from '@/components/hmbtn.vue'
import { getuserinfo } from '@/api/user.js'
import mycell from '@/components/hmcell.vue'
export default {
  components: {
    mycell, hmbtn
  },
  data () {
    return {
      userinfo: ''
    }
  },
  methods: {
    handlefoluu () {
      this.$router.push({ name: 'myfollows' })
    },
    mystar () {
      this.$router.push({ name: 'mystar' })
    }

  },
  mounted () {
    // console.log(this.$route)

    let id = this.$route.params.id
    getuserinfo(id).then(res => {
      console.log(res)
      if (res.data.message === '获取成功') {
        this.userinfo = res.data.data
        let mybaseURL = localStorage.getItem('mybaseURL')
        if (this.userinfo.head_img) {
          this.userinfo.head_img = mybaseURL + this.userinfo.head_img
        } else {
          this.userinfo.head_img = mybaseURL + '/uploads/image/default.png'
        }
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
.btn2{
    margin-top: 20px;
    margin-left: 25px;

}
.personal{
    height: 100vh;
        background-color: #f2f2f2;
    .h-right{
margin-top: 30px;
        .right-1{
   display: flex;
       .van-icon__image{
     width: 20px!important;
            height: 20px!important;
       }

        }
    }
    .header{
        border-bottom: 2px solid #ccc;
        padding: 20px 10px;
        display: flex;
        img{
            width: 110px;
            height: 90px;
            border-radius: 50%;
            margin-right: 15px;
        }
    }
}
</style>
