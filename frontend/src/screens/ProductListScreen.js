import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    console.log('**product list***');
    dispatch(createProduct());
  };

  return (
    <>
      <Container className='test2'>
        <Row className='align-items-center'>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className='text-right'>
            <Button className='btn-circle' onClick={createProductHandler}>
              <i class='fas fa-plus fa-2x '></i>
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead className='sample'>
                {userInfo.isAdmin || userInfo.isMod ? (
                  <tr>
                    <th>PRODUCT ID</th>
                    <th>PRODUCT NAME</th>
                    <th>OWNER</th>
                    <th>CATEGORY</th>
                    <th>CONDITION</th>
                    <th>PRICE</th>

                  </tr>
                ) : (
                  <tr>
                    <th>PRODUCT NAME</th>

                    <th>CATEGORY</th>
                    <th>CONDITION</th>
                    <th>PRICE</th>

                  </tr>
                )}
              </thead>

              <tbody>
                {userInfo.isAdmin || userInfo.isMod
                  ? products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.owner}</td>
                        <td>{product.category}</td>
                        <td>{product.condition}</td>
                        <td>
                          <i class='fas fa-rupee-sign'></i> {product.price}
                        </td>

                        <td>
                          <LinkContainer
                            to={`/admin/product/${product._id}/edit`}
                          >
                            <Button variant='light' className='btn-sm'>
                              <i class='fa fa-cog fa-spin fa-2x fa-fw'></i>
                              <span class='sr-only'>Loading...</span>
                            </Button>
                          </LinkContainer>
                          </td>
                          <td>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i class='far fa-trash-alt fa-2x'></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  : products
                      .filter((product) => product.user === userInfo._id)
                      .map((productx) => (
                        <tr key={productx._id}>
                          <td>{productx.name}</td>
                          <td>{productx.category}</td>
                          <td>{productx.condition}</td>
                          <td>
                            <i class='fas fa-rupee-sign'></i> {productx.price}
                          </td>

                          <td>
                            <LinkContainer
                              to={`/admin/product/${productx._id}/edit`}
                            >
                              <Button variant='light' className='btn-sm'>
                                <i class='fa fa-cog fa-spin fa-2x fa-fw'></i>
                                <span class='sr-only'>Loading...</span>
                              </Button>
                            </LinkContainer>
                            </td>
                          <td>
                            <Button
                              variant='danger'
                              className='btn-sm'
                              onClick={() => deleteHandler(productx._id)}
                            >
                              <i class='far fa-trash-alt fa-2x'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
