import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
    * {
        font-size: 62.5%;
        box-sizing: border-box;
        background-color: black;
    }
    
`;

export default GlobalStyle;
