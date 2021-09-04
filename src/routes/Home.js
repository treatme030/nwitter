import Sweet from 'components/Sweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [sweet, setSweet] = useState('')
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

    const onChange = (e) => {
        const { value } = e.target
        setSweet(value)
    }

    //firestore에 데이터 저장하기
    const onSubmit = async (e) => {
        e.preventDefault()
        //컬렉션을 생성하고, 해당 컬렉션에 도큐먼트 추가 
        await dbService.collection("sweets").add({
            text: sweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setSweet('')
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120}
                value={sweet}
                onChange={onChange}
                />
                <input type="submit" value="Sweet"/>
            </form>
            <div>
                { sweets.map((sweet) => <Sweet key={sweet.id} {...sweet}/>)}
            </div>
        </>
    );
};

export default Home;