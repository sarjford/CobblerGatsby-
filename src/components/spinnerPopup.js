import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';


const MovementAnimation = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0 }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  background: #fff;
  opacity: .8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  left: 94px;
  top: 48px;
  position: absolute;
  background: #28292f;
  width: 12px;
  height: 24px;
  border-radius: 40%;
  -webkit-transform-origin: 6px 52px;
  transform-origin: 6px 52px;
  transform: ${props => props.transform};
  /* Animation */
  animation: ${MovementAnimation} 1s linear infinite;
  animation-delay: ${props => props.delay};
`;

const Spinner = styled.div`
  position: relative;
  margin: 0 auto;
  height: 100%;
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
`;


class SpinnerPopup extends Component {
  render() {
    return (
      <LoaderWrapper>
        <div className="lds-css ng-scope">
          <Spinner>
           <Dot delay="-0.916666666666667s" transform="rotate(0deg)"></Dot>
           <Dot delay="-0.833333333333333s" transform="rotate(30deg)"></Dot>
           <Dot delay="-0.75s" transform="rotate(60deg)"></Dot>
           <Dot delay="-0.666666666666667s" transform="rotate(90deg)"></Dot>
           <Dot delay="-0.583333333333333s" transform="rotate(120deg)"></Dot>
           <Dot delay="-0.5s" transform="rotate(150deg)"></Dot>
           <Dot delay="-0.416666666666667s" transform="rotate(180deg)"></Dot>
           <Dot delay="-0.333333333333333s" transform="rotate(210deg)"></Dot>
           <Dot delay="-0.25s" transform="rotate(240deg)"></Dot>
           <Dot delay="-0.166666666666667s" transform="rotate(270deg)"></Dot>
           <Dot delay="-0.083333333333333s" transform="rotate(300deg)"></Dot>
           <Dot delay="0s" transform="rotate(330deg)"></Dot>
          </Spinner>
        </div>
      </LoaderWrapper>
    )
  }
}

export default SpinnerPopup;
