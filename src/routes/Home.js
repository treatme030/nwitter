import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [sweet, setSweet] = useState('')
    //firestore에서 받은 데이터 상태관리
    const [sweets, setSweets] = useState([])

    //firestore에서 도큐먼트 읽어오기
    const getSweets = async () => {
        const dbSweets = await dbService.collection("sweets").get()//스냅샷으로 들어옴
        dbSweets.forEach((document) => {
            const newObject = {...document.data(), id: document.id}//도큐먼트에 있는 id 속성으로 id 생성
            setSweets((prev) => [newObject, ...prev])
        })
    }
    //useEffect에 async-await문을 쓴 함수는 따로 정의하고, 실행만 그 안에서 해야 함 
    useEffect(() => {
        getSweets()
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
                { sweets.map((sweet) => {
                    const { id, text } = sweet
                    return (
                        <div key={id}>
                            <h4>{text}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default Home;