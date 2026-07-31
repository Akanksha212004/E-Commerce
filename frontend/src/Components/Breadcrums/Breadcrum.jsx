import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

// const Breadcrum = (props) => {
//     const {product} = props;
//   return (
//     <div className='breadcrum'>
//         HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
//     </div>
//   )
// }


const Breadcrum = ({product}) => {
  if (!product) return null;  // ya <div>Loading...</div>

  return (
    <div className='breadcrum'>
      HOME / {product.category} / {product.name}
    </div>
  )
}

export default Breadcrum;