import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';
import styled from 'styled-components';
import MapCovidInfo from 'routes/MapCovidInfo';

const RouterStyles = styled.div`
    max-width: 890px;
    width: 100%;
    margin: 0 auto;
    margin-top: 8rem;
    display: flex;
    justify-content: center;
`;

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            { isLoggedIn && <Navigation userObj={userObj}/> }
            <Switch>
                { isLoggedIn ? (
                    <RouterStyles>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser}/>
                        </Route>
                        <Route exact path="/covid_map">
                            <MapCovidInfo/>
                        </Route>

                    </RouterStyles>
                ) : (
                    <Route exact path="/">
                        <Auth/>
                    </Route>
                )}
                {/* Redirect: from에 있는 값이 엔드포인트와 같지 않으면 to로 이동 */}
                {/* <Redirect from="*" to="/"/> */}
                <Route exact path="/covid_map">
                    <MapCovidInfo/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;