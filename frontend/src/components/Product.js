import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='trial'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='trial2' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.reviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3'>RS {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
