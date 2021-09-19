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

const Covid19 = () => {
    const [covidInfo, setCovidInfo] = useState({})

    const fetchData = async () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const currentDate = year + (month < 10 ? `-0${month}` : `-${month}`) + (day < 10 ? `-0${day}` : `-${day}`)
        
        const url = 'https://api.covid19api.com/live/country/south-korea/status/confirmed'
        const response = await axios.get(url)

        const covidItem = response.data.map((list) => {
            return (
                {
                    Confirmed: list.Confirmed,
                    Date: list.Date,
                    Deaths: list.Deaths,
                }
            )
        }).filter((item) => {
            const covidDate = item.Date.slice(0, 10)
            return covidDate === currentDate
        })
        setCovidInfo(covidItem[0])
    }

    useEffect(() => {
        fetchData()
    },[])

    const { Confirmed, Deaths } = covidInfo
    return (
        <Covid19Styles>
            <h3><span className="covid_text">COVID-19</span> 현재 상황</h3>
            <ul>
                <li>
                    <span>누적확진자: {Confirmed}명</span>
                </li>
                <li>
                    <span>사망자: {Deaths}명</span>
                </li>
            </ul>
        </Covid19Styles>
    );
};

export default Covid19;