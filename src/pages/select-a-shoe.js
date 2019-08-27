import React from 'react';
import styled from "styled-components";

import { AppConsumer } from '../components/Context';
import SEO from '../components/seo';
import Shoe from '../components/shoe';
import Navigation from '../components/navigation';
import PageContainer from '../components/pageContainer';


const ProductTileGridWrapper = styled.div`
  div:only-child {
    margin: 0 auto;
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
  }
`;
const SelectShoePageContainer = styled.div`
  @media only screen and (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 1200px;
  }
`;


const SelectShoe = () => (
  <>
    <SEO title="Select a Shoe to Repair" />
    <Navigation />

    <PageContainer>
      <SelectShoePageContainer>

        <header className="step-page-header">
          <h2>Choose your item that needs care:</h2>
        </header>

        <AppConsumer>
          {({ data, set }) => (
            <ProductTileGridWrapper>
              {console.log(JSON.stringify(data.data))}
              {data.data.map((shoe, i) => (
                <Shoe data={shoe} key={i} index={i}/>
                )
              )}
            </ProductTileGridWrapper>
          )}
        </AppConsumer>

      </SelectShoePageContainer>
    </PageContainer>
  </>
)

export default SelectShoe;
