<template>
  <div class="focus">
    <hmcell title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <span slot="right"></span>
    </hmcell>
    <div class="list">
        <!-- IMG1582949948573 -->
      <div class="box" v-for="(item,index) in followsList" :key="index">
        <img src="http://localhost:3000/uploads/image/IMG1577278821188.png" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="hanlequ(index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import { followsList, Unfollows } from '@/api/user.js'
import hmcell from '@/components/hmcell.vue'

export default {
  data () {
    return {
      followsList: []
    }
  },
  components: {
    hmcell
  },
  methods: {
    hanlequ (index) {
      console.log(2)
      this.followsList.forEach(async (v, i) => {
        if (index === i) {
          let res = await Unfollows(this.followsList[i].id)
          console.log(res)
          this.followsList.splice(index, 1)
        }
      })
    }
  },
  async mounted () {
    let res = await followsList()
    console.log(res)
    this.followsList = res.data.data
    this.followsList.map(v => {
      v.head_img = localStorage.getItem('mybaseURL') + v.head_img
      return v
    }

    )
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
