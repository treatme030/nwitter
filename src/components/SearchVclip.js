import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vclip from './Vclip';
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components';

const SearchVclipStyles = styled.div`
    position: relative;
    input {
        width: 100%;
        margin-bottom: 3rem;
        height: 40px;
        padding: 0 2rem;
        color: #fff;
        border: 1px solid #04aaff;
        border-radius: 20px;
        font-weight: 500;
        font-size: 1.2rem;
    }
    button {
        position: absolute;
        right: 0;
        background-color: #04aaff;
        height: 40px;
        width: 40px;
        padding: 1rem 0;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
    }
    @media screen and (max-width: 1580px){
        max-width: 320px
    }
`;

const SearchVclip = () => {
    const [searchText, setSearchText] = useState('인기동영상')
    const [showClip, setShowClip] = useState(false)
    const [clipList, setClipList] = useState([])

    const getData = async () => {
    
        const res = await axios.get(`https://dapi.kakao.com/v2/search/vclip?sort=recency&query=${searchText}&size=8`, {headers: {
            'Authorization': `KakaoAK 02477af3acbf4464ea0dab3efe375cba`
        }})
        setClipList(res.data.documents)
        setShowClip(true)
    }

    useEffect(() => {
        getData()
    },[])

    const changeHandler = (e) => {
        const { value } = e.target 
        setSearchText(value)
    }

    return (
        <SearchVclipStyles>
            <input type="text" placeholder="키워드를 입력하세요." value={searchText} onChange={changeHandler}/>
            <button onClick={getData}>
                <FiSearch size="3ex"/>
            </button>
            { showClip && (
                clipList.map((clip, index) => <Vclip key={index} {...clip}/>)
            
            )}
        </SearchVclipStyles>
    );
};

export default SearchVclip;