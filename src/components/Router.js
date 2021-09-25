import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';
import styled from 'styled-components';
import MapCovidInfo from 'components/MapCovidInfo';
import Covid19 from './Covid19';

const RouterStyles = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    margin: 5rem auto;
    .serch {
        flex: 1;
    }
    .container {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .covid_info {
        flex: 1;
        text-align: left;
    }
    @media screen and (max-width: 1580px){
        flex-direction: column;
        align-items: center;
        width: 490px;
        .covid_info {
            order: 2;
        }
    }
`;

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <RouterStyles>
            <Router>
                <div className="covid_info">
                    <Covid19/>
                    <MapCovidInfo/>
                </div>
                <div className="container">
                { isLoggedIn &&  <Navigation userObj={userObj}/>}
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
                </div>
            </Router>
            <div className="serch">검색키워드</div>
        </RouterStyles>
    );
};

export default AppRouter;