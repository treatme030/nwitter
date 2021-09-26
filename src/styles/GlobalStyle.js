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
    /* common styles */
    .blue_border_input {
        height: 40px;
        padding: 0 2rem;
        color: #fff;
        border: 1px solid #04aaff;
        border-radius: 20px;
        font-weight: 500;
        font-size: 1.2rem;
    }
    .blue_button {
        position: absolute;
        right: 0;
        background-color: #04aaff;
        height: 40px;
        width: 40px;
        padding: 1rem 0;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
    }
`;

export default GlobalStyles;