import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = () => {
    const [sweet, setSweet] = useState('')

    const onChange = (e) => {
        const { value } = e.target
        setSweet(value)
    }

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
    );
};

export default Home;