const URLString = window.location.search
const URL = new URLSearchParams(URLString)
const playerName = URL.get('search')
document.getElementById('pName').value = playerName

//给所有HTML含id的信息项一个变量
let pName = document.getElementById('name');
let uuid = document.getElementById('uuid');
let title = document.getElementById('title');
let surName = document.getElementById('surName');
let formattedName = document.getElementById('formattedName');
let about = document.getElementById('about');
let townJoined = document.getElementById('townJoined');
let nationJoined = document.getElementById('nationJoined');
let registered = document.getElementById('registered');
let joinedTownAt = document.getElementById('joinedTownAt');
let lastOnline = document.getElementById('lastOnline');
let isOnline = document.getElementById('isOnline');
let isNPC = document.getElementById('isNPC');
let isMayor = document.getElementById('isMayor');
let isKing = document.getElementById('isKing');
let balance = document.getElementById('balance');
let numFriends = document.getElementById('numFriends');
let townRanks = document.getElementById('townRanks');
let nationRanks = document.getElementById('nationRanks');
let friendsList = document.getElementById('friendsList')


//EarthMC API地址
const serverTownInfoURL = '/api/v4/players'
fetch(serverTownInfoURL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    "query": [playerName]
    })
}) 

    .then(response => response.json())
    .then(data => {
        const player = data[0]
        pName.innerHTML = player.name
        uuid.innerHTML = player.uuid
        title.innerText = player.title
        surName.innerHTML = player.surname
        formattedName.innerHTML = player.formattedName
        about.innerHTML = player.about
        //处理data[0].town.*和data[0].nation.*
        if(player.town.name === null) {
            townJoined.innerHTML = '无'
        } else {
        townJoined.innerHTML = `${townStats(player.town.name)}`
        }
        if(player.nation.name === null) {
            nationJoined.innerHTML = '无'
        } else {
            nationJoined.innerHTML = `${nationStats(player.nation.name)}`
        }
        //处理data[0].timestamps.*
        let registeredDate = new Date(player.timestamps.registered)
        registered.innerHTML = registeredDate.toDateString('zh-cn')
        let joinedTownDate = player.timestamps.joinedTownAt ? new Date(player.timestamps.joinedTownAt) : null
        joinedTownAt.innerHTML = joinedTownDate ? joinedTownDate.toDateString('zh-cn') : '无'
        let lastOnlineDate = player.timestamps.lastOnline ? new Date(player.timestamps.lastOnline) : null
        lastOnline.innerHTML = lastOnlineDate ? lastOnlineDate.toDateString('zh-cn') : '无'
        //处理data[0].status.*
        if (player.status.isOnline === true) {
            isOnline.innerHTML = '是'
            lastOnline.innerHTML = '当前在线'
        } else {
            isOnline.innerHTML = '否'
        }
        isNPC.innerHTML = player.status.isNPC ? '是' : '否'
        isMayor.innerHTML = player.status.isMayor ? '是' : '否'
        isKing.innerHTML = player.status.isKing ? '是' : '否'
        //处理data[0].stats.*
        balance.innerHTML = player.stats.balance
        if(player.stats.numFriends > 0) {
            friendsList.style.display = 'default'
        }
        numFriends.innerHTML = player.stats.numFriends
        //处理data[0].ranks
        townRanks.textContent = player.ranks.townRanks.length ? player.ranks.townRanks.join(', ') : '无'
        nationRanks.textContent = player.ranks.nationRanks.length ? player.ranks.nationRanks.join(', ') : '无'
        //处理data[0].friends.*
        const friendsTable = document.querySelector('#friendsList tbody')
        player.friends.forEach(item => {
            friendsTable.insertAdjacentHTML('beforeend', 
                `<tr>
                <td>${playerStats(item.name)}
                <td>${item.uuid}
                </tr>`
            )
        })
        //加载完了，切换刷新状态
        searchButton.innerHTML = '查询玩家具体信息喵!!!'
    })
    .catch(error => {
        alert("没有查询到信息")
        searchButton.innerHTML = '查询玩家具体信息喵!!!'
    })

function playerStats(playerName){
    return `<a href="player.html?search=${playerName}">${playerName}</a>`
}

function townStats(townName) {
    return `<a href="town.html?search=${townName}">${townName}</a>`
}

function nationStats(nationName) {
    return `<a href="nation.html?search=${nationName}">${nationName}</a>`
}

//查询单一玩家
function search() {
    let playerNameInput = document.getElementById('pName').value
    if(playerNameInput == '') {
        alert("在输入框输入城镇名字喵")
    } else {
        window.location.href = `player.html?search=${encodeURIComponent(playerNameInput)}`
    }
}