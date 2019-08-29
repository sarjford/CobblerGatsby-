import React from 'react';
import { navigate } from 'gatsby';

import { AppContext } from '../components/Context';
import ProductTile from '../components/productTile';



export default class Shoe extends React.Component {

	constructor(props) {
		super(props);
	}

  static contextType = AppContext;

	selectShoe = () => {
    const appState = this.context;
		appState.set({
			selectedShoeIndex: this.props.index,
		});
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
