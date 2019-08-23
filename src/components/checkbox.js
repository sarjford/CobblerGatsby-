import React from 'react';


export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedClassName: '',
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const {handleCheckboxChange, label} = this.props;
    const css = (this.state.checkedClassName === '') ? "checked" : '';
    this.setState({ checkedClassName : css });

    handleCheckboxChange(label);
  }

  render() {

    return (
      <div className="checkbox" onClick={this.toggleCheckboxChange}>
        <div className={this.state.checkedClassName}/>
        <p>{this.props.label}</p>
      </div>
    );
  }
}
