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
`
const InputError = styled.div`

`

const Field = (props) => (
    <>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        className={props.inputClass}
        id={props.id}
        type={props.type}
      />
      <InputError></InputError>
    </>
  )

export default Field;
