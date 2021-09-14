import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';
import styled from 'styled-components';

const HomeStyles = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
`;

const Home = ({ userObj }) => {
    //firestore에서 받은 데이터 상태관리
    const [sweets, setSweets] = useState([])
    
    //실시간 데이터베이스 
    useEffect(() => {
        dbService.collection("sweets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setSweets(newArray)
        })
    },[])


    return (
        <HomeStyles>
            <SweetFactory userObj={userObj}/>
            <div>
                { sweets.map((sweet) => (
                    <Sweet 
                    key={sweet.id} 
                    {...sweet}
                    isOwner={sweet.creatorId === userObj.uid}
                    userObj={userObj}
                    //작성한 유저만에 삭제, 수정 가능하도록
                    />
                ))}
            </div>
        </HomeStyles>
    );
};

export default Home;