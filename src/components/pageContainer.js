import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  padding: 25px 20px;

  @media only screen and (min-width: 768px) {
    padding: 40px;
  }
`
const PageContainer = props => (
  <Container>{props.children}</Container>
)

export default PageContainer;
