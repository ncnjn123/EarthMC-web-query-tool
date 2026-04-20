//查询单一玩家
function search() {
    let playerNameInput = document.getElementById('pName').value
    if(playerNameInput == '') {
        alert("在输入框输入城镇名字喵")
    } else {
        window.location.href = `player.html?search=${encodeURIComponent(playerNameInput)}`
    }
}