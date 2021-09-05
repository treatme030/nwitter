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
        //리액트는 상태나 프롭스 내용물이 많으면, 그 안에 작은 변화를 제대로 인식하지 못함
        //user에서 사용하는 것만 뽑아 넣어주기, 크기 줄이고, 가볍게
        setUserObj({  
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])

  //새 user를 userObj에 업데이트 하기  
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      {/* init 상태 변경되면 해당 화면 보여주기 */}
      { init ? (
        <AppRouter 
        isLoggedIn={Boolean(userObj)} 
        userObj={userObj} 
        refreshUser={refreshUser}
        />
      ) : (
        "initializing"
      )}
    </>
  );
}

export default App;
