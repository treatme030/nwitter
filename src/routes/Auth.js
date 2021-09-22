import AuthForm from "components/AuthForm";
import Covid19 from "components/Covid19";
import MapInfo from "components/MapInfo";
import { authService, firebaseInstance } from "fbase";
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styled from "styled-components";

const AuthStyles = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .icon_twitter {
        margin-bottom: 3rem;
        color: #04AAFF;
    }
    .authBtns {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 320px;
        .authBtn {
            cursor: pointer;
            border-radius: 20px;
            border: none;
            padding: 10px 0px;
            font-size: 12px;
            text-align: center;
            width: 150px;
            background: white;
            cursor: pointer; 
            svg {
                margin-bottom: -2px;
            }
        }
    }
`;

const Auth = () => {

    const onSocialClick = async (e) => {
        const { name } = e.target
        let provider;//소셜로그인 서비스 제공업체 
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if(name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)//소셜로그인 진행 
    }

    return ( 
        <AuthStyles>
            <FaTwitter className="icon_twitter" size="5ex"/>
            <AuthForm/>
           <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">
                   Continue with Google <FcGoogle/>
                </button>
                <button name="github" onClick={onSocialClick} className="authBtn">
                   Continue with Github <FaGithub/>
                </button>
           </div>
           <Covid19/>
           <MapInfo/>
        </AuthStyles>
    );
};

export default Auth;