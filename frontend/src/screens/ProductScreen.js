import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
      
      <i class="fas fa-chevron-circle-left fa-3x"></i>
         
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="Warning">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col className="sample">Description : </Col>
                    <Col> {product.description} </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col className="sample">Available :</Col>
                    <Col>
                      {product.stock > 0 ? (
                        <Button className="btn-circle2">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </Button>
                      ) : (
                        <Button className="btn-circle3">
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </Button>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="sample">Owner :</Col>
                    <Col>
                      {product.isShop ? (
                        <i class="fas fa-store "> </i>
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
                    </Col>
                    <Col>{product.owner}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={2}></Col>
            <Col  xs={6} md={4} >
             
                <Image src={product.image} alt={product.name} fluid /> 
             
            </Col>
          </Row>

          <Row className="row1"></Row>

          <Row>
            <Col md={4}>
              <Card>
                <ListGroup class="list-group list-group-flush">
                  <ListGroup.Item>
                    <Row>
                      <Col className="sample">Price :</Col>
                      <Col>
                        <strong>
                          <i class="fas fa-rupee-sign"></i> {product.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col className="sample">Ratings :</Col>
                      <Col>
                        <Rating value={product.rating} />
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="sample">Qty :</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-cart"
                          type="button"
                          disabled={product.stock === 0}
                        >
                          <i class="fas fa-shopping-cart  fa-1x"></i>
                          &nbsp; Cart
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-loan"
                          type="button"
                          disabled={!product.isLend}
                        >
                          <i class="fas fa-money-check fa-1x"></i>
                          &nbsp; Apply For Loan
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={1}></Col>
            
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
