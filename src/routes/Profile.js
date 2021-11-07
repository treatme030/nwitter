import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Sweet from 'components/Sweet';
import palette from 'styles/palette';

const ProfileStyles = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    .profileFrom {
        width: 100%;
        display: flex;
        flex-direction: column; 
        border-bottom: 1px solid rgba(255, 255, 255, 0.9);
        padding-bottom: 3rem;
        margin-bottom: 3rem; 
    }
    .formInput {
        width: 100%;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
    }
    .formBtn {
        cursor: pointer;
        width: 100%;
        padding: 7px 20px;
        text-align: center;
        color: white;
        border-radius: 20px;
        background: ${palette.blue[1]};
        margin-top : 1rem;
        transition: background .4s;
        &:hover {
            background: ${palette.blue[0]};
        }
    }
    .logOut {
        margin-top: 5rem;
        background: ${palette.orange[0]};
        transition: background .4s;
        &:hover {
            background: ${palette.orange[1]};
        }
    }
`;

const Profile = ({ userObj, refreshUser }) => {
    //리다이렉트 
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const [userSweets, setUserSweets] = useState([])

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/') //로그아웃시 처음 화면으로 이동
    }

    const getMySweets = async () => {
        const sweets = await dbService
        .collection("sweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "asc")
        .get()

        setUserSweets(sweets.docs.map(doc => doc.data()))
    }

    useEffect(() => {
        getMySweets()
    },[])

    const onChange = (e) => {
        const { value } = e.target 
        setNewDisplayName(value)
    }

    //입력된 값으로 사용자 프로필명 업데이트하기 
    const onSubmit = async (e) => {
        e.preventDefault()
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser()
        }
    }
    return (
        <ProfileStyles>
            <form onSubmit={onSubmit} className="profileFrom">
                <input 
                type="text" 
                placeholder="Dsplay name" 
                value={newDisplayName}
                onChange={onChange}
                autoFocus
                className="formInput"
                />
                <input type="submit" value="Update Profile" className="formBtn"/>
            </form>
            <ul>
                { userSweets.map((sweet, index) => {
                    return (
                        <Sweet key={index} {...sweet} userObj={userObj}/>
                    )
                })}
            </ul>
            <span className="formBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </ProfileStyles>
    );
};

export default Profile;