import axios from '@/untils/myaxios.js'// 这里已经处理好基地址和请头的判断了
// 1获取文章栏目信息
export const categoryList = () => {
  return axios({

    url: '/category'

  })
}
// 2，获取文章列表数据
export const postList = (params) => {
  return axios({

    url: '/post',
    params
  })
}
// 3，获取文章详情
export const detailList = (id) => {
  return axios({

    url: `/post/${id}`

  })
}
