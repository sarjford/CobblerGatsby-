import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';
import { AppContext } from '../components/Context';
import Navigation from '../components/navigation';
import Checkbox from '../components/checkbox';
import Button from '../components/button';
import ProductTile from '../components/productTile';
import ContactUs from '../components/contactUs';
import PageContainer from '../components/pageContainer';



const CheckboxError = styled.p`
  color: #ff6d6d;
  line-height: 1.71;
  font-size: 14px;
  margin-top: 8px;
`
const HelpLink = styled.div`
  margin: 30px 0 32px;
  text-align: center;
  button {
    padding-bottom: 3px;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
  }
`
const FeaturedProduct = styled.div`
  > div {
    width: 100%;
    margin: 0 0 40px;
  }
`
const PageHeader = styled.header`
  text-align: center;
  h2 {
    margin-bottom: 0;
  }
  p {
    line-height: 1.5;
    margin-bottom: 0;
  }
`
const PageWrapper = styled.div`
  max-width: 425px;
  margin: 0 auto;
`
const RepairOptions = styled.div`
  margin: 4px 0 16px;

  .checkbox {
    border: 1px solid black;
    &.checked {
      background:#7f272b;
      border: 1px solid #7f272b;
    }
  }
  &.error .checkbox {
    border: 1px solid #ff6d6d;;
  }
`

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

const HelpPopup = props => (
  <section className='help'>
    <div className='text'>
      <p>Reach out to our client services team if you have some serious shoe needs and we’ll get you set up:</p>
    </div>
    < ContactUs />
  </section>
)

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
    console.log('click')
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

    window.scrollTo(0, 0);
    navigate('/confirm-user-info');
  }

  render() {
    const appState = this.context;
    const selectedShoeData = appState.data.data[appState.data.selectedShoeIndex];
    const toggleCheckboxFunc = this.toggleCheckbox;
    const repairList = selectedShoeData.name.toLowerCase().indexOf('kiss') > -1 ? repairs.Handbags : repairs.Shoes;

    return (
      <>
        <SEO title="Select Repairs" />
        <Navigation page="select-repairs"/>

        <PageContainer>
          <PageWrapper>

            <FeaturedProduct>
              <ProductTile
                imgSrc={selectedShoeData.imageSrc}
                details={selectedShoeData.options}
                productName={selectedShoeData.name}
                onClick={null}
              />
            </FeaturedProduct>

            <PageHeader>
              <h2>What kind of love do they need?</h2>
              <p>Check all that apply.</p>
            </PageHeader>

            <RepairOptions className={!!this.state.checkboxError ? 'error' : ''}>

              {Object.keys(repairList).map((label, i) => (
                <Checkbox label={label} handleCheckboxChange={toggleCheckboxFunc} key={i}/>
              ))}

              {this.state.checkboxError &&
                <CheckboxError>Select a service to continue</CheckboxError>
              }
            </RepairOptions>

            <Button
              btnClass="primary"
              onClick={this.selectRepairs}
              btnText="Start Your Service"
            />

            <HelpLink>
              <button className="red-underline" onClick={this.toggleHelpPopup}>
                Don’t see the care you need?
              </button>
            </HelpLink>

            {this.state.popupVisible && <HelpPopup hide={this.hideHelpPopup} />}

          </PageWrapper>
        </PageContainer>
      </>
    );
  }
}
