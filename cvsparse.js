const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = "C:\\marketWeb\\allmarket.csv";

// CSV ������ �о���� "address" ���� �����ϴ� �Լ�
function extractAddressesFromCSV(csvFilePath) {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("������ �о�� �� �����ϴ�.", err);
            return;
        }
        
        Papa.parse(data, {
            header: true,
            complete: function(results) {
                // CSV�� �� ���� �ݺ��Ͽ� "address" ���� ���� ����
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

// �Լ� ȣ��
extractAddressesFromCSV(csvFilePath);
