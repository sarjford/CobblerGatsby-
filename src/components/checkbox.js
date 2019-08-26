import React from 'react';
import styled from 'styled-components';


const CheckboxWrapper = styled.div`
  padding: 15px 12px;
  p {
    display: inline-block;
    margin: 0 0 0 20px;
    vertical-align: bottom;
    line-height: 1;
  }
  & > div {
    vertical-align: bottom;
    height: 18px;
    width: 18px;
    border: 1px solid black;
    cursor: pointer;
    display: inline-block;
    position: relative;
    &::after {
      left: 6px;
      top: 3px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      content: '';
      position: absolute;
    }
  }
`

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedClassName: '',
    }
  }

  toggleCheckboxChange = () => {
    const {handleCheckboxChange, label} = this.props;
    const css = (this.state.checkedClassName === '') ? "checked" : '';
    this.setState({ checkedClassName : css });

    handleCheckboxChange(label);
  }

  render() {

    return (
      <CheckboxWrapper onClick={this.toggleCheckboxChange}>
        <div className={`${this.state.checkedClassName} checkbox`}/>
        <p>{this.props.label}</p>
      </CheckboxWrapper>
    );
  }
}
