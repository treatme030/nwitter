import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import positions from '../assets/covidePositionData';

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

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const now = year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)

    const apiKey = process.env.REACT_APP_COVID_API_KEY
    const url = `https://cors.bridged.cc/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${apiKey}&startCreateDt=20210901&endCreateDt=${now}`

    // useEffect(() => {
    //     const sidoData = async () => {
    //         const res = await axios.get(url)
    //         console.log(res.data.response)
    //     }
    //     sidoData()
    // },[])

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
    
    const { kakao } = window
    
    // useEffect(() => {
    //     const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    //     const options = { //지도를 생성할 때 필요한 기본 옵션
    //         center: new kakao.maps.LatLng(37.566653, 126.978413), //지도의 중심좌표.
    //         level: 5 //지도의 레벨(확대, 축소 정도)
    //     };
    //     const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //     // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 
    //     let points = [
    //         new kakao.maps.LatLng(37.48740382975868, 129.9057794769368),
    //         new kakao.maps.LatLng(37.6658724920564, 125.69498504428952),
    //         new kakao.maps.LatLng(35.489977380111256, 126.5001984944947)
    //     ];

    //     // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    //     let bounds = new kakao.maps.LatLngBounds();    

    //     for (let i = 0; i < points.length; i++) {
    //         // LatLngBounds 객체에 좌표를 추가합니다
    //         bounds.extend(points[i]);
    //     }

    //     function setBounds() {
    //         // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    //         // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    //         map.setBounds(bounds);
    //     }
    //     setBounds()
    //     // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    //     let mapTypeControl = new kakao.maps.MapTypeControl();
    //     // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    //     // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    //     map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    //     // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    //     let zoomControl = new kakao.maps.ZoomControl();
    //     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); 
        
    //     //위치에 따른 마커 표시하기 
    //     for (let i = 0; i < positions.length; i ++) {
                       
    //         // 마커를 생성합니다
    //         let marker = new kakao.maps.Marker({
    //             map: map, // 마커를 표시할 지도
    //             position: positions[i].latlng, // 마커를 표시할 위치
    //         });
    //         let infowindow = new kakao.maps.InfoWindow({
    //             content: positions[i].content + `/ 전일대비 증감수: 명`// 인포윈도우에 표시할 내용
    //         });
    //         kakao.maps.event.addListener(marker, 'mouseover', () => {
    //             makeOverListener(map, marker, infowindow)
    //             marker.setImage()
    //         });
    //         kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    //     }
    // },[])

    return (
        <MapCovidInfoStyles>
            <h3><span>COVID-19</span> 지역별 현재상황</h3>
            <div id="map"></div>
        </MapCovidInfoStyles>
    );
};

export default MapCovidInfo;