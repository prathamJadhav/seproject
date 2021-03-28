import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Convert} from 'mongo-image-converter';
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isLend, setLend] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [isShop, setShop] = useState(false);
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setOwner(product.owner);
        setImage(product.image);
        setDescription(product.description);
        setCondition(product.condition);
        setCategory(product.category);
        setStock(product.stock);
        setPrice(product.price);
        setLend(product.isLend);
        setShop(product.isShop);
        setVerified(product.isVerified);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        owner,
        price,
        image,
        condition,
        category,
        description,
        stock,
        isVerified,
        isLend,
        isShop,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        <i class="fas fa-chevron-circle-left fa-3x"></i>
      </Link>
      <Container className="test1">
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {userInfo.isAdmin ? (
                <Form.Group controlId="owner">
                  <Form.Label>Owner</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Owner Name"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              ) : (
                <Form.Group controlId="owner">
                  <Form.Label>Owner</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Owner Name"
                    defaultvalue={userInfo.name}
                    onChange={(e) => setOwner(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>

                <Form.File
                  id="image-file"
                  label=" Choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              {userInfo.isAdmin ? (
                <Form.Group controlId="condition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              ) : (
                <Form.Group controlId="condition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fill Stock Count"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {isLend ? (
                <Form.Group controlId="isLend">
                  <Form.Check
                    size="lg"
                    type="checkbox"
                    placeholder="Loan"
                    value={isLend}
                    onChange={(e) => setLend(e.target.checked ? true : false)}
                    label="Loan Option"
                    checked
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="isLend">
                  <Form.Check
                    size="lg"
                    type="checkbox"
                    placeholder="Loan"
                    value={isLend}
                    onChange={(e) => setLend(e.target.checked ? true : false)}
                    label="Loan Option"
                  />
                </Form.Group>
              )}

              {userInfo.isAdmin ? (
                isShop ? (
                  <Form.Group controlId="isShop">
                    <Form.Check
                      size="lg"
                      type="checkbox"
                      placeholder="Shop Registration"
                      value={isShop}
                      onChange={(e) => setShop(e.target.checked ? true : false)}
                      checked
                      label="Shop Registration"
                    />
                  </Form.Group>
                ) : (
                  <Form.Group controlId="isShop">
                    <Form.Check
                      size="lg"
                      type="checkbox"
                      placeholder="Shop Registration"
                      value={isShop}
                      onChange={(e) => setShop(e.target.checked ? true : false)}
                      label="Shop Registration"
                    />
                  </Form.Group>
                )
              ) : (
                <Form.Group controlId="isVerified"></Form.Group>
              )}
              {userInfo.isAdmin ? (
                isVerified ? (
                  <Form.Group controlId="isVerified">
                    <Form.Check
                      size="lg"
                      type="checkbox"
                      placeholder="Verification"
                      value={isVerified}
                      onChange={(e) =>
                        setVerified(e.target.checked ? true : false)
                      }
                      label=" Verification Status"
                      checked
                    />
                  </Form.Group>
                ) : (
                  <Form.Group controlId="isVerified">
                    <Form.Check
                      size="lg"
                      type="checkbox"
                      placeholder="Verification"
                      value={isVerified}
                      onChange={(e) =>
                        setVerified(e.target.checked ? true : false)
                      }
                      label=" Verification Status"
                    />
                  </Form.Group>
                )
              ) : (
                <Form.Group controlId="isVerified"></Form.Group>
              )}

              <Button type="submit" variant="primary" >
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditScreen;
