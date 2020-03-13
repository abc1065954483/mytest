<template>
  <div class="comments">
    <!-- 组件递归 -->

        <mycommont v-if="comment.parent" :comment='comment.parent' @handleobjcomment='handlecomments'></mycommont>
      <div class="commentText2">
 <div class="item">
        <div class="head">
          <img src="" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>{{comment.create_date}}</span>
          </div>
          <span class="huifu" @click="handlecomments">回复</span>
        </div>

        <div class="text">{{comment.content}}</div>
      </div>
</div>
  </div>
</template>

<script>
// import mycommont from '@/components/comments.vue'
export default {
  name: 'mycommont',
  props: ['comment'],
  methods: {
    handlecomments () {
      // 监听组件递归，在递归位置监听handleobjcomment
      this.$emit('handleobjcomment', this.comment)
    }
  }

}
</script>

<style lang='less' scoped>

.commentText2{
    border: 1px solid #ccc;
    margin: 0 10px;
    .huifu{
            padding: 0 14px;
    }
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
