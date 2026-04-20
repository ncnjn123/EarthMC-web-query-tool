//获取地址栏中search的城镇信息
const URLString = window.location.search
const URL = new URLSearchParams(URLString)
const townName = URL.get('search')
document.getElementById('tName').value = townName

const booleanMap = {
    "true": "是",
    "false": "否"
}

//给所有HTML含id的信息项一个变量
let tName = document.getElementById('name')
let uuid = document.getElementById('uuid');
let founder = document.getElementById('founder');
let boardText = document.getElementById('boardText')
let wiki = document.getElementById('wiki');
let mayor = document.getElementById('mayor');
let nation = document.getElementById('nation');
let registered = document.getElementById('registered');
let joinedNationAt = document.getElementById('joinedNationAt');
let ruinedAt = document.getElementById('ruinedAt');
let isPublic = document.getElementById('isPublic');
let isOpen = document.getElementById('isOpen');
let isNeutral = document.getElementById('isNeutral');
let Capital = document.getElementById('Capital');
let isOverClaimed = document.getElementById('isOverClaimed');
let hasOverclaimShield = document.getElementById('hasOverclaimShield');
let isRuined = document.getElementById('isRuined');
let isForSale = document.getElementById('isForSale');
let hasNation = document.getElementById('hasNation');
let canOutsidersSpawn = document.getElementById('canOutsidersSpawn');
let numTownBlocks = document.getElementById('numTownBlocks');
let maxTownBlocks = document.getElementById('maxTownBlocks');
let numResidents = document.getElementById('numResidents');
let numTrusted = document.getElementById('numTrusted');
let numOutlaws = document.getElementById('numOutlaws');
let balance = document.getElementById('balance');
let forSalePrice = document.getElementById('forSalePrice');
let pvp = document.getElementById('pvp');
let explosion = document.getElementById('explosion');
let fire = document.getElementById('fire');
let mobs = document.getElementById('mobs');
let spawnX = document.getElementById('spawn-x');
let spawnY = document.getElementById('spawn-y');
let spawnZ = document.getElementById('spawn-z');
let mapLink = document.getElementById('mapLink');
let homeBlock = document.getElementById('homeBlock');
let Councillor = document.getElementById('Councillor');
let Builder = document.getElementById('Builder');
let Recruiter = document.getElementById('Recruiter');
let Police = document.getElementById('Police');
let taxExempt = document.getElementById('Tax-exempt');
let Treasurer = document.getElementById('Treasurer');
let Realtor = document.getElementById('Realtor');
let Settler = document.getElementById('Settler');
let searchButton = document.getElementById('searchButton')


const serverTownInfoURL = '/api/v4/towns'
fetch(serverTownInfoURL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    "query": [townName]
    })
}) 

    .then(response => response.json())
    .then(data => {
        const town = data[0]
        tName.innerHTML = town.name
        uuid.innerHTML = town.uuid
        boardText.innerHTML = town.board
        if(town.wiki === null) {
            wiki.innerHTML = '无'
        } else {
            wiki.innerHTML = `<a href="${town.wiki}"></a>`
        }
        founder.innerHTML = `${playerStats(town.founder)}`
        mayor.innerHTML = `${playerStats(town.mayor.name)}`
        nation.innerHTML = `<a href="nation.html?search=${town.nation.name}">${town.nation.name}</a>`
        let registeredDate = new Date(town.timestamps.registered)
        registered.innerHTML = registeredDate.toDateString('zh-cn')
        let joinedNationDate = new Date(town.timestamps.joinedNationAt)
        joinedNationAt.innerHTML = joinedNationDate.toDateString('zh-cn')
        if(town.timestamps.ruinedAt === null) {
            ruinedAt.parentElement.remove()
        } else {
            let ruinedTime = town.timestamps.ruinedAt
            ruinedAt.innerHTML = ruinedTime.toDateString('zh-cn')
        }
        //处理data[0].status.*
        isPublic.innerHTML = booleanMap[town.status.isPublic]
        isOpen.innerHTML = booleanMap[town.status.isOpen]
        isNeutral.innerHTML = booleanMap[town.status.isNeutral]
        Capital.innerHTML = booleanMap[town.status.isCapital]
        isOverClaimed.innerHTML = booleanMap[town.status.isOverClaimed]
        hasOverclaimShield.innerHTML = booleanMap[town.status.hasOverclaimShield]
        isRuined.innerHTML = booleanMap[town.status.isRuined]
        isForSale.innerHTML = booleanMap[town.status.isForSale]
        hasNation.innerHTML = booleanMap[town.status.hasNation]
        hasOverclaimShield.innerHTML = booleanMap[town.status.hasOverclaimShield]
        canOutsidersSpawn.innerHTML = booleanMap[town.status.canOutsidersSpawn]
        //处理data[0].stats.*
        numTownBlocks.innerHTML = town.stats.numTownBlocks
        maxTownBlocks.innerHTML = town.stats.maxTownBlocks
        numResidents.innerHTML = town.stats.numResidents
        numTrusted.innerHTML = town.stats.numTrusted
        numOutlaws.innerHTML = town.stats.numOutlaws
        balance.innerHTML = town.stats.balance
        if(town.stats.forSalePrice == null) {
            forSalePrice.parentElement.remove()
        } else {
        forSalePrice.innerHTML = town.stats.forSalePrice
        }
        //处理data[0].perms.flags.*
        pvp.innerHTML = booleanMap[town.perms.flags.pvp]
        explosion.innerHTML = booleanMap[town.perms.flags.explosion]
        fire.innerHTML = booleanMap[town.perms.flags.fire]
        mobs.innerHTML = booleanMap[town.perms.flags.mobs]
        //处理data[0].coordinates.*
        spawnX.innerHTML = Math.floor(town.coordinates.spawn.x)
        spawnY.innerHTML = Math.floor(town.coordinates.spawn.y)
        spawnZ.innerHTML = Math.floor(town.coordinates.spawn.z)
        homeBlock.innerHTML = `(${town.coordinates.homeBlock[0]} , ${town.coordinates.homeBlock[1]})`
        mapLink.href = `https://map.earthmc.net/?world=minecraft_overworld&zoom=5&x=${Math.floor(town.coordinates.spawn.x)}&z=${Math.floor(town.coordinates.spawn.z)}`
        //处理data[0].residents.*
        const residentsTable = document.querySelector('#residentsTable tbody')
        town.residents.forEach(item => {
            residentsTable.insertAdjacentHTML ('beforeend',
                `<tr>
                <td>${playerStats(item.name)}</td>
                <td>${item.uuid}</td>
                </tr>`
            )
        });

        Councillor.innerHTML = town.ranks.Councillor.length ? town.ranks.Councillor.join(', ') : '无'
        Builder.innerHTML = town.ranks.Builder.length ? town.ranks.Builder.join(', ') : '无'
        Recruiter.innerHTML = town.ranks.Recruiter.length ? town.ranks.Recruiter.join(', ') : '无'
        Police.innerHTML = town.ranks.Police.length ? town.ranks.Police.join(', ') : '无'
        taxExempt.innerHTML = town.ranks['Tax-exempt'].length ? town.ranks['Tax-exempt'].join(', ') : '无';
        Treasurer.innerHTML = town.ranks.Treasurer.length ? town.ranks.Treasurer.join(', ') : '无'
        Realtor.innerHTML = town.ranks.Realtor.length ? town.ranks.Realtor.join(', ') : '无'
        Settler.innerHTML = town.ranks.Settler.length ? town.ranks.Settler.join(', ') : '无'

        //加载完了，切换刷新状态
        searchButton.innerHTML = '查询城镇具体信息喵!!!'
    })
    .catch(error => {
        alert("没有查询到信息")
        searchButton.innerHTML = '查询城镇具体信息喵!!!'
    })



//自动生成玩家查询链接
function playerStats(playerName){
    return `<a href="player.html?search=${playerName}">${playerName}</a>`
}


//查询单一城镇
function search() {
    let townNameInput = document.getElementById('tName').value
    if(townNameInput == '') {
        alert("在输入框输入城镇名字喵")
    } else {
        window.location.href = `town.html?search=${encodeURIComponent(townNameInput)}`
    }
}