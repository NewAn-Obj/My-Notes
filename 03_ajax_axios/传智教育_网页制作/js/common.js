// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})
//---------------------------------------------------
// axios的公共配置
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// axios的其他配置

// 添加请求拦截器: 所有的请求，在请求发送出去之前，会先经过请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 如果有token的情况，应该将token携带在请求头中 （在拦截器中统一操作）
  const token = localStorage.getItem('user-token')
  if (token) {
    // 如果有token，需要携带在请求头
    config.headers.Authorization = token
    // console.log(config) // 请求对象
  }

  return config; // 这里返回的是请求的配置项，不能删除！
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 测试方案：
// 1. 打开 本地存储， 修改localStorage token （模拟token过期）
// 2. 刷新页面，token过期了，会401，经过响应拦截器，就会被拦截

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 正常响应走上面
  return response.data; // response 就是响应的结果  勿删！！！
}, function (error) {
  // 如果控制台报响应的错误，都是走错误响应 4xx  5xx
  // console.dir(error)
  if (error.response.status === 401) {
    // token过期，需要将token信息移除，个人信息移除，拦截到登录，重新登录
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href = './login.html'
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

// -------------------------------------------------
// 封装轻提示函数 tip
const toastBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(toastBox, {
  animation: true, // 是否有动画
  autohide: true, // 是否自动隐藏
  delay: 3000 // 停留多久
})

const tip = (msg) => {
  toastBox.querySelector('.toast-body').innerHTML = msg
  toast.show()
}
// -------------------------------------------------
// 用户展示 和 用户退出功能
const userName = document.querySelector('.navbar .font-weight-bold')
const logoutBtn = document.querySelector('#logout')

// 登录页或注册页，没有个人信息的标签，无需展示名字
// 1. 展示头像
if (userName) {
  userName.innerHTML = localStorage.getItem('user-name')
}
// 2. 退出功能
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href = './login.html'
  })
}
