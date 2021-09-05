import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";

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
        <div>
            <AuthForm/>
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