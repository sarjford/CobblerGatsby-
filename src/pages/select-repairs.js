import React from 'react';

import { AppContext } from '../components/Context';

import Checkbox from '../components/checkbox';
// import Help from './helpPopup';
import Button from '../components/button';
import ProductTile from '../components/productTile';


const repairs = {
  'Shoes': {
    'Cleaning': 134,
    'Heel Tip Replacement': 297,
    'Minor Scuffs': 298,
  },
  'Handbags': {
    'Cleaning': 134,
    'Minor Scuffs': 298,
  }
}

export default class Repairs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      checkboxError: false,
    }
  }

  static contextType = AppContext;

  componentDidMount(){
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    this.setState({ checkboxError: false });
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  toggleHelpPopup = () => {
    if (this.state.popupVisible) {
      this.setState({popupVisible: false});
    } else {
      this.setState({popupVisible: true});
    }
  }

  selectRepairs = (e) => {
    const appState = this.context;
    e.preventDefault();

    if (this.selectedCheckboxes.size === 0){
      this.setState({checkboxError: true});
      return;
    }

    let selectedRepairsIds = [];
    for (const checkbox of this.selectedCheckboxes) {
      selectedRepairsIds.push(repairs.Shoes[checkbox]);
    }

    appState.set({
      selectedRepairs: selectedRepairsIds
    });

    // window.scrollTo(0, 0);
    // route('/step_3');
  }

  render() {
    const appState = this.context;
    const selectedShoeData = appState.data.data[appState.data.selectedShoeIndex];

    const repairList = selectedShoeData.name.toLowerCase().indexOf('kiss') > -1 ? repairs.Handbags : repairs.Shoes;
    const toggleCheckboxFunc = this.toggleCheckbox;
    const checkboxes = Object.keys(repairList).map((label, i) => (
      <Checkbox label={label} handleCheckboxChange={toggleCheckboxFunc} key={i}/>
    ));

    const checkBoxErrClass = !!this.state.checkboxError ? 'error' : 'no-error';

    return (
      <section className="page-container">
        <section className="page-2-repairs">

          <section className="selected-shoe">

            <ProductTile
              imgSrc={selectedShoeData.imageSrc}
              details={selectedShoeData.options}
              productName={selectedShoeData.name}
              onClick={null}
            />

            {
              // <div className="shoe-orders">
              //   <button className="single-shoe">
              //     <div>
              //       <div className="img">
              //         <img src={imgSrc} onLoad={this.imageLoaded} alt={selectedShoeData.name}/>
              //       </div>
              //
              //       <div className="info">
              //         <div>
              //           <h6>{selectedShoeData.name}</h6>
              //           <h5>{details}</h5>
              //         </div>
              //       </div>
              //     </div>
              //   </button>
              // </div>
            }

          </section>

          <section className="repair-header">
            <h2>What kind of love do they need?</h2>
            <p>Check all that apply.</p>
          </section>

          <section className={`checkboxes ${checkBoxErrClass}`}>
            {checkboxes}
            {this.state.checkboxError && <p className="error-msg">Select a service to continue</p>}
          </section>

          <Button
            btnClass="primary"
            onClick={this.selectRepairs}
            btnText="Start Your Service"
          />

          <div className="help-popup">
            <button onClick={ this.toggleHelpPopup }>Don’t see the care you need?</button>
          </div>

          {
            // {this.state.popupVisible ? <Help hide={this.hideHelpPopup} /> : null }
          }

        </section>
      </section>
    );
  }
}
