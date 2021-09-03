import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
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
            console.log(data)
        } catch(error){
            setError(error.message)
        }
    }

    const toggleAccount = () => {
        setNewAccount(!newAccount)
    }

    const onSocialClick = async (e) => {
        const { name } = e.target
        let provider;//소셜로그인 서비스 제공업체 
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if(name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)//소셜로그인 진행 
        console.log(data)
    }

    return ( 
        <div>
           <form onSubmit={onSubmit}>
               <input 
               type="email" 
               name="email" 
               placeholder="email" 
               required
               value={email}
               onChange={onChange}
               />
               <input 
               type="password" 
               name="password" 
               placeholder="password" 
               required
               value={password}
               onChange={onChange}
               />
               <input 
               type="submit" 
               value={newAccount ? "Create Account" : "Log In"}
               />
               {error}
           </form>
           <span onClick={toggleAccount}>
           {newAccount ? "Sign In" : "Create Account"}
           </span>
           <div>
                <button name="google" onClick={onSocialClick}>
                   Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                   Continue with Github
                </button>
           </div>
        </div>
    );
};

export default Auth;