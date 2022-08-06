// 提供myAxios来实现发送ajax请求   ajax 异步操作  ==>   需要使用promise来封装ajax异步代码
// 给method 设置默认值为get，这样method没有指定的时候，默认发get请求
function myAxios({ method = 'get', url, params, data }) {
    // 记得将promise实例对象给返回出去
    return new Promise((resolve, reject) => {
        // 在这写ajax异步代码
        // ....
        // console.log(method, url, params, data)

        // 发送请求 + 处理响应
        // 原生xhr
        // 1. 创建出来xhr对象
        // 2. 方式、url地址 ==> open()
        // 3. send(请求体数据) 发送请求

        // 1. 
        let xhr = new XMLHttpRequest()

        // 在open之前，对params查询参数做个处理
        // console.log(params)
        if (params) {
            // if成立，表示params对象是存在的
            // console.log('if成立，表示params对象是存在的，才有必要把params对象处理成键值对字符串，放到url地址后面')

            let arr = []

            for (let k in params) {
                arr.push(`${k}=${params[k]}`)
            }
            // console.log(arr.join('&')) // name=lw&age=19

            // 把键值对字符串拼接到url地址后面，并使用 ? 隔开
            url += `?${arr.join('&')}` // url = url + ?name=lw&age=19
        }

        // 2. 
        xhr.open(method, url)

        // 3. 
        // xhr.send(请求体数据)

        // 字符串有对应方法实现转大小写
        // 'GeT'.toLowerCase()    'get'.toUpperCase()
        if (method.toLowerCase() === 'get') {
            // 以下代码适用于get方式 ==> 没有请求体
            // console.log('这是get请求方式')
            xhr.send()
        } else {
            // 需要判断，请求方式不为get的话，而且有data请求体数据的话，就来处理data数据
            // post put ... 方式
            if (data) {
                // 处理data数据
                // console.log('请求方式不为get的话，而且有data请求体数据的话')

                // 记得还需要设置Content-Type
                xhr.setRequestHeader('Content-Type', 'application/json')

                // 把data对象处理成json字符串，发送给服务器
                xhr.send(JSON.stringify(data))
            }
        }

        // 处理响应
        xhr.addEventListener('load', function () {
            // console.log(xhr.response) // 服务器响应结果

            // 把promise实例对象的状态改成成功fulfilled
            resolve(JSON.parse(xhr.response)) // 把服务器响应的json字符串数据给反序列化下
        })

        // 监听 error 事件 处理请求失败
        xhr.addEventListener('error', function () {
            reject('网络异常，请求失败，请稍后重试~~~')
        })
    })
}
