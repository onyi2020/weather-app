import React from 'react';
import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
);

const CityWrapper=styled.div`
    text-align: end;
    
`;

const InputWrapper = styled.input`
    padding: .8rem;
    outline: none;
    border: none;
    background: #ffffff2e;
    color: white;
    font-size: 16px;    
    border-radius: 5px;
    ${mq[0]}{
    margin: 0 auto;
    display: block;
    }
`;

function CityInput (props) {
const {handleSubmit, handleChange } = props;

// const showCity = (event) => {
//     const enteredCity = event.target.value;
//     return enteredcity;
// }

    return (
       <CityWrapper>
           <form onSubmit={handleSubmit}>
               <label htmlFor="city"></label>
               <InputWrapper type={"text"} id='city' placeholder={"Click and type a city name"} onChange={handleChange} />
           </form>
       </CityWrapper>
    )

}

export default CityInput;


