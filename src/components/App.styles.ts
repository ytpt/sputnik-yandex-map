import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    #map {
        width: 70%;
        height: 700px;
        margin: 0 auto;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`