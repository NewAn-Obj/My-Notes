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