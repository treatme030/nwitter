import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
        padding-bottom: 30px; 
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
        background-color: #04aaff;
        margin-top : 1rem;
    }
    .logOut {
        margin-top: 5rem;
        background-color: tomato;
    }
`;

const Profile = ({ userObj, refreshUser }) => {
    //리다이렉트 
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/') //로그아웃시 처음 화면으로 이동
    }

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
            <span className="formBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </ProfileStyles>
    );
};

export default Profile;