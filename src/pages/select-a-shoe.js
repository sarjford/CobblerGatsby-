import React from 'react';
import styled from "styled-components";

import { AppConsumer } from '../components/Context';
import SEO from '../components/seo';
import Shoe from '../components/shoe';


// .shoe-order-container
const ProductTileGridWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 -20px;
  }
`

const SelectShoe = () => (
  <>
    <SEO title="Select a shoe" />
    <section className="page-container page-1-shoes">
      <section className="page-1-shoes">
        <h2>Choose your item that needs care:</h2>

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

      </section>
    </section>
  </>
)

export default SelectShoe;
