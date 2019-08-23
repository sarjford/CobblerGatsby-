import React from 'react';
import styled from "styled-components";


// shoe-orders
const TileWrapper = styled.div`
  width: 100%;
  margin: 0 0 16px;
  @media only screen and (min-width: 768px) {
    width: calc(50% - 40px);
    margin: 0 20px 40px;
  }
  @media only screen and (min-width: 1280px) {
    width: calc(33% - 40px);
    &:nth-child(4n):last-child {
      flex-basis: 100%;
      & > {
        width: calc(33% - 20px);
      }
    }
  }
`
// single shoe
const TileInner = styled.button`
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 20px;
  width: 100%;
`

const TileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
`

const TileImage = styled.img`
  width: 100%;
`

const TileInfoWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 8px;
`

const ProductName = styled.h6`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
`

const ProductDetails = styled.h5`
  margin: 0;
  text-transform: capitalize;
  color: #555555;
  font-weight: normal;
  font-size: 14px;
  margin-top: 3px;
`

const ProductTile = (props) => {
  // get details string from options value; account for OS
  const detailsArray = props.details.split(' / ');
  const formattedDetails = detailsArray[1] === '1.0' ? detailsArray[0].toLowerCase() : `${detailsArray[0].toLowerCase()} / Size ${detailsArray[1]}`;
  // make image smaller or bring in no image available image
  const imgSrc = props.imgSrc ? props.imgSrc.replace('.jpg', '_300x.jpg') : '../images/cobblerMissingShoe.jpg';

  return (
      <TileWrapper>
        <TileInner onClick={props.onClick}>
          <div>
            <TileImageWrapper>
              <TileImage src={imgSrc} />
            </TileImageWrapper>
            <TileInfoWrapper>
              <div>
                <ProductName>{props.productName}</ProductName>
                <ProductDetails>{formattedDetails}</ProductDetails>
              </div>
            </TileInfoWrapper>
          </div>
        </TileInner>
      </TileWrapper>
    )
}


export default ProductTile;
