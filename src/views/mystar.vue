<template>
  <div class="stars">
        <div class="headers">
            <hmcell title="我的收藏">
                <span class="iconfont iconjiantou2" slot="left" @click="$router.back()" ></span>
            </hmcell>

            </div>
            <!-- item是一个变量，不是单单一个值，所以要动态绑定 -->
            <div class="centents" v-for="(item,index) in mystarList" :key="index">
                <van-swipe-cell>

<artileBlock :post='item'></artileBlock>
  <template slot="right">
    <van-button square type="danger" text="删除" @click='handleclick(index)' />
    <!-- <van-button square type="primary" text="收藏"/> -->
  </template>
</van-swipe-cell>

            </div>

  </div>
</template>

<script>
import artileBlock from '@/components/artileBlock.vue'
import hmcell from '@/components/hmcell.vue'
import { mystaruser, stars } from '@/api/user.js'
export default {
  data () {
    return {
      mystarList: []
    }
  },
  methods: {
    handleclick (index) {
      console.log(33)
      this.mystarList.forEach((v, i) => {
        if (index === i) {
          stars(this.mystarList[i].id)
          this.mystarList.splice(index, 1)
        }
      })
    }
  },
  components: {
    hmcell, artileBlock
  },
  async mounted () {
    let res = await mystaruser()
    console.log(res)
    this.mystarList = res.data.data
  }

}
</script>

<style lang='less' scoped>
  /deep/.van-swipe-cell__right{
      position: absolute;
    top: 27px;
    height: 100%;
}

</style>
