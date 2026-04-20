**这是一个EMC信息查询工具**

*使用前说明:*

- 由于Earthmc的API有的没有允许跨域，所以直接部署后无法查询到内容，并报错CORS问题，你可以选择把调用API的工作交给后端，也可以使用反向代理让你的服务器中转流量并添加允许跨域的信息，比如把https://api.earthmc.net/v4/players给中转到/api/v4/players上
- 如果你不会以上操作，可以在我的网站上在线使用 [tool.njn18th.xyz](https://tool.njn18th.xyz)

--关于JS中填入API地址的位置    (文件-行数-变量名)
- js-main 第1行    serverInfoURL
- js-playersearch 第30行    serverTownInfoURL
- js-towns 第1行    serverTownInfoURL
- js-townsearch 第60行    serverTownInfoURL
- js-nations 第1行    serverNationInfoURL
- js-nationsearch 第54行 serverTownInfoURL
