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
        
        // 좌표 정보를 출력합니다.
        console.log('주소:', address);
        console.log('좌표:', response.data.addresses[0].x, response.data.addresses[0].y);
    } catch (error) {
        console.error('Geocode 요청 중 에러 발생:', error);
    }
}

// 테스트할 주소를 입력합니다.
const testAddress = '강원도 강릉시 금성로 21';

// geocode 함수를 호출하여 주소를 좌표로 변환합니다.
geocode(testAddress);
