import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

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
        <>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="Dsplay name" 
                value={newDisplayName}
                onChange={onChange}
                />
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;