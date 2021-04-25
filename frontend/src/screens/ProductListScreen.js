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
  const pageNumber = match.params.pageNumber || 36;

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
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Container>
            <Container className='custom'>
              <Row className='align-items-center'>
                <Col>
                  <Row>
                    <h1>Products</h1>
                  </Row>
                  {userInfo.isAdmin || userInfo.isMod ? (
                    <Row>
                      <Col>
                        <h6 class='text-left'>
                          <i
                            class='fas fa-shopping-basket'
                            style={{ color: 'purple' }}
                          ></i>{' '}
                          : &emsp;
                          {products.length}
                        </h6>
                      </Col>
                      <Col>
                        <h6 class='text-left'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            fill='green'
                            class='bi bi-patch-check-fill'
                            viewBox='0 0 16 16'
                          >
                            <path d='M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z' />
                          </svg>
                          &nbsp; : &emsp;
                          {
                            products.filter(
                              (product) => product.isVerified === true
                            ).length
                          }
                        </h6>
                      </Col>
                      <Col>
                        <h6 class='text-left'>
                          <i
                            class='far fa-eye-slash'
                            style={{ color: 'red' }}
                          ></i>
                          : &emsp;
                          {
                            products.filter(
                              (product) => product.isVerified === false
                            ).length
                          }
                        </h6>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col className='text-right'>
                  <Button className='btn-circle' onClick={createProductHandler}>
                    <i class='fas fa-plus fa-2x '></i>
                  </Button>
                </Col>
              </Row>
            </Container>

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
            {userInfo.isAdmin || userInfo.isMod ? (
              <Paginate pages={pages} page={page} isAdmin={true} />
            ) : (
             <></>

            )}
          </Container>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
