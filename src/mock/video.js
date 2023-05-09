
import Mock from 'mockjs'

var {newsList} = Mock.mock({
    "newsList|50-98": [
     {
        id:"@increment",
        // title:"@ctitle()",
        name:"@ctitle()",
        // content: "@cparagraph(5,10)",
        desc: "@cparagraph(5,10)",
        // img_url: "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
        picture: "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
        // add_time: "@date(yyyy-MM-dd hh:mm:ss)",
        date: "@date(yyyy-MM-dd)",
        "type|1-2":[
          1,
          2,
          3,
          4,
          5
        ],
        
        radios: "@integer(0,1)",
        province: "@province",
        city: "@city",
        // region: "@region",
        district: "@region",
        "delivery|1-2": true
     }
    ]
})

// 這是個封裝的方法  主要是解析/api/get/news?pageindex=1&pagesize=20，拿出裡面的參數
var getQuery = (url, name) => {
//   console.log('url', url);
//   console.log('name',name)
  // 寻找url的地址里的？的位置数
  const index = url.indexOf("?")
//   console.log('index',index)
  if(index !== -1) { //不等于-1说明url地址里包含了参数了
    // 对url后面的参数 即？后面的参数进行截取 ？的位置为13，加1，则是？号后面开始截取
    const queryStrArr = url.substr(index + 1).split("&")// 截取完后，page和size这两个参数是用&分割开来的，所以用&分割开
    // queryStrArr是有两个分割开的参数数组
    // console.log('queryStrArr',queryStrArr)
    for (var i = 0; i < queryStrArr.length; i++) {
        const itemArr = queryStrArr[i].split("=")
        // console.log(itemArr);
        if (itemArr[0] === name) { // name是代表pageindex和pagesize，如果他们相等
            return itemArr[1] // 则把第一项的位置数字 return出去
        }
    }
  }
  return null
}

export default {
// 定义获取新闻列表的数据
getVideoList: options => {
    // console.log('options',options)
  // 获取传递参数pageindex，pagesize
  const pageindex = getQuery(options.url, "pageindex")
  const pagesize = getQuery(options.url, "pagesize")
  const limit = 20
//   const {pagesize,pageindex} = getQuery(options.url)
//   console.log('pageindex',pageindex);
//   console.log('pagesize',pagesize);
  // 1 0-9
  // 2 10-19
  // 3 20-29
  // 数据的起始位置：(pageindex - 1) * pagesize  数据结束位置：pageindex * pagesize
  const start = (pageindex - 1) * pagesize
//   console.log('start',start);
  const end = pagesize * pageindex
//   console.log('end',end);
  // 计算的总页数  Math.ceil向上取整
  const totalPage = Math.ceil(newsList.length/pagesize)
//   console.log('newsList.length',newsList.length)
//   console.log('totalPage',totalPage);
  //  pageindex:1 pagesize:10 返回0-9条数据  2-10-（10-19） 3-10（20-29）
  // 数据的起始位置：（pageindex-1）*pagesize 结束位置：pageindex*pagesize
//   const list = pageindex > totalPage ? [] : newsList.slice(start,end) 這條數據是錯的，並不適用分頁數據 他的原本案例是上下頁，可是上下頁在本代碼也實現不了，出了問題
// 這個實現分頁的主要語句
const list = newsList.filter((item, index) => index < limit * pageindex && index >= (pageindex - 1) * limit)
// console.log('newsList',newsList)
//   console.log('list',list);
  return {
    status: 200,
    message: "获取列表成功",
    list: list,
    total: newsList.length
  }
},

// 定义添加新闻的数据
creatVideo: options => {
    const body = JSON.parse(options.body)
    // console.log('JSON.parse(options.body)',JSON.parse(options.body));
    newsList.push(
        Mock.mock({
            id: "@increment",
            name: body.name,
            desc: body.desc,
            img_url: body.picture,
            date: body.date,
            province: body.region,
            city:body.cities,
            district:body.district,
            type:body.types,
            radios:body.resource,
            delivery:body.delivery
        })
    )
    return {
        status: 200,
        message: "添加成功",
        list:newsList,
        total: newsList.length
    }
},

// 定义删除新闻
deleteVideo: options => {
    // console.log(options);
    const body = JSON.parse(options.body)
    console.log(body);
    const index = newsList.findIndex((item) => {
        return item.id === body.id
    })
    newsList.splice(index, 1)
    // console.log(index);
    return {
        status: 200,
        message: "添加成功",
        list: newsList,
        total: newsList.length
    }
}
// console.log(Mock)

}