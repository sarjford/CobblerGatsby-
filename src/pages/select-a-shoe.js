import React from "react"

import { AppConsumer } from "../components/Context"
import SEO from "../components/seo"

const SelectShoe = () => (
  <>
    <SEO title="Select a shoe" />
    <section className="page-container page-1-shoes">
      <section className="page-1-shoes">
        <h2>Choose your item that needs care:</h2>

        <AppConsumer>
          {({ data, set }) => (
            <div className="shoe-order-container">
              {console.log(JSON.stringify(data))}
            </div>
          )}
        </AppConsumer>

      </section>
    </section>
  </>
)

export default SelectShoe;


              // {data.map(shoe => <div> {shoe.name} </div>)}
