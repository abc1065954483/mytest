<template>
  <div class="comments1">

    <div class="addcomment" v-show="!isFocus">
      <input type="text"  @focus="handlerFocus" />

      <div class="comment2">
          <div @click="$router.push({path:`/commentLists/${detailList.id}`})"><i class="iconfont iconpinglun-"></i>
        <em>{{detailList.comment_length}}</em></div>
<div @click="handleshoucan" :class="{active : this.detailList.has_star}"><i class="iconfont iconshoucang " ></i></div>
<div> <i class="iconfont iconfenxiang"></i></div>

      </div>

    </div>

    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" :placeholder="placeholder"></textarea>
      <div>
        <span @click="handlesend">发送</span>
        <span @click="handlereple">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { stars, sendComment } from '@/api/user.js'
export default {
  props: ['detailList', 'objcomment'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  watch: {
    // 监听，一开始的时候objcomment是没有的，当我点击回复的时候传了一个值过来，就有值了，就监听到objcomment有变化，就触发监听，触发了里面定义的方法就可以用了
    objcomment () {
      // 可以在watch打印this.objcomment，看一次点击不同的回复，传过来的objcomment的值，里面的id是不同的，监听到每次触发到的是不一样的=================================================
      // 当我再点击同一个回复的时候，objcomment值没有【变化，还是一样的，所以没有触发到监听
      // console.log(this.objcomment)
      if (this.objcomment) { // 必须要加这个判断有没有值，因为点击取消的时候把this.objcomment赋值了null，（同时）this.objcomment也为空了，那么就会报错，undfind，所以加了这个判断，当再次点击回复的时候就成功了
        this.isFocus = true
        this.placeholder = '@' + this.objcomment.user.nickname
      }
    }
  },
  methods: {
    // 发布评论 ，这只是点击子组件，没有触发父组件
    async  handlesend () {
      let data = {
        content: this.$refs.commtext.value
      }

      // 这里需要做一个判断，是不是有点击了回复来评论的，还是直接点击输入框来回复这篇文章的。判断条件啊是 objcomment
      if (this.objcomment) {
        data.parent_id = this.objcomment.id // this.objcomment.id不一样，发布的评论的位置也就不一样
      }
      let res = await sendComment(this.detailList.id, data)
      console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$toast.success('评论发布成功')
        this.$refs.commtext.value = ''
        this.isFocus = false
        // 成功了刷新页面,让父组件改变，只能是子传父
        this.$emit('refelse')
      }
    },

    handlereple () {
      this.isFocus = false
      // 点击取消的时候，把objcomment值清空，只能有子组件发射事件到父组件来修改值

      this.$emit('repleobjcomment')
    },
    //   获取焦点时触发
    handlerFocus () {
      // 当点击到输入框的时候就会聚焦，有焦点了就触发，就弹出来
      this.isFocus = true
      this.$refs.commtext.focus()
    },
    // 收藏
    async handleshoucan () {
      let res = await stars(this.detailList.id)
      console.log(res)
      if (!this.detailList.has_star) {
        this.$toast.success(res.data.message)
      } else {
        this.$toast.success(res.data.message)
      }
      this.detailList.has_star = !this.detailList.has_star
    }
  }
}
</script>

<style lang='less' scoped>
.active{
    color: red
}
.addcomment{
    flex: 4;
    background-color: #fff;
    .iconfont{
        font-size: 25px
    }
    em{
        position: absolute;
        top: 0;
        left: 20px;
        display: block;
        width: 30px;
        height: 20px;
        background-color: red;
        color: white;
        border-radius: 25px
    }
}
.comments1{
    position: fixed;
    bottom: 0;
    left: 0;

}
.comment2{
        position: relative;
       display: flex;
    // width: 200px;
        width: 180px;
        justify-content: space-between
    }
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
//   position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
