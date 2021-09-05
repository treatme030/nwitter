import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';


const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            { isLoggedIn && <Navigation userObj={userObj}/> }
            <Switch>
                { isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser}/>
                        </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth/>
                    </Route>
                )}
                {/* Redirect: from에 있는 값이 엔드포인트와 같지 않으면 to로 이동 */}
                {/* <Redirect from="*" to="/"/> */}
            </Switch>
        </Router>
    );
};

export default AppRouter;