//查询单一玩家
function search() {
    let playerNameInput = document.getElementById('pName').value
    if(playerNameInput == '') {
        // 输入框震动
        const input = document.getElementById('pName')
        input.classList.add('input-shake')
        setTimeout(() => input.classList.remove('input-shake'), 150)
        alert("请输入玩家名称或UUID")
    } else {
        // 按钮变成搜索中状态
        const btn = document.getElementById('searchButton')
        btn.innerHTML = '搜索中...'
        btn.classList.add('searching')
        btn.disabled = true
        
        setTimeout(() => {
            window.location.href = `player.html?search=${encodeURIComponent(playerNameInput)}`
        }, 200)
    }
}