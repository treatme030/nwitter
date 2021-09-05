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
    }
    form {
        width: 100%;
    }
    .nweet-input::placeholder {
        color: white;
        opacity: 0.9;
    }


    .formInput {
        width: 100%;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
    }

    .formBtn {
        cursor: pointer;
        width: 100%;
        padding: 7px 20px;
        text-align: center;
        color: white;
        border-radius: 20px;
        background-color: #04aaff;
        cursor: pointer;
    }

    .cancelBtn {
        cursor: pointer;
        background-color: tomato;
    }
`;

export default GlobalStyles;