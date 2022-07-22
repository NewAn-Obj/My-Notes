// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})
//-------------------------------------------------------
//axios的公共配置
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

//axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('user-token')
  if(token){
    config.headers.Authorization = token
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response.data)
  //把返回的response改成返回response.data,这样方便使用返回来的数据
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status === 401){
    tip('身份认证过期，请重新登陆')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-token')
    setTimeout(()=>{
      location.href = './login.html'
    },300)
  }
  return Promise.reject(error);
});


//-------------------------------------------------------
//封装轻提示函数tip
const toastBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(toastBox,{
  amimation : true, //是否有动画
  autohide : true,  // 是否自动隐藏
  dalay : 3000  //停留多久
})
const tip = (msg) => {
  toastBox.querySelector('.toast-body').innerHTML = msg
  toast.show()
}
//-------------------------------------------------------
// 实现用户名展示 和  退出按钮功能
const userName = document.querySelector('#navbar-main-collapse .nav-item .font-weight-bold')
const logout = document.querySelector('#logout')
if(userName){
  userName.innerHTML = localStorage.getItem('user-name')
}
if(logout){
logout.addEventListener('click',()=>{
  localStorage.removeItem('user-name')
  localStorage.removeItem('user-token')
  tip('退出成功，正在前往登录页')
        setTimeout(()=>{
            location.href = './login.html'
          },300)
      
})
}