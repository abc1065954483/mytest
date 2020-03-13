<template>
  <div class="index">
    <div class="header">
      <div class="h-left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="h-center" @click="$router.push({name:'searchPage'})">
        <div class="iconcenter">
          <van-icon name="search" />搜索新闻
        </div>
      </div>
      <div class="h-right">
        <van-icon name="contact" @click="jump" />
      </div>
    </div>
    <!-- v-for="cate in item.artcleList" :key='item.id' -->
    <div class="taps">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab :title="item.name" v-for="(item,index) in categoryList" :key="index">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <div class="styles" @click="$router.push({name:'category'})">+</div>
            <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
              <artileBlock v-for="v in item.artcleList" :key="v.id" :post="v"></artileBlock>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import artileBlock from '@/components/artileBlock.vue'

import { categoryList, postList } from '@/api/arctice.js'
export default {
  components: {
    artileBlock
  },
  data () {
    //     loading: false,
    // finished: false 为什么不在data里定义，是因为需要在不同的页面加载数据，不同的栏目加载数据不受其他的栏目的影响 ，这个时候需要数据改造
    return {
      active: localStorage.getItem('mytoken') ? 1 : 0,
      categoryList: []

    }
  },
  async mounted () {
    // 获取栏目数据
    let del = JSON.parse(localStorage.getItem('mycate'))
    console.log(del)

    if (del) {
      this.categoryList = del
    } else {
      // 获取栏目数据

      let res = await categoryList()
      if (res.status === 200) {
        this.categoryList = res.data.data
      }
    }

    // console.log(res)
    // 数据改造必须在外面，因为不管是if还是else都有 this.categoryList可以进行数据改造
    // ========================不懂看下面这句话===================

    // 在这里进行数据改造也是没有问题的，如果全部else里面的话，那么就是说明，有本地储存，就没有获取到文章的数据
    // 因为获取到的数据categoryList没有所需要的文章列表数据，所以要进行数据改造，用map映射新的所需要成员，因为后期我们进行页面切换的时候点来点去页面的时候，需要把数据可以有属于自己的那一份，不受其他栏目的影响，所以在每一个栏目里面应该有自己的数据内容，后面我们获取到数据可以直接渲染页面
    this.categoryList = this.categoryList.map(v => {
      return {
        ...v,
        artcleList: [],
        pageIndex: 1,
        pageSize: 6,
        loading: false, // loading为false的时候，就是显示加载中。。。为true的时候就是可以加载数据，发起请求数据
        finished: false,
        isLoading: false
      }
    })
    //  this.categoryList 是新的改造完的数据
    console.log(this.categoryList)
    this.postLists()

    document.addEventListener('scroll', function () {
      // 获取当前的滑动屏幕的距离
      let ot = document.documentElement.scrollTop
      console.log(ot)
      if (ot >= 52) {
        document.querySelector('.styles').style.position = 'fiexd'
        document.querySelector('.styles').style.top = '0'
      } else {
        document.querySelector('.styles').style.position = 'absolute'
        document.querySelector('.styles').style.top = '52px'
      }
    })
  },
  methods: {
    jump () {
      // console.log(22)
      this.$router.push({ path: `/personal/${localStorage.getItem('myid')} ` })
      if (!localStorage.getItem('mytoken')) {
        this.$toast.fail('请先登录')
      }
    },
    // 下拉刷新
    onRefresh () {
      this.categoryList[this.active].pageIndex = 1
      this.categoryList[this.active].finished = false

      setTimeout(() => {
        this.categoryList[this.active].artcleList.length = 0
        this.postLists()
      }, 2000)

      // this.categoryList[this.active].isLoading = true
    },
    onLoad () {
      // this.categoryList[this.active].finished = true
      this.categoryList[this.active].pageIndex++
      // 上拉加载数据
      setTimeout(() => {
        this.postLists()
      }, 3000)
    },
    async postLists () {
      // 获取文章列表数据
      let res1 = await postList({
        pageIndex: this.categoryList[this.active].pageIndex,
        pageSize: this.categoryList[this.active].pageSize,
        category: this.categoryList[this.active].id
      })
      console.log(res1)
      // 双层循环，因为数组里面还有一个数组
      res1.data.data.map(v => {
        for (var i = 0; i < v.cover.length; i++) {
          // console.log(i)  i代表索引  0，1，2

          v.cover[i].url = v.cover[i].url.indexOf('https://') ? v.cover[i].url : localStorage.getItem('mybaseURL') + v.cover[i].url
        }
      })

      // 需要把数据解构了再添加到数组，不是直接赋值，因为下一次操作这个数组的时候，会出现问题，
      this.categoryList[this.active].artcleList.push(...res1.data.data)
      // 加载完成状态改为false,可以继续加载
      this.categoryList[this.active].loading = false
      this.categoryList[this.active].isLoading = false
      // 加载到的数据小于当前页面可显示的条数，====判断数据是否加载完成
      if (res1.data.data.length < this.categoryList[this.active].pageSize) {
        this.categoryList[this.active].finished = true
      }
    }
  },

  // 获取b不同的栏目数据，可以调用tap栏目组件的Change事件，也可以用watch监听active的变化来实现切换页面内容的变化
  watch: {
    active () {
      // active为当前激活项
      // active变化了，页面也会变化。 从这里可以看出this.categoryList[this.active]
      // active这个变量很重要
      // console.log(this.active) 可以打印出来看一下需要监听的变量
      this.postLists()
    }
  }
}
</script>

<style lang='less' scoped>
.index{
position: relative;

}
.styles {
  position: absolute;
  top: 52px;
  right: 0;
  font-size: 30px;
  line-height: 40px;
  padding: 0 10px;
}
/deep/.van-sticky {
  margin-right: 50px;
}
.header {
  background-color: red;
  width: 100vw;
  height: 60 * 100vw/360;
  display: flex;
  justify-content: space-between;
  line-height: 60 * 100vw/360;
  .iconcenter {
    margin-top: 10px;
    height: 40 * 100vw/360;
    line-height: 40 * 100vw/360;
    //  flex: 1;
    color: white;
    font-size: 20px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260 * 100vw/360;
    border-radius: 25px;
  }
  .iconnew,
  .van-icon-contact {
    font-size: 50px;
    color: white;
  }
  .van-icon-contact {
    margin-top: 5px;
  }
}
</style>
