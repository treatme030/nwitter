import React from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    //리다이렉트 
    const history = useHistory()

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/') //로그아웃시 처음 화면으로 이동
    }

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;