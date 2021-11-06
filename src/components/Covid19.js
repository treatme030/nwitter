import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
require('dotenv').config()

const Covid19Styles = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    .covid_text {
        color: tomato;
    }
    @media screen and (max-width: 1580px){
        width: 100%;
        max-width: 320px;
    }
`;

const Covid19 = () => {
    const [covidInfo, setCovidInfo] = useState({})

    const fetchData = async () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const currentDate = '' + year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)
        
        const apiKey = process.env.REACT_APP_COVID_API_KEY
        const url = `https://cors.bridged.cc/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${apiKey}&startCreateDt=20210901&endCreateDt=${currentDate}`
        
        try {
            const res = await axios.get(url, {
                headers: {
                    'x-cors-grida-api-key': '4e2ca3b7-6d97-4457-9b5f-ec5b4c7ace28',
                    'Content-Type': 'application/json'
                }
            })
            const covidItem = await res.data.response.body.items.item[0]
            setCovidInfo(covidItem)
        } catch(error){
            console.log(error.message)
        }
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