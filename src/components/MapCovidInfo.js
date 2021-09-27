import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapCovidInfoStyles = styled.div`
    width: 100%;
    color: black;
    h3 {
        margin-bottom: 2rem;
        color: #fff;
        span {
            color: tomato;
        }
    }
    #map {
        width: 100%;
        height: 400px;
        border-radius: 10px;
    }
    @media screen and (max-width: 1580px){
        max-width: 320px
    }
`;

const MapCovidInfo = () => {
    const [sidoCovidArr, setSidoCovidArr] = useState([])
    const getData = async () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const currentDate = year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)

        const apiKey = process.env.REACT_APP_COVID_API_KEY
        const url = `https://cors.bridged.cc/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${apiKey}&startCreateDt=20210901&endCreateDt=${currentDate}`
    
        const res = await axios.get(url)
        const arr = res.data.response.body.items.item.slice(1, 18)
        setSidoCovidArr([...arr])
    }

    const { kakao } = window
    useEffect(() => {
        getData()
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.566653, 126.978413), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 
        let points = [
            new kakao.maps.LatLng(37.48740382975868, 130.9057794769368),
            new kakao.maps.LatLng(37.6658724920564, 125.69498504428952),
            new kakao.maps.LatLng(33.489977380111256, 126.5001984944947)
        ];

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        let bounds = new kakao.maps.LatLngBounds();    

        for (let i = 0; i < points.length; i++) {
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
        }

        function setBounds() {
            // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
            map.setBounds(bounds);
        }
        setBounds()
        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        let mapTypeControl = new kakao.maps.MapTypeControl();
        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); 
        
        // 마커를 표시할 위치와 title 객체 배열입니다 
        let positions = [
            {
                content: `제주도`,
                latlng: new kakao.maps.LatLng(33.489977380111256, 126.5001984944947)
            },
            {
                content: `창원`,
                latlng: new kakao.maps.LatLng(35.238316768933984, 128.6924301850832)
            },            {
                content: `포항`,
                latlng: new kakao.maps.LatLng(36.019363811486876, 129.34324465431195)
            },
            {
                content: `목포`,
                latlng: new kakao.maps.LatLng(34.812031680410634, 126.39216578313166)
            },
            {
                content: `전주`,
                latlng: new kakao.maps.LatLng(35.82438456047146, 127.14801122732177)
            },
            {
                content: `천안`,
                latlng: new kakao.maps.LatLng(36.815369177678996, 127.11382952557865)
            },
            {
                content: `충주`,
                latlng: new kakao.maps.LatLng(36.9925629912894, 127.9255784951379)
            },
            {
                content: `강릉`,
                latlng: new kakao.maps.LatLng(37.75214937260467, 128.87598458501782)
            },
            {
                content: `경기도`,
                latlng: new kakao.maps.LatLng(37.27507722658434, 127.00916864083456)
            },
            {
                content: `세종`,
                latlng: new kakao.maps.LatLng(36.480304412943376, 127.28877552733007)
            },
            {
                content: `울산`,
                latlng: new kakao.maps.LatLng(35.546076074232346, 129.3110561054897)
            },
            {
                content: `대전`,
                latlng: new kakao.maps.LatLng(36.35063814232123, 127.38473286781019)
            },
            {
                content: `광주`,
                latlng: new kakao.maps.LatLng(35.16024323514698, 126.85147579847768)
            },
            {
                content: `인천`,
                latlng: new kakao.maps.LatLng(37.456104873895136, 126.70588638718482)
            },
            {
                content: `대구`,
                latlng: new kakao.maps.LatLng(35.87155237694022, 128.60176082732227)
            },
            {
                content: `부산`,
                latlng: new kakao.maps.LatLng(35.17992415245297, 129.07496758980167)
            },
            {
                content: `서울`,
                latlng: new kakao.maps.LatLng(37.566653, 126.978413)
            },
        ];
        
        for (let i = 0; i < positions.length; i ++) {
                       
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
            });
            let infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content + `/ 전일대비 증감수: ${sidoCovidArr[i].incDec}명`// 인포윈도우에 표시할 내용
            });
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
    },[])

    return (
        <MapCovidInfoStyles>
            <h3><span>COVID-19</span> 지역별 현재상황</h3>
            <div id="map"></div>
        </MapCovidInfoStyles>
    );
};

export default MapCovidInfo;