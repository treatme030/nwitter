import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //currentUser에 따라 로그인 상태 변경
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //로그인 정보 받고 상태가 변경되었는지  
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  //firebase 로그인 정보를 받게 되었을 때, 로그인 완료 이후 보여줄 화면 렌더링하기 
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(user)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])

  return (
    <>
      {/* init 상태 변경되면 해당 화면 보여주기 */}
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "initializing"}
    </>
  );
}

export default App;
