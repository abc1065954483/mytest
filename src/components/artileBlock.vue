<template>
<div @click="$router.push({path:`/newsdetail/${post.id}`})">
  <div class="single" v-if="post.cover.length<=2">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span v-if="post.comment_length!==0">{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <!-- cover是一个数组。看数据的时候看清楚是数组还是对象， -->
    <img :src="post.cover[0].url" alt />

  </div>
  <div class="single2" v-if="post.cover.length>2">
    <div class="left2">

      <p class="content">{{post.title}}</p>
<!-- cover是一个数组。看数据的时候看清楚是数组还是对象， -->
  <div class="images">
    <img  v-for="i in post.cover" :key="i.id"   :src="i.url"  alt />
    </div>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span v-if="post.comment_length!==0">{{post.comment_length}}跟帖</span>
      </p>
    </div>

  </div>
  <div class="single3" v-if="post.type===2">
   <div class="left2">

      <p class="content">{{post.title}}</p>
<!-- cover是一个数组。看数据的时候看清楚是数组还是对象， -->
  <div class="images3">
      <div class="active"><van-icon name="play" /></div>
    <img  :src="post.cover[0].url" alt />
    </div>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span v-if="post.comment_length!==0">{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang='less' scoped>
.single3{
      .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
.images3{
    margin: 5px 0;
    position: relative;
    .active{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 50*100vw/360;
        height: 50*100vw/360;
        background-color: #ccc;
        border-radius: 50%;
        box-shadow: 0 0 10px red;
        color: white;
        font-size: 50px;
        opacity: 0.7;
    }
    img{
        width: 100%;
    }
}
}
.single2{
      .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
   .left2{
    //    border: 1px solid red;
       display: flex;
       flex-direction: column;
.images{
    display: flex;
    width: 33.33%;
    margin: 5px 0;
   ;
    img{
        width: 100%;
        padding: 0 5px;
        box-sizing: border-box
    }

}
}
}
.info {
    font-size: 12px;
    padding-left:5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
