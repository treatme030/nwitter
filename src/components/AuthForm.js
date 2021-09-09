import React, { useState } from 'react';
import { authService } from "fbase";
import styled from 'styled-components';

const AuthFormStyles = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    .authInput {
        max-width: 320px;
        width: 100%;
        padding: 10px;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 1);
        margin-bottom: 10px;
        font-size: 12px;
        color: black; 
        &:placeholder {
            color: white;
            opacity: 0.9;
        }
    }
    .authSubmit {
        text-align: center;
        background: #04aaff;
        color: white;
        margin-top: 10;
        cursor: pointer;
    }
    .authError {
        color: tomato;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
    }
    .authSwitch {
        color: #04aaff;
        cursor: pointer;
        margin-top: 10px;
        margin-bottom: 50px;
        display: block;
        font-size: 12px;
        text-decoration: underline;
        text-align: center;
    }
`;

const AuthForm = () => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // input 여러개 관리--> onChange 함수 1개만 만들면 됨
    const [form, setFrom] = useState({
        email: '',
        password: ''
    })
    const { email, password } = form
    //회원가입과 로그인 
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState('')

    const onChange = (e) => {
        const { value, name } = e.target
        setFrom({
            ...form,
            [name]: value
        })
    }

    //authService에 함수들은 서버로 값을 요청해서 결괏값을 수신 받기까지 시간이 걸리기때문에
    //로그인 또는 회원가입 인증이 처리된 이후에 실행하라고 async,await문 사용 
    const onSubmit = async (e) => {
        e.preventDefault()//submit 이벤트의 발생시 일어나는 새로고침 막아줌
        try {
            let data;
            if(newAccount){
                //Create newAccount
                //브라우저 내장 데이터베이스(IndexedDB)에 사용자 정보 저장됨 
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                //Log In
                data = await authService.signInWithEmailAndPassword(email, password)
            }
        } catch(error){
            setError(error.message)
        }
    }

    const toggleAccount = () => {
        setNewAccount(!newAccount)
    }
    
    return (
        <AuthFormStyles>
           <form onSubmit={onSubmit}>
               <input 
               type="email" 
               name="email" 
               placeholder="email" 
               required
               value={email}
               onChange={onChange}
               className="authInput"
               />
               <input 
               type="password" 
               name="password" 
               placeholder="password" 
               required
               value={password}
               onChange={onChange}
               className="authInput"
               />
               <input 
               type="submit" 
               value={newAccount ? "Create Account" : "Log In"}
               className="authInput authSubmit"
               />
               {error && <span className="authError">{error}</span>}
           </form>
           <span onClick={toggleAccount} className="authSwitch">
           {newAccount ? "Sign In" : "Create Account"}
           </span>
        </AuthFormStyles>
    );
};

export default AuthForm;