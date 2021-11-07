import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import palette from 'styles/palette';

const NavigationStyles = styled.nav`
    margin-bottom: 2rem;
    ul {
        display: flex;
        justify-content: center;
        .nav_home {
            margin-right: 1rem;
        }
        .icon {
            color: ${palette.blue[1]};
        }
        .nav_progile {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1.2rem;
            span {
                margin-top: 1rem;
            }
        }
    }
`;

const Navigation = ({ userObj }) => {
    return (
        <NavigationStyles>
           <ul>
               <li>
                    <Link to="/" className='nav_home'>
                        <FaTwitter className='icon' size='5ex'/>
                    </Link>
               </li>
               <li>
                    <Link to="/profile" className='nav_progile'>
                        <FaUser className='icon' size='5ex'/>
                        <span>
                            { userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"}
                        </span>
                    </Link>
               </li>
           </ul>
        </NavigationStyles>
    );
};

export default Navigation;