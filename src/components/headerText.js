import React from 'react';
import styled from 'styled-components';


const HeaderText = styled.section`
  text-align: center;
`
const HeaderText = props => (
  <h2>{props.text}</h2>
)

export default HeaderText;
