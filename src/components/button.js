import React from 'react';
import styled from 'styled-components';


const ButtonWrapper = styled.button`
  display: block;
  font-size: 0.875rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 800;
  padding: 16px 0;
  width: 100%;
  text-align: center;
  text-decoration: none;
  margin-bottom: 10px;
`

const Button = (props) => (
    <ButtonWrapper
      onClick={props.onClick}
      className={props.btnClass}
    >{props.btnText}
    </ButtonWrapper>
  )

export default Button;
