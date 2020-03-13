<template>
  <div class="searchPages">
<div class="header">
    <div><van-icon name="arrow-left"  @click="$router.back()"/></div>
    <div class="inout">
    <van-search
  v-model="userkey"
  show-action
  placeholder="请输入搜索关键词"
  @search="onSearch"
>
  <div slot="action" @click="onSearch">搜索</div>
</van-search>
</div>
</div>
<div class="centent">
<div class="centent-hist">
    <div class="centent-hist-header" >历史记录</div>
    <ul>
        <li v-for="(item,index) in arr" :key="index" @click="onSearch2(item)">{{item}}</li>

        </ul>
    </div>
<div class="centent-re">
    <div class="centent-re-header" >  热门搜索</div>

    </div>
<div class="centent-jieguo">
    <div class="centent-re-header" >  搜索结果</div>
    <ul>
        <li v-for="(item,index) in searchlist" :key="index" class="li" >
          {{index+1}}  {{item.title}}
        </li>

    </ul>

    </div>

</div>

  </div>
</template>

<script>
import { search } from '@/api/user.js'
export default {
  data () {
    return {
      userkey: '',
      searchlist: [],
      arr: []
    }
  },
  mounted () {
    this.arr = JSON.parse(localStorage.getItem('mykeyword')) || []
  },
  methods: {
    async onSearch2 (item) {
      this.userkey = item
      // 参数是params，是一个对象，不是路由id，传一个
      let res = await search({ keyword: this.userkey })
      console.log(res)
      this.searchlist = res.data.data
      //   本地储存，是json的字符串格式，所以要用到es6的方法转化
      let arr = JSON.parse(localStorage.getItem('mykeyword')) || []
      //   console.log(arr)
      let index = arr.indexOf(this.userkey)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      if (arr.length >= 5) {
        arr.splice(arr.length - 1, 1)
      }
      arr.unshift(this.userkey)
      //   JSON.stringify(localStorage.setItem('mykeyword', arr))
      localStorage.setItem('mykeyword', JSON.stringify(arr))
    },
    async onSearch (item) {
      if (this.userkey.trim() === '') {
        this.$toast('不能为空')
        return
      }
      // 参数是params，是一个对象，不是路由id，传一个
      let res = await search({ keyword: item || this.userkey })
      console.log(res)
      this.searchlist = res.data.data
      //   本地储存，是json的字符串格式，所以要用到es6的方法转化
      let arr = JSON.parse(localStorage.getItem('mykeyword')) || []
      //   console.log(arr)
      let index = arr.indexOf(this.userkey)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      if (arr.length >= 5) {
        arr.splice(arr.length - 1, 1)
      }
      arr.unshift(this.userkey)
      //   JSON.stringify(localStorage.setItem('mykeyword', arr))
      localStorage.setItem('mykeyword', JSON.stringify(arr))
    }
  }
}
</script>

<style lang='less' scoped>
.li{
          text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 10px 10px;

}
.centent-hist-header,
.centent-re-header,
.centent-re-header{
    font-size: 30px;
    padding: 10px;
    border-bottom: 2px solid #ccc;

}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center
}
.inout{
    flex: 1
}
.centent-hist{
    padding: 10px;
    li{
        margin: 10px;
        text-decoration:underline

    }
}
</style>
