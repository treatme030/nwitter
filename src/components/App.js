import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //currentUser에 따라 로그인 상태 변경, 초깃값 null
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  console.log(authService.currentUser)
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
