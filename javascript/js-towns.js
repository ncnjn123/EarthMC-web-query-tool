const serverTownInfoURL = '/api/v4/towns'

//查询所有城镇
function searchAll() {
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
    })
}

//定义一些东西

//查询单一城镇
function search() {
    let townName = document.getElementById('townName').value
    if(townName == '') {
        alert("在输入框输入城镇名字喵")
    } else {
        window.location.href = `town.html?search=${encodeURIComponent(townName)}`
    }
}