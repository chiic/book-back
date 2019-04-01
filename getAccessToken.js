const https = require('https');
const qs = require('querystring');
const fs = require('fs')
const path = require('path')
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'EnAkLSgGoCOwVhgVwnC3NGqO',
    'client_secret': 'kjVoMaYLMMFxPshlXAAWWiXxB13GVVyz'
});
let datas = ''
https.get(
    {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
    },
    function (res) {
        // 在标准输出中查看运行结果
        res.on('data', (chunk) => {
            datas += chunk;
        }).on('end', () => {
            fs.writeFile(path.join(__dirname, 'access_token.json'), datas, (err) =>{
                if(!err) {
                    console.log('写入token成功')
                }
            })
        })
    }
);