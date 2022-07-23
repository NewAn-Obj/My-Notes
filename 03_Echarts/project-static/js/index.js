// 保证dom内容是加载完了执行，不需要等待图片css资源的加载，性能高
document.addEventListener('DOMContentLoaded', async function () {
    // 发送请求，获取数据
    const {data} = await axios.get('/dashboard')
    console.log(data)

    // for(let key in res.overview){
    //     document.querySelector(`[name=${key}]`).innerHTML = res.overview[key]
    //     console.log(document.querySelector(`[name=${key}]`));
    // }
    const spansInfo = Object.values(data.overview)
    // console.log(spansInfo);
    const spans = document.querySelectorAll('body [name]')
    for(let i = 0 ; i < spans.length ; i++){
        spans[i].innerHTML = spansInfo[i]
    }

    showLine(data.year)
    showClassSalary(data.salaryData)
    showGroupSalary(data.groupData[1])
    // console.log(data.groupData[1])
    const groupBtns = document.querySelector('.card-header')
    groupBtns.addEventListener('click',function(e){
        if(e.target.tagName === 'BUTTON'){
            groupBtns.querySelector('.btn-blue').classList.remove('btn-blue')
            e.target.classList.add('btn-blue')
            showGroupSalary(data.groupData[e.target.innerHTML])
            // console.log(data.groupData[e.target.innerHTML])
        }
        // console.dir(e.target)
    })
    
    showGenderSalary(data.salaryData)

    showArea(data.provinceData)
    
})

//班级薪资分布
function showLine (year){
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('line'));

    // 指定图表的配置项和数据
    var option = {
        title : {
          text :'2021全学科薪资走势',
          top : 15,
          left : 10,
          textStyle:{
            fontSize : '18'
          },
        },
        tooltip: {
            trigger: 'axis'
          },
        grid : {
          top: '15%',
          bottom : '10%',
          right : '10%',
          left : '10%',
        },
        xAxis: {
          type: 'category',
          data: year.map((item) => {
                  return item.month
                }),
          
          axisLine:{
              lineStyle :{
                type : 'dashed',
                color : '#ccc'
              },
          },
          axisLabel :{
            color : '#',
          },
        },
        yAxis: {
          type: 'value',
          splitLine:{
            lineStyle :{
                  type : 'dashed',
                  color : '#ccc'
                },
          },
          
        },
        series: [
          {
            data:year.map((item) => {
                      return item.salary
                    }),
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize : 10,
            lineStyle :{
              width : 5,
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(96,137,252)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(81,170,253)'// 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            areaStyle:{
              color:{
                type: 'linear',
                x: 1,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(96,137,252,0.5)' // 0% 处的颜色
                }, 
                {
                  offset: 0.8, color: 'rgba(96,137,252,0)' // 80% 处的颜色
                },
                {
                    offset: 1, color: 'rgba(256,256,256,0)'// 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function showClassSalary (salaryData){
    var myChart = echarts.init(document.getElementById('salary'));

    // 指定图表的配置项和数据
    var option = {
        title :{
          text : '班级薪资分布',
          top : 15,
          left : 10,
        },
        tooltip: {
          trigger: 'item',
          // show : false
          // showContent : false  
          
        },
        color:['rgb(252,161,46)','rgb(78,153,253)','rgb(60,189,248)','rgb(39,191,152)'],
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: ' 班级薪资分布',
            type: 'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 25,
              borderColor: '#fff',
              borderWidth: 8 ,
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: 
            // [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            // ],
            
            salaryData.map(item =>{
                return {
                    value : item.b_count + item.b_count,
                    name : item.label
                }
            })
            
          }
        ]
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function showGroupSalary (groupData){
    var myChart = echarts.init(document.getElementById('lines'));

    // 指定图表的配置项和数据
    var option = {
        color:[{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgb(73,212,160)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgb(239,251,247)'// 100% 处的颜色
            }],
            global: false // 缺省为 false
          },{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgb(80,163,236)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgb(210,235,254)'// 100% 处的颜色
            }],
            global: false // 缺省为 false
          }],
        xAxis: {
          type: 'category',
          axisLabel :{
            color : 'rgb(102,102,102)',
          },
          axisLine:{
            lineStyle :{
                type : 'dashed',
                color : '#ccc'
            },
            
          },
          data: groupData.map(item =>{
            return item.name
          })
        },
        yAxis: {
          type: 'value',
          splitLine:{
            lineStyle :{
                  type : 'dashed',
                  color : '#ccc'
                }}
        },
        grid :{
            top : '10%',
            right : '3%',
            left : '7%',
            bottom : '10%',
        },
        series: [
          {
            data: groupData.map(item =>{
                return item.hope_salary}),
            type: 'bar'
          },
          {
            data: groupData.map(item =>{
                return item.salary}),
            type: 'bar'
          },
        ]
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function showGenderSalary (salaryData){
    var myChart = echarts.init(document.getElementById('gender'));

    // 指定图表的配置项和数据
    var option = {
        title :[{
          text : '班级薪资分布',
          top : 15,
          left : 10,
          textStyle:{
            fontSize: 16
          }
        },
        {
            text : '男生',
            top : '47%',
            left : 'center',
            textStyle:{
              fontSize: 16
            }
          },
          {
            text : '女生',
            top : '87%',
            left : 'center',
            textStyle:{
              fontSize: 16
            }
          },],
        
        tooltip: {
          trigger: 'item', 
          
        },
        color:['rgb(252,161,46)','rgb(78,153,253)','rgb(60,189,248)','rgb(39,191,152)'],
        legend: {
            show: false,
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: ' 男生',
            type: 'pie',
            center :['50%','30%'],
            radius: ['25%', '35%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 0 ,
            },
            
            
            labelLine: {
              show: true
            },
            data: 
            // [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            // ],
            
            salaryData.map(item =>{
                return {
                    value : item.b_count + item.b_count,
                    name : item.label
                }
            })
            
          },
          {
            name: ' 女生',
            type: 'pie',
            
            radius: ['25%', '35%'],
            center :['50%','70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 0 ,
            },
            label: {
              show: true,
              position: 'outside'
            },
            
            labelLine: {
              show: true
            },
            data: 
            // [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            // ],
            
            salaryData.map(item =>{
                return {
                    value : item.b_count + item.b_count,
                    name : item.label
                }
            })
            
            
            }
        ]
        
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function showArea (provinceData){

    const myEchart = echarts.init(document.querySelector('#map'))
    console.log(provinceData)
    // 默认数据项
    const dataList = [
      { name: '南海诸岛', value: 0 },
      { name: '北京', value: 0 },
      { name: '天津', value: 0 },
      { name: '上海', value: 0 },
      { name: '重庆', value: 0 },
      { name: '河北', value: 0 },
      { name: '河南', value: 0 },
      { name: '云南', value: 0 },
      { name: '辽宁', value: 0 },
      { name: '黑龙江', value: 0 },
      { name: '湖南', value: 0 },
      { name: '安徽', value: 0 },
      { name: '山东', value: 0 },
      { name: '新疆', value: 0 },
      { name: '江苏', value: 0 },
      { name: '浙江', value: 0 },
      { name: '江西', value: 0 },
      { name: '湖北', value: 0 },
      { name: '广西', value: 0 },
      { name: '甘肃', value: 0 },
      { name: '山西', value: 0 },
      { name: '内蒙古', value: 0 },
      { name: '陕西', value: 0 },
      { name: '吉林', value: 0 },
      { name: '福建', value: 0 },
      { name: '贵州', value: 0 },
      { name: '广东', value: 0 },
      { name: '青海', value: 0 },
      { name: '西藏', value: 0 },
      { name: '四川', value: 0 },
      { name: '宁夏', value: 0 },
      { name: '海南', value: 0 },
      { name: '台湾', value: 0 },
      { name: '香港', value: 0 },
      { name: '澳门', value: 0 },
    ]
    // 需要将后台返回的数据项，匹配设置给默认的数据项
    // 遍历dataList, 依次在后台返回的数据中找，看有没有相同name的项，如果有，更新一下value
    dataList.forEach(item => {
      // 尝试拿item.name去provinceData数组中找对应项
      const obj = provinceData.find(v => {
        const regExp = /省|回族自治区|维吾尔自治区|壮族自治区|特别行政区|自治区/g
        return v.name.replace(regExp, '') === item.name
      })
      // 找到了，说明有这个省份的同学，更新
      if (obj) {
        item.value = obj.value
      }
    })
  
    let option = {
      title: {
        text: '籍贯分布',
        top: 20,
        left: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 位学员',
        borderColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0.5)',
        textStyle: {
          color: '#fff',
        },
      },
      visualMap: {
        min: 0,
        max: 6,
        left: 'left',
        bottom: '20',
        text: ['6', '0'],
        inRange: {
          color: ['#ffffff', '#0075F0'],
        },
        show: true,
        left: 40,
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.0,
        label: {
          normal: {
            show: true,
            fontSize: '10',
            color: 'rgba(0,0,0,0.7)',
          },
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            color: '#e0ffff',
          },
          emphasis: {
            areaColor: '#34D39A',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      series: [
        {
          name: '籍贯分布',
          type: 'map',
          geoIndex: 0,
          data: dataList,
        },
      ],
    }
    myEchart.setOption(option)
  }