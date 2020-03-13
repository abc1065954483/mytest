import axios from '@/untils/myaxios.js'

// 1,登录
export const userlogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 2,用户详情
export const getuserinfo = (id) => {
  return axios({
    // 需要Authorization 授权验证，就是token的验证
    // headers: {
    //   Authorization: localStorage.getItem('mytoken')
    // },
    url: `/user/${id}` // 这个参数是路由参数，直接在url这里写，不用pramas

  })
}
// 3.用户编辑
// export const useredit = (id) => {
//   return axios({
//     method: 'post',
//     url: `/user_update/${id}`

//   })
// }
// 4,文件上传

export const upfile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data

  })
}
// 5,编辑用户信息 data是请求体的参数
export const userUpdate = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data

  })
}

// 6,注册
export const registerInfo = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data

  })
}
// 关注
export const follows = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 取消关注
export const Unfollows = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 点赞
export const Likes = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 收藏和取消是同一个
export const stars = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 关注列表
export const followsList = () => {
  return axios({
    url: '/user_follows'
  })
}

// 收藏列表
export const mystaruser = () => {
  return axios({
    url: '/user_star'
  })
}

// 评论列表
export const commentsLists = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}
// 发布评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
// 搜索
export const search = (params) => {
  return axios({
    url: '/post_search_recommend',
    params
  })
}
