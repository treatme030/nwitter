import { createGlobalStyle } from "styled-components";

const  GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 10px;
    }
    body {
        background-color: black;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-size: 14px;
        color: white;
    }
    ul,li{
        list-style: none;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    input {
        all: unset;
        box-sizing: border-box;
        appearance: none;
    }
    button{
        outline: none;
        background-color: white;
        color: black;
        border: none;
    }
    form {
        width: 100%;
    }
    .covid_region {
        margin-top: 2rem;
        button {
            background-color: transparent;
            border: 1px solid tomato;
            color: #fff;
            padding: 1rem;
            border-radius: 10px;
            transition: 0.4s;
            &:hover {
                background-color: tomato;
            }
        }
    }
`;

export default GlobalStyles;