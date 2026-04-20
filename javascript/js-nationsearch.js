//获取地址栏中search的城镇信息
const URLString = window.location.search
const URL = new URLSearchParams(URLString)
const nName = URL.get('search')
document.getElementById('nName').value = nName

const booleanMap = {
    "true": "是",
    "false": "否"
}

//给所有HTML含id的信息项一个变量
let nationName = document.getElementById('name');
let uuid = document.getElementById('uuid');
let king = document.getElementById('king');
let capital = document.getElementById('capital');
let boardText = document.getElementById('boardText');
let dynmapColour = document.getElementById('dynmapColour');
let wiki = document.getElementById('wiki');
let registered = document.getElementById('registered');
let isPublic = document.getElementById('isPublic');
let isOpen = document.getElementById('isOpen');
let isNeutral = document.getElementById('isNeutral');
let numTownBlocks = document.getElementById('numTownBlocks');
let numResidents = document.getElementById('numResidents');
let numTowns = document.getElementById('numTowns');
let numAllies = document.getElementById('numAllies');
let numEnemies = document.getElementById('numEnemies');
let balance = document.getElementById('balance');
let spawnX = document.getElementById('spawn-x');
let spawnY = document.getElementById('spawn-y');
let spawnZ = document.getElementById('spawn-z');
let mapLink = document.getElementById('mapLink')
let Chancellor = document.getElementById('Chancellor');
let Colonist = document.getElementById('Colonist');
let Diplomat = document.getElementById('Diplomat');
let searchButton = document.getElementById('searchButton');
let townsTableButton = document.getElementById('townsTableButton');
let residentsButton = document.getElementById('residentsButton');
let alliesButton = document.getElementById('alliesButton');
let enemiesButton = document.getElementById('enemiesButton');
let townsTable = document.getElementById('townsTable');
let residentsTable = document.getElementById('residentsTable');
let alliesTable = document.getElementById('alliesTable');
let enemiesTable = document.getElementById('enemiesTable');
let townsTbody = document.querySelector('#townsTable tbody');
let residentsTbody = document.querySelector('#residentsTable tbody');
let alliesTbody = document.querySelector('#alliesTable tbody');
let enemiesTbody = document.querySelector('#enemiesTable tbody');
let tempedTable = 0


//EarthMC API地址(先注释一下，开服后取消注释)
const serverTownInfoURL = '/api/v4/nations'
fetch(serverTownInfoURL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    "query": [nName]
    })
}) 

    .then(response => response.json())
    .then(data => {
        const nation = data[0]
        nationName.innerHTML = nation.name
        uuid.innerHTML = nation.uuid
        boardText.innerHTML = nation.board
        if(nation.wiki === null) {
            wiki.innerHTML = '无'
        } else {
            wiki.innerHTML = `<a href="${nation.wiki}"></a>`
        }
        king.innerHTML = `${playerStats(nation.king.name)}`
        capital.innerHTML = `${townStats(nation.capital.name)}`
        dynmapColour.style.backgroundColor = `#${nation.dynmapColour}`
        dynmapColour.style.border = `#${nation.dynmapOutline} solid`
        let registeredDate = new Date(nation.timestamps.registered)
        registered.innerHTML = registeredDate.toDateString('zh-cn')
        //处理nation[0].status.*
        isPublic.innerHTML = booleanMap[nation.status.isPublic]
        isOpen.innerHTML = booleanMap[nation.status.isOpen]
        isNeutral.innerHTML = booleanMap[nation.status.isNeutral]
        //处理nation[0].stats.*
        numTownBlocks.innerHTML = nation.stats.numTownBlocks
        numResidents.innerHTML = nation.stats.numResidents
        numTowns.innerHTML = nation.stats.numTowns
        numAllies.innerHTML = nation.stats.numAllies
        numEnemies.innerHTML = nation.stats.numEnemies
        balance.innerHTML = nation.stats.balance
        //处理nation[0].coordinates
        spawnX.innerHTML = Math.floor(nation.coordinates.spawn.x)
        spawnY.innerHTML = Math.floor(nation.coordinates.spawn.y)
        spawnZ.innerHTML = Math.floor(nation.coordinates.spawn.z)
        mapLink.href = `https://map.earthmc.net/?world=minecraft_overworld&zoom=5&x=${Math.floor(nation.coordinates.spawn.x)}&z=${Math.floor(nation.coordinates.spawn.z)}`
        //处理nation[0].ranks
        Chancellor.innerHTML = nation.ranks.Chancellor.length ? nation.ranks.Chancellor.join(', ') : '无'
        Colonist.innerHTML = nation.ranks.Colonist.length ? nation.ranks.Colonist.join(', ') : '无'
        Diplomat.innerHTML = nation.ranks.Diplomat.length ? nation.ranks.Diplomat.join(', ') : '无'
        //处理下属城镇表格
        const townsTable = document.querySelector('#townsTable tbody')
        nation.towns.forEach(item => {
            townsTable.insertAdjacentHTML ('beforeend',
                `<tr>
                <td>${playerStats(item.name)}</td>
                <td>${item.uuid}</td>
                </tr>`
            )
        });
        //处理盟友表格
        const alliesTable = document.querySelector('#alliesTable tbody')
        nation.allies.forEach(item => {
            alliesTable.insertAdjacentHTML ('beforeend',
                `<tr>
                <td>${nationStats(item.name)}</td>
                <td>${item.uuid}</td>
                </tr>`
            )
        });
        //处理敌国表格
        const enemiesTable = document.querySelector('#enemiesTable tbody')
        nation.enemies.forEach(item => {
            enemiesTable.insertAdjacentHTML ('beforeend',
                `<tr>
                <td>${nationStats(item.name)}</td>
                <td>${item.uuid}</td>
                </tr>`
            )
        });
        //加载完了，切换刷新状态
        searchButton.innerHTML = '查询国家具体信息喵!!!'
    })
    .catch(error => {
        alert("没有查询到信息")
        searchButton.innerHTML = '查询国家具体信息喵!!!'
    })

//自动生成玩家查询链接
function playerStats(playerName){
    return `<a href="player.html?search=${playerName}">${playerName}</a>`
}

function townStats(townName) {
    return `<a href="town.html?search=${townName}">${townName}</a>`
}

function nationStats(nationName) {
    return `<a href="nation.html?search=${nationName}">${nationName}</a>`
}

//查询单一国家
function search() {
    let nationNameInput = document.getElementById('nName').value
    if(nationNameInput == '') {
        alert("在输入框输入国家名字喵")
    } else {
        window.location.href = `town.html?search=${encodeURIComponent(nationNameInput)}`
    }
}