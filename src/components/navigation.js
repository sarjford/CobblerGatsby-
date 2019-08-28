import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

// currentPath: [currentStep, previousPath]
const previousStepMap = {
  'select-a-shoe': ['1', '/'],
  'select-repairs': ['2', '/select-a-shoe'],
  'confirm-user-info': ['3', '/select-repairs']
}

const NavWrapper = styled.section`
  width: 100%;
  background: #000;
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
`
const ProgressText = styled.h3`
  text-align: center;
  width: 100%;
  font-family: 'Futura', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-weight: normal;
  font-size: .8rem;
  position: absolute;
  top: 0; left: 0;
  right: 0; bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  color: #fff;
  width: 33%;
`
const BackwardsBtn = styled.div`
`
const BackwardsIcon = styled.svg`
  width: 14px;
  height: 21px;
  padding: 12px 20px;
  &:hover {
    cursor: pointer;
  }
`

const Navigation = props => {

  const navigateBack = () => {
    const prevStep = previousStepMap[props.page][1];
    navigate(prevStep);
  }

  const currentStep = previousStepMap[props.page][0];

  return (
    <NavWrapper>
      <ProgressText>Step {currentStep} of 3</ProgressText>
      <BackwardsBtn onClick={navigateBack}>
        <BackwardsIcon xmlns="http://www.w3.org/2000/svg" version="1.0" width="257.000000pt" height="434.000000pt" viewBox="0 0 257.000000 434.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,434.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
            <path d="M1130 3230 c-591 -578 -1076 -1056 -1078 -1063 -2 -11 2137 -2107 2159 -2115 11 -4 329 298 329 313 0 6 -412 413 -915 904 -503 491 -915 894 -915 896 0 1 412 404 915 896 503 491 915 898 915 904 0 13 -314 315 -327 315 -4 0 -492 -473 -1083 -1050z"/>
          </g>
        </BackwardsIcon>
      </BackwardsBtn>
    </NavWrapper>
  )
}

export default Navigation;
