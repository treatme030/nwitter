import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const API_KEY = `5b0F6eLuRqzepcbIIpbyzM59z%2B4rjt706hQ9Xv8frg97OKAelP2BoGUrjwF9bJg29xoytPMuCppi8XOsWaUBWw%3D%3D`
const url = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&startCreateDt=20210901&endCreateDt=20210916`

const Covid19 = () => {
    const [covidInfo, setCovidInfo] = useState({})

    const fetchData = async () => {
        const res = await axios.get(url)
        const data = res.data.response.body.items.item
        const covidLists = data.map((list) => {
            const currentDate = new Date(list.createDt)
            const year = currentDate.getFullYear()
            const month = currentDate.getMonth() + 1
            const day = currentDate.getDate()
            const { decideCnt, deathCnt} = list 

            return(
                {
                    decideCnt,
                    deathCnt,
                    year,
                    month,
                    day
                }
            )
        }).filter((list) => {
            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth() + 1 
            const day = today.getDate()
            return list.year === year && list.month === month && list.day === day
        })
        setCovidInfo(...covidLists)
        //decideCnt총 확진자 , deathCnt, stateDt
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