<template>
  <div class="commentlist">
        <hmeditheader title="精彩评论"  >
            <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
            <span  slot="right"></span>
        </hmeditheader>
        <div class="commentText">
    <div class="item" v-for="(item,index) in commments" :key="index" >
        <div class="head">
          <img src="" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>{{item.create_date}}</span>
          </div>
          <span class="hui" @click="handleobjcomment(item)">回复</span>
        </div>
        <!-- item.parent是一个对象，不是数组，不用遍历 -->
        <!-- handleobjcomment(comment)在这里不能传参，因为不能识别comment，直接在定义的方法那里接收参数 -->
          <comments v-if="item.parent" :comment='item.parent' @handleobjcomment='handleobjcomment'></comments>
        <div class="text">{{item.content}}</div>
      </div>
        </div>
            <!-- 设置属性为布尔值的时候，用一个=就可以了，才是赋值 -->
        <commentAdd @refelse='refelse' :detailList='arcticeList' :objcomment='objcomment' @repleobjcomment='objcomment=null'></commentAdd>
  </div>
</template>

<script>
import commentAdd from '@/components/commentAdd.vue'
import comments from '@/components/comments.vue'
import { commentsLists } from '@/api/user.js'
import { detailList } from '@/api/arctice.js'
import hmeditheader from '@/components/hmeditheader.vue'
export default {

  data () {
    return {
      objcomment: '',
      commments: [],
      arcticeList: {} // 文章详情信息
    }
  },
  components: {
    hmeditheader, comments, commentAdd
  },
  methods: {

    // 刷新页面
    refelse () {
      this.init()
      window.scroll(0, 0)
    },
    async init () {
      let id = this.$route.params.id
      console.log(id)
      // 评论列表数据
      let res = await commentsLists(id, { pageSize: 30 })
      console.log(res)
      this.commments = res.data.data
      // 再次获取文章数据，渲染底部结构
      let res3 = await detailList(this.$route.params.id)
      console.log(res3)
      this.arcticeList = res3.data.data
    },
    handleobjcomment (item) {
    //  子组件传过来的参数， 接收参数不能在模板结构上面接收，因为模板识别不出来，没有定义，要在定义的方法接收，
    //   console.log(item)
      //   console.log(this.commments[index])

      this.objcomment = item
    }
  },
  mounted () {
    this.init()
  }

}
</script>

<style lang='less' scoped>
.commentText{
  .text {
      font-size: 14px;
      color: #333;
padding: 0 19px;
    }
    .hui{
padding: 0 14px;
    }
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

  }

</style>
