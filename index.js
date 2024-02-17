const express = require("express");
const fs = require('fs');
const Papa = require('papaparse');
const axios = require("axios");

const app = express();
const port = process.env.PORT || 80;

app.use(express.static("public_html"));

// CSV 파일 경로
const csvFilePath = "C:\\marketWeb\\GoToMarket\\allmarket.csv";

// CSV 파일을 읽어와서 주소를 좌표로 변환하고 지도에 마커 표시
app.get("/loadData", async (req, res) => {
    try {
      const data = fs.readFileSync(csvFilePath, "utf8");
      const results = Papa.parse(data, { header: true });
  
      const markers = [];
  
      for (const row of results.data) {
        const address = row["address"];
        if (address) {
          const geocodeResponse = await axios.get(
            "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
            {
              params: {
                query: address,
                coordinate: "37.5666805, 126.9784147",
              },
              headers: {
                "X-NCP-APIGW-API-KEY-ID": "t75lm1s2nf",
                "X-NCP-APIGW-API-KEY": "xwfn5VmFcTAlPU5lO9wG2aMsXwcQD0vDG4QJtdog",
              },
            }
          );
  
        
          const coords = geocodeResponse.data.addresses[0];
            if (coords) {
                const lat = coords.x; // 위도
                const lng = coords.y; // 경도
                markers.push({ address, latlng: { x: lng, y: lat } });
            } else {
                console.error(`주소 ${address}에 대한 좌표 정보를 찾을 수 없습니다.`);
            }

        }
      }
  
      res.json(markers);
    } catch (error) {
      console.error("마커 정보를 불러오는 중 에러 발생:", error);
      res.status(500).send("Internal Server Error");
    }
});
  
app.listen(port, function() {
    console.log("HTML 서버시작됨");
});