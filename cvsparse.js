const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = "C:\\marketWeb\\allmarket.csv";

// CSV 파일을 읽어오고 "address" 열을 추출하는 함수
function extractAddressesFromCSV(csvFilePath) {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("파일을 읽어올 수 없습니다.", err);
            return;
        }
        
        Papa.parse(data, {
            header: true,
            complete: function(results) {
                // CSV의 각 행을 반복하여 "address" 열의 값을 추출
                results.data.forEach(row => {
                    const address = row['address'];
                    if (address) {
                        console.log(address);
                    }
                });
            }
        });
    });
}

// 함수 호출
extractAddressesFromCSV(csvFilePath);
