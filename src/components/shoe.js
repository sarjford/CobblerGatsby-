import React from "react";
import { navigate } from 'gatsby';

import { AppContext } from '../components/Context';
import ProductTile from '../components/productTile';


export default class Shoe extends React.Component {

	constructor(props) {
		super(props);
		this.selectShoe = this.selectShoe.bind(this);
	}

  static contextType = AppContext;

	selectShoe(){
    const appState = this.context;
		appState.set({
			selectedShoeIndex: this.props.index,
		});
    // window.scrollTo(0, 0);
    navigate('/select-repairs');
	}

	render() {
		return (
      <ProductTile
        imgSrc={this.props.data.imageSrc}
        details={this.props.data.options}
        productName={this.props.data.name}
        onClick={this.selectShoe}
      />
    )
	}
}

  // <div className="shoe-orders">
    // <button className="single-shoe" onClick={this.selectShoe}>
    //   <div>
    //     <div className="img">
    //       <img src={imgSrc} />
    //     </div>
    //
    //     <div className="info">
    //       <div>
    //         <h6>{this.props.data.name}</h6>
    //         <h5>{details}</h5>
    //       </div>
    //     </div>
    //   </div>
    // </button>
  // </div>
