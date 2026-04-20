const serverTownInfoURL = '/api/v4/towns'

//查询所有城镇
function searchAll() {
    // 显示加载动画
    if (typeof showLoading === 'function') showLoading('正在获取城镇列表...')
    
    fetch(serverTownInfoURL)
        .then(response => response.json())
        .then(data => {
            console.log(`一共找到了${data.length}个猫村喵`)
            console.log(data)
            document.getElementById('townList').style.display = 'table'
            const tbody = document.querySelector(`table tbody`)
            tbody.innerHTML = ""
            data.forEach(item => {
                tbody.insertAdjacentHTML ('beforeend', 
                    `<tr>
                    <td><a href="town.html?search=${item.name}">${item.name}</td>
                    <td>${item.uuid}</td>
                    </tr>`)
        })
        // 隐藏加载动画
        if (typeof hideLoading === 'function') hideLoading()
    })
    .catch(error => {
        alert("获取城镇列表失败")
        // 隐藏加载动画
        if (typeof hideLoading === 'function') hideLoading()
    })
}

//定义一些东西

//查询单一城镇
function search() {
    let townName = document.getElementById('townName').value
    if(townName == '') {
        // 输入框震动
        const input = document.getElementById('townName')
        input.classList.add('input-shake')
        setTimeout(() => input.classList.remove('input-shake'), 150)
        alert("请输入城镇名称")
    } else {
        // 按钮变成搜索中状态
        const btn = document.getElementById('searchButton')
        btn.innerHTML = '搜索中...'
        btn.classList.add('searching')
        btn.disabled = true
        
        setTimeout(() => {
            window.location.href = `town.html?search=${encodeURIComponent(townName)}`
        }, 200)
    }
}