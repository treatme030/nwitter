import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
    const [userSweets, setUserSweets] = useState([])
    //리다이렉트 
    const history = useHistory()

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/') //로그아웃시 처음 화면으로 이동
    }

    //유저가 작성한 sweets만 필터링 하기 
    const getMySweets = async () => {
        const sweets = await dbService
        .collection("sweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "asc")
        .get()//쿼리문 통해 얻은 결과물 가져오기 

        const userSweetsList = sweets.docs.map((doc) => doc.data())
        setUserSweets(userSweetsList)
    }

    useEffect(() => {
        getMySweets()
    },[])

    return (
        <>
            { userSweets.map((userSweet, index) => {
                const { attachmentUrl, createdAt, creatorId, text} = userSweet
                return (
                    <div key={index}>
                        <h4>{text}</h4>
                        <img src={attachmentUrl} width="50px" height="50px"/>
                    </div>
                )
            })}
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;