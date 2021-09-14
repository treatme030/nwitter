import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Covid19 = () => {
    const [confirmedData, setComfirmedData] = useState({})

    const getData = async () => {
        const res = await axios('https://api.covid19api.com/dayone/country/south-korea')
        makeData(res.data)
    }

    const makeData = (items) => {
        const arr = items.map((item) => {
            const currentDate = new Date(item.Date)
            const year = currentDate.getFullYear()
            const month = currentDate.getMonth() + 1
            const date = currentDate.getDate()
            const confirmed = item.Confirmed
            const active = item.Active
            const death = item.Deaths
            const id = item.ID

            item = { id, year, month, date, confirmed, active, death }
            return item;
        }).filter((item) => {
            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth()
            const date = today.getDate()
            return item.year === year && item.month === month && item.date === date
        })
        setComfirmedData(...arr)
    }

    useEffect(() => {
        getData()
    },[])

    const { active, confirmed, death } = confirmedData
    return (
        <section>
            <h3><span style={{color: 'tomato'}}>COVID-19</span> 현재 상황</h3>
            <ul>
                <li>
                    <span>발생자: {active}명</span>
                </li>
                <li>
                    <span>누적확진자: {confirmed}명</span>
                </li>
                <li>
                    <span>사망자: {death}명</span>
                </li>
            </ul>
        </section>
    );
};

export default Covid19;