import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Product = ({ product }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card className='trial'>
      {userInfo == null ? (
        <Link to={`/login`}>
          <Card.Img src={product.image} variant='top' className='trial2' />
        </Link>
      ) : (
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' className='trial2' />
        </Link>
      )}
      <Card.Body>
        {userInfo == null ? (
          <Link to={`/login`}>
             <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        ) : (
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        )}

        <Card.Text as='h3'>
          <i class='fas fa-rupee-sign'></i> {product.price}
        </Card.Text>

        <footer>
          {product.isVerified ? (
            <img src='https://img.icons8.com/fluent/30/000000/certificate--v2.png' />
          ) : (
            <></>
          )}
        </footer>
      </Card.Body>
    </Card>
  );
};

export default Product;
