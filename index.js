const express = require("express");
const fs = require('fs');
const Papa = require('papaparse');
const axios = require("axios");

const app = express();
const port = process.env.PORT || 80;

app.use(express.static("public_html"));

async function geocode(address) {
    try {
        const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
            params: {
                query: address,
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': 't75lm1s2nf',
                'X-NCP-APIGW-API-KEY': 'xwfn5VmFcTAlPU5lO9wG2aMsXwcQD0vDG4QJtdog',
            },
        });
        
        const geocodedAddress = { address, x: response.data.addresses[0].x, y: response.data.addresses[0].y };
        console.log("주소:", address, "좌표로 변경됨:", geocodedAddress);
        return geocodedAddress;
    } catch (error) {
        console.error('Geocode 요청 중 에러 발생:', error);
        return null;
    }
}

app.get("/loadData", async (req, res) => {
    try {
        const csvFilePath = 'C:\\marketWeb\\GoToMarket\\littlemarket.csv';
        const csvData = fs.readFileSync(csvFilePath, 'utf8');
        const parsedData = Papa.parse(csvData, { header: true });

        const geocodedAddresses = [];
        for (const row of parsedData.data) {
            const address = row['oldaddress'];
            const name = row['name']; // 추가 필드 가져오기
            const kind = row['kind']; 
            const restroom = row['restroom'];
            const parking = row['parking']
            if (address) {
                const geocodedAddress = await geocode(address);
                if (geocodedAddress) {
                    const combinedData = { ...geocodedAddress, name, kind, restroom, parking};
                    geocodedAddresses.push(combinedData);
                    console.log("추가 데이터:", combinedData);
                }
            }
        }

        res.json(geocodedAddresses); // 좌표 정보를 JSON 형태로 반환
    } catch (error) {
        console.error('마커 정보를 불러오는 중 에러 발생:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, function() {
    console.log("HTML 서버시작됨");
});
