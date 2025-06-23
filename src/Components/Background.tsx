import styled from "@emotion/styled";
import { Light } from "../style/Colors";
import React from "react";



const Wrapper = styled.div`
    
    margin: 0;
    padding: 0;

    width: 100vw;
    height: 100vh;
    background-color: ${Light};

    z-index: -1;
    
    display:grid;
    grid-template-columns: auto 1fr;

    box-sizing: border-box;
`

interface Props {
    children: React.ReactNode;
};

const Background:React.FC<Props> = ( {children} ) => {
    
    return(
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Background;