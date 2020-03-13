<template>
  <div class="articaldetail">
      <!-- 头部 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="handleclick" :class="{active:detailList.has_follow}">{{detailList.has_follow ? '已关注' : '关注'}}</span>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <div class="title">{{detailList.title}}</div>
      <div class="desc">

               <span>{{detailList.user.username}}</span> &nbsp;&nbsp;
                  <span>{{detailList.user.create_date}}</span>

      </div>
      <div class="content" v-html="detailList.content" v-if="detailList.type===1">

      </div>
       <video src="" v-if="detailList.type===2" controls autoplay poster="../assets/logo.png"></video>
      <div class="opt">
        <span class="like" @click="likeClick">
          <van-icon name="good-job-o" :class="{reds:detailList.has_like}"/>{{detailList.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(item,index) in commentsList" :key="index">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>{{item.user.create_date}}</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <commentAdd :detailList="detailList"></commentAdd>
  </div>
</template>

<script>
import commentAdd from '@/components/commentAdd.vue'
import { follows, Unfollows, Likes, commentsLists } from '@/api/user.js'
import { detailList } from '@/api/arctice.js'
export default {
  components: {
    commentAdd
  },
  data () {
    return {
      detailList: { user: {

      } },
      commentsList: []

    }
  },
  methods: {

    // 点赞
    async likeClick () {
      let res = await Likes(this.detailList.id)
      console.log(res)
      if (this.detailList.has_like) {
        this.detailList.like_length--
        this.$toast.success(res.data.message)
      } else {
        this.detailList.like_length++
        this.$toast.success(res.data.message)
      }
      this.detailList.has_like = !this.detailList.has_like
    },

    // 关注
    async handleclick () {
      console.log(this.detailList.user.id)
      let id = this.detailList.user.id
      let res
      if (this.detailList.has_follow) {
        res = await Unfollows(id)

        console.log(res)
      } else {
        res = await follows(id)
        console.log(res)
      }
      this.detailList.has_follow = !this.detailList.has_follow
      this.$toast.success(res.data.message)
    }
  },
  // 对请求到的数据进行赋值修改而已
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    console.log(this.$route)

    let id = this.$route.params.id
    let res = await detailList(id)
    console.log(res)
    if (res.status === 200) {
      this.detailList = res.data.data
      // 获取评论列表数据
      console.log(this.detailList.id)

      let res1 = await commentsLists(this.detailList.id)
      console.log(res1)
      if (res1.status === 200) {
        this.commentsList = res1.data.data.map(v => {
          v.user.head_img = localStorage.getItem('mybaseURL') + v.user.head_img
          return v
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px
}
.reds{
  color: red
}
.active{
padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
}
.whifes{
  padding: 5px 15px;
    background-color:green;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
}

video{
width: 100%;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }

}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {

    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;

    /deep/.photo{
    width: 100%!important;

        //   border:1px solid red;

   /deep/img{
        width: 100%!important;

        box-sizing: border-box;
        // 水平居中
        display: block

    }
    }

  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
