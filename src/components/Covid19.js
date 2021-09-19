import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
require('dotenv').config()

const Covid19Styles = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    margin-top: 2rem;
    .covid_text {
        color: tomato;
    }
`;

const apiKey = process.env.REACT_APP_COVID_API_KEY
const covidUrl = process.env.REACT_APP_COVID_URL

const Covid19 = () => {
    const [covidInfo, setCovidInfo] = useState({})

    const fetchData = async () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const date = year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)

        //브라우저의 CORS 이슈 해결하기 위해 'https://cors-anywhere.herokuapp.com/' 사용 
        //Response Headers에 Access-Control-Allow-Origin:*가 생성되어 응답 이루어짐 
        //당일 데이터만 가져오기
        const url = `https://cors-anywhere.herokuapp.com/${covidUrl}serviceKey=${apiKey}&startCreateDt=${date}&endCreateDt=${date}`
        const response = await axios.get(url)
        const { decideCnt, deathCnt} = response.data.response.body.items.item
        const covidItem = { decideCnt, deathCnt}
       
        setCovidInfo(covidItem)
    }

    useEffect(() => {
        fetchData()
    },[])

    const { decideCnt, deathCnt } = covidInfo
    return (
        <Covid19Styles>
            <h3><span className="covid_text">COVID-19</span> 현재 상황</h3>
            <ul>
                <li>
                    <span>누적확진자: {decideCnt}명</span>
                </li>
                <li>
                    <span>사망자: {deathCnt}명</span>
                </li>
            </ul>
        </Covid19Styles>
    );
};

export default Covid19;