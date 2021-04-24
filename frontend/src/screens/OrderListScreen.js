import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isDM || userInfo.isMod)) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Container className='test2'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Container>
            <Container className='custom'>
              <Row>
                <Col>
                  <h4>
                    <i class='fas fa-luggage-cart fa-lg'></i> Orders
                  </h4>
                </Col>
                <Col>
                  <Row>
                    <Col></Col>

                    <Col>
                      <h6 class='text-right'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='22'
                          height='22'
                          fill='forestgreen'
                          class='bi bi-bag-check-fill'
                          viewBox='0 0 16 16'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z'
                          />
                        </svg>{' '}
                        :
                        {
                          orders.filter((order) => order.isDelivered === true)
                            .length
                        }
                      </h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col>
                      <h6 class='text-right'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='21'
                          height='24'
                          fill='red'
                          class='bi bi-bag-x-fill'
                          viewBox='0 0 16 16'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293 6.854 8.146z'
                          />
                        </svg>{' '}
                        :
                        {
                          orders.filter((order) => order.isDelivered === false)
                            .length
                        }
                      </h6>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Table striped bordered hover responsive className='table-sm'>
              <thead className='sample'>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.user !== null)
                  .map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.user && order.user.roomnumber}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>
                        {' '}
                        <i class='fas fa-rupee-sign'></i> {order.totalPrice}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
