const serverInfoURL = '/api/v4'
let moonPhaseIndex
let mcStartTime
let dateChar
let startTime = Math.floor((Date.now())/1000)                   //获取现实基准时间
const mcMoonPhase = {
    "FULL_MOON": 0,
    "WANING_GIBBOUS": 1,
    "LAST_QUARTER": 2,
    "WANING_CRESCENT": 3,
    "NEW_MOON": 4,
    "WAXING_CRESCENT": 5,
    "FIRST_QUARTER": 6,
    "WAXING_GIBBOUS": 7
}
const moonPhaseTranslated = ["满月", "亏凸月", "下弦月", "残月", "新月", "娥眉月", "上弦月", "盈凸月"];

const booleanMap = {
    "true": "是",
    "false": "否"
}

let currentVersion = document.getElementById("currentVersion")  //当前版本
let onlinePlayers = document.getElementById("onlinePlayers")    //在线玩家
let maxPlayers = document.getElementById("maxPlayers")          //最大玩家
let vpRemains = document.getElementById("vpRemains")            //VoteParty剩余
let date = document.getElementById("date")                      //服务器天数（第xx天)
let time = document.getElementById("time")                      //当日时间（从0:00开始计算)
let dayProgressBar = document.getElementById("dayProgressBar")  //时间进度条
let moonPhase = document.getElementById("moonPhase")            //当日月相
let hasStorm = document.getElementById("hasStorm")              //是否下雨
let isThundering = document.getElementById("isThundering")      //是否打雷
let numResidents = document.getElementById("numResidents")      //被Towny登记的玩家
let numNomads = document.getElementById("numNomads")            //无城镇玩家
let numOnlineNomads = document.getElementById("numOnlineNomads")//在线无城镇玩家
let numTowns = document.getElementById("numTowns")              //城镇总数
let numNations = document.getElementById("numNations")          //国家总数
let refreshingStatus = document.getElementById("refreshingStatus")
const moonPhaseKeys = Object.keys(mcMoonPhase);                 //当前月相的顺序编号（从满月为0开始）

fetch(serverInfoURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        currentVersion.innerHTML = data.version;
        onlinePlayers.innerHTML = data.stats.numOnlinePlayers;
        maxPlayers.innerHTML = data.stats.maxPlayers;
        vpRemains.innerHTML = data.voteParty.numRemaining;
        date.innerHTML = `第${Math.floor(data.stats.fullTime/24000) + 1}天`;
        dateChar = Math.floor(data.stats.fullTime/24000) + 1
        time.innerHTML = `${Math.floor(data.stats.time/20)}`;
        dayProgressBar.value = Math.floor(data.stats.time/20);
        mcStartTime = Math.floor(data.stats.time/20);
        moonPhaseIndex = moonPhaseKeys.indexOf(data.moonPhase);
        moonPhase.innerHTML = moonPhaseTranslated[moonPhaseIndex];
        hasStorm.innerHTML = booleanMap[data.status.hasStorm];
        isThundering.innerHTML = booleanMap[data.status.isThundering];
        numResidents.innerHTML = data.stats.numResidents;
        numNomads.innerHTML = data.stats.numNomads;
        numOnlineNomads.innerHTML = data.stats.numOnlineNomads;
        numTowns.innerHTML = data.stats.numTowns;
        numNations.innerHTML = data.stats.numNations;

        //时间自动流逝

function timer() {
    let currentTime = Math.floor((Date.now())/1000)             //获取实时时间
    let elapsedTime = currentTime - startTime                   //获取流逝的时间
    let newMinecraftTime = mcStartTime + elapsedTime            //用 Minecraft 初始时间 + 现实流逝的时间 获取Minecraft实时时间
    //处理一天进位情况
    if (newMinecraftTime < 1200) {
        time.innerHTML = newMinecraftTime
        dayProgressBar.value = newMinecraftTime
        }else {
            dateChar = dateChar + 1
            date.innerHTML = `第${dateChar}天`
            startTime = startTime + 1200
            time.innerHTML = newMinecraftTime
            dayProgressBar.value = newMinecraftTime
            time.innerHTML = newMinecraftTime
            moonPhaseIndex = (moonPhaseIndex + 1) % 8
            moonPhase.innerHTML = moonPhaseTranslated[moonPhaseIndex]
            console.log('跳过了一天喵')
    }
    console.log (`测试用: mcStartTime = ${mcStartTime}, startTime = ${startTime}, elapsedTime =${elapsedTime}, newMCTime = ${newMinecraftTime}`)
    refreshingStatus.innerHTML = ''
}


let intervalID = setInterval(timer, 1000);

    })
/*

//时间自动流逝

function timer() {
    let currentTime = Math.floor((Date.now())/1000)             //获取实时时间
    let elapsedTime = currentTime - startTime                   //获取流逝的时间
    let newMinecraftTime = mcStartTime + elapsedTime            //用 Minecraft 初始时间 + 现实流逝的时间 获取Minecraft实时时间
    //处理一天进位情况
    if (newMinecraftTime < 1200) {
        time.innerHTML = newMinecraftTime
        dayProgressBar.value = newMinecraftTime
        }else {
            dateChar = dateChar + 1
            date.innerHTML = `第${dateChar}天`
            startTime = startTime + 1200
            time.innerHTML = newMinecraftTime
            dayProgressBar.value = newMinecraftTime
            time.innerHTML = newMinecraftTime
            moonPhaseIndex = (moonPhaseIndex + 1) % 8
            moonPhase.innerHTML = moonPhaseTranslated[moonPhaseIndex]
            console.log('跳过了一天喵')
    }
    console.log (`测试用: mcStartTime = ${mcStartTime}, startTime = ${startTime}, elapsedTime =${elapsedTime}, newMCTime = ${newMinecraftTime}`)
}


let intervalID = setInterval(timer, 1000);
*/