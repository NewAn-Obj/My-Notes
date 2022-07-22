// 保证dom内容是加载完了执行，不需要等待图片css资源的加载，性能高
document.addEventListener('DOMContentLoaded', async function () {
    // 发送请求，获取数据
    const res = await axios.get('/dashboard')
    // console.log(res)
})