<template>
  <div class="categorys">
    <hmeditheader title="栏目管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <span slot="right"></span>
    </hmeditheader>
    <div class="catedel">
      <div class="add">
        <div class="dels">点击删除以下频道</div>

        <van-button type="default" v-for="(item,index) in Delcategorys" :key="index" @click="del(item,index)">{{item.name}}</van-button>

      </div>
      <div class="add">
        <div class="adds">点击添加以下频道</div>
         <van-button type="default" v-for="(item,index) in Addcategorys" :key="index" @click="add(index)">{{item.name}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import hmeditheader from '@/components/hmeditheader.vue'
import { categoryList } from '@/api/arctice.js'
export default {
  data () {
    return {
      Delcategorys: [],
      Addcategorys: []
    }
  },
  components: {
    hmeditheader
  },
  methods: {
    del (item, index) {
      console.log(item)
      //   先添加后删除
      this.Addcategorys.unshift(item)
      this.Delcategorys.splice(index, 1)
      //   删除后的数据
      localStorage.setItem('mycate', JSON.stringify(this.Delcategorys))
      //   添加后的数据
      localStorage.setItem('mycate-add', JSON.stringify(this.Addcategorys))
    },
    add (index) {
      this.Delcategorys.push(this.Addcategorys[index])
      this.Addcategorys.splice(index, 1)
      //   删除后的数据
      localStorage.setItem('mycate', JSON.stringify(this.Delcategorys))
      //   添加后的数据
      localStorage.setItem('mycate-add', JSON.stringify(this.Addcategorys))
    }
  },
  async  mounted () {
    let del = JSON.parse(localStorage.getItem('mycate'))
    // 判断本地内存有没有删除后的数据，若有，直接赋值渲染
    console.log(localStorage.getItem('mycate'))

    if (del) {
      this.Delcategorys = del
    } else {
      // 没有的话，就发请求渲染
      let res = await categoryList()
      console.log(res)
      this.Delcategorys = res.data.data
    }
    // 这个是添加后的数据
    this.Addcategorys = JSON.parse(localStorage.getItem('mycate-add')) || []
  }
}
</script>

<style lang='less' scoped>
.catedel {
  .dels,
  .adds {
    font-size: 20px;
  }
}
 /deep/.dels{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

}
 /deep/.van-button, .van-button--default,.van-button--normal {
            width: 23%;
     margin: 5px 1px 0 5px;
        }
</style>
