import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                An e-commerce website is an online platform where businesses and individuals 
                can buy and sell products or services through the internet. It allows customers to 
                browse different categories of products, view detailed descriptions, compare prices, 
                and make purchases from the comfort of their homes. These websites usually provide features 
                such as shopping carts, secure payment gateways, order tracking, and customer support to enhance 
                the user experience. Businesses benefit from these platforms as they can reach a global audience 
                without the limitations of a physical store. With the growth of digital technology and online 
                payments, e-commerce has become one of the most important parts of modern business and has 
                transformed the way people shop around the world.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox;