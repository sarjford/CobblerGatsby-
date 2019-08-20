import React from "react"

export default class Shoe extends Component {

	constructor(props) {
		super(props);
		this.selectShoe = this.selectShoe.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
	}

	selectShoe(){
		this.props.setAppState({
			selectedShoeIndex: this.props.index,
		});
    window.scrollTo(0, 0);
		route('/step_2');
	}

	imageLoaded(){
		this.props.setAppState({
			imagesLoaded: this.props.appState.imagesLoaded + 1,
		});
	}

	render(props) {
		let options = props.state.options.split(' / ');
    // let details =  options[0].toLowerCase() + ' / ' + 'Size ' + options[1];
    const details = options[1] === '1.0' ? options[0].toLowerCase() : options[0].toLowerCase() + ' / ' + 'Size ' + options[1];

    let imgSrc = props.state.imageSrc ? props.state.imageSrc.replace('.jpg', '_300x.jpg') : '../assets/cobblerMissingShoe.jpg';

		return (
      <div className="shoe-orders">
        <button className="single-shoe" onClick={ this.selectShoe }>
          <div>
            <div className="img">
              <img src={imgSrc} onLoad={this.imageLoaded}/>
            </div>

            <div className="info">
              <div>
                <h6>{props.state.name}</h6>
                <h5>{details}</h5>
              </div>
            </div>
          </div>
        </button>
      </div>
    )
	}
}
