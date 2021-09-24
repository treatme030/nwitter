import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapCovidInfoStyles = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 8rem auto;
    text-align: center;
    color: black;
    h1 {
        margin-bottom: 2rem;
        color: #fff;
        span {
            color: tomato;
        }
    }
    #map {
        width: 600px;
        height: 600px;
    }
`;

const MapCovidInfo = () => {

    const { kakao } = window
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.566653, 126.978413), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 
        let points = [
            new kakao.maps.LatLng(37.566653, 126.978413),
            new kakao.maps.LatLng(33.452671, 126.574792),
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
                content: `<span>서울</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(37.566653, 126.978413)
            },
            {
                content: `<span>인천</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(37.456104873895136, 126.70588638718482)
            },
            {
                content: `<span>경기도</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(37.27507722658434, 127.00916864083456)
            },
            {
                content: `<span>강릉</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(37.75214937260467, 128.87598458501782)
            },
            {
                content: `<span>세종</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(36.480304412943376, 127.28877552733007)
            },
            {
                content: `<span>대전</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(36.35063814232123, 127.38473286781019)
            },
            {
                content: `<span>전주</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(35.82438456047146, 127.14801122732177)
            },
            {
                content: `<span>광주</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(35.16024323514698, 126.85147579847768)
            },
            {
                content: `<span>충주</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(36.9925629912894, 127.9255784951379)
            },
            {
                content: `<span>목포</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(34.812031680410634, 126.39216578313166)
            },
            {
                content: `<span>대구</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(35.87155237694022, 128.60176082732227)
            },
            {
                content: `<span>울산</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(35.546076074232346, 129.3110561054897)
            },
            {
                content: `<span>포항</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(36.019363811486876, 129.34324465431195)
            },
            {
                content: `<span>부산</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(35.17992415245297, 129.07496758980167)
            },
            {
                content: `<span>제주도</span><span> 확진자수: 10명</span>`,
                latlng: new kakao.maps.LatLng(33.489977380111256, 126.5001984944947)
            },
        ];

        for (let i = 0; i < positions.length; i ++) {
                        
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
            });
            let infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content // 인포윈도우에 표시할 내용
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
            <h1><span>COVID-19</span> 지역별 현재상황</h1>
            <div id="map"></div>
        </MapCovidInfoStyles>
    );
};

export default MapCovidInfo;