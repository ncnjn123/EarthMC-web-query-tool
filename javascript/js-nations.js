const serverNationInfoURL = '/api/v4/nations'

//查询所有国家
function searchAll() {
    // 显示加载动画
    if (typeof showLoading === 'function') showLoading('正在获取国家列表...')
    
    fetch(serverNationInfoURL)
        .then(response => response.json())
        .then(data => {
            console.log(`一共找到了${data.length}个猫国喵`)
            console.log(data)
            document.getElementById('nationList').style.display = 'table'
            const tbody = document.querySelector(`table tbody`)
            tbody.innerHTML = ""
            data.forEach(item => {
                tbody.insertAdjacentHTML ('beforeend', 
                    `<tr>
                    <td><a href="nation.html?search=${item.name}">${item.name}</td>
                    <td>${item.uuid}</td>
                    </tr>`)
        })
        // 隐藏加载动画
        if (typeof hideLoading === 'function') hideLoading()
    })
    .catch(error => {
        alert("获取国家列表失败")
        // 隐藏加载动画
        if (typeof hideLoading === 'function') hideLoading()
    })
}

//查询单一国家
function search() {
    let nationName = document.getElementById('nationName').value
    if(nationName == '') {
        // 输入框震动
        const input = document.getElementById('nationName')
        input.classList.add('input-shake')
        setTimeout(() => input.classList.remove('input-shake'), 150)
        alert("请输入国家名称")
    } else {
        // 按钮变成搜索中状态
        const btn = document.getElementById('searchButton')
        btn.innerHTML = '搜索中...'
        btn.classList.add('searching')
        btn.disabled = true
        
        setTimeout(() => {
            window.location.href = `nation.html?search=${encodeURIComponent(nationName)}`
        }, 200)
    }
}