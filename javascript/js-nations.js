const serverNationInfoURL = 'api/v4/nations'

//查询所有国家
function searchAll() {
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
    })
}

//查询单一国家
function search() {
    let nationName = document.getElementById('nationName').value
    if(nationName == '') {
        alert("在输入框输入国家名字喵")
    } else {
        window.location.href = `nation.html?search=${encodeURIComponent(nationName)}`
    }
}