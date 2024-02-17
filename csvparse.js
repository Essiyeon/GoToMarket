const fs = require('fs');
const Papa = require('papaparse');
const axios = require('axios');

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
        
        return { address, x: response.data.addresses[0].x, y: response.data.addresses[0].y };
    } catch (error) {
        console.error('Geocode 요청 중 에러 발생:', error);
        return null;
    }
}

async function main() {
    try {
        const csvFilePath = 'C:\\marketWeb\\GoToMarket\\somemarkets.csv';
        const csvData = fs.readFileSync(csvFilePath, 'utf8');
        const parsedData = Papa.parse(csvData, { header: true });

        const geocodedAddresses = [];
        for (const row of parsedData.data) {
            const address = row['address'];
            if (address) {
                const geocodedAddress = await geocode(address);
                if (geocodedAddress) {
                    geocodedAddresses.push(geocodedAddress);
                }
            }
        }

        console.log('좌표 정보:', geocodedAddresses);
    } catch (error) {
        console.error('파일 읽기 중 에러 발생:', error);
    }
}

// 메인 함수 실행
main();
