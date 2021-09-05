import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';

const Home = ({ userObj }) => {
    //firestore에서 받은 데이터 상태관리
    const [sweets, setSweets] = useState([])
    
    //실시간 데이터베이스 
    useEffect(() => {
        dbService.collection("sweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setSweets(newArray)
        })
    },[])


    return (
        <>
            <SweetFactory userObj={userObj}/>
            <div>
                { sweets.map((sweet) => (
                    <Sweet 
                    key={sweet.id} 
                    {...sweet}
                    isOwner={sweet.creatorId === userObj.uid}
                    //작성한 유저만에 삭제, 수정 가능하도록
                    />
                ))}
            </div>
        </>
    );
};

export default Home;