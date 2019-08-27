import React from 'react';
import styled from "styled-components";


const Input = styled.input`
  font-size: 0.75rem; //12
  letter-spacing: .5px;
  padding: 17px 14px;
  box-sizing: border-box;
  border: solid 1px #cccccc;
  display: block;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const Field = (props) => (
    <div className={props.wrapperClass}>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        className={props.error ? `input-box-error` : ``}
        id={props.id}
        type={props.type}
      />
      <div></div>
    </div>
  )

export default Field;
