import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vclip from './Vclip';
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components';

const SearchVclipStyles = styled.div`
    position: relative;
    .search_input {
        width: 100%;
        margin-bottom: 3rem;
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
        const api = process.env.REACT_APP_SEARCH_API_KEY

        const res = await axios.get(`https://dapi.kakao.com/v2/search/vclip?sort=recency&query=${searchText}&size=5`, {headers: {
            'Authorization': `KakaoAK ${api}`
        }})
        setClipList(res.data.documents)
        setShowClip(true)
    }

    const keyPressHandler = (e) => {
        if(e.key === 'Enter'){
            getData()
        }
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
            <input 
            className="blue_border_input search_input"
            type="text" 
            placeholder="youtube 검색 키워드를 입력하세요." 
            value={searchText} 
            onChange={changeHandler} 
            onKeyPress={keyPressHandler}
            />
            <button className="blue_button" onClick={getData}>
                <FiSearch size="3ex"/>
            </button>
            { showClip && (
                clipList.map((clip, index) => <Vclip key={index} {...clip}/>)
            
            )}
        </SearchVclipStyles>
    );
};

export default SearchVclip;