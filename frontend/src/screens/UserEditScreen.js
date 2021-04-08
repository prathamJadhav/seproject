import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setprofileImage] = useState('');
  const [roomnumber, setRoom] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [isDM, setIsDM] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setprofileImage(user.profileImage);
        setRoom(user.roomnumber);
        setIsAdmin(user.isAdmin);
        setIsMod(user.isMod);
        setIsDM(user.isDM);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        profileImage,
        roomnumber,
        isAdmin,
        isMod,
        isDM,
      })
    );
  };

  return (
    <Container>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        <i class='fas fa-chevron-circle-left fa-3x'></i>
      </Link>
      <FormContainer>
        <h1>Users List</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className='sample'>Name :</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className='sample'>Email Address :</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='roomnumber'>
              <Form.Label className='sample'>Room No :</Form.Label>
              <Form.Control
                type='roomnumber'
                placeholder='Enter Room No.'
                value={roomnumber}
                onChange={(e) => setRoom(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {userInfo.isAdmin ? (
              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='* Grant Admin Access'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            ) : (
              <></>
            )}
            {userInfo.isAdmin ? (
              <Form.Group controlId='ismod'>
                <Form.Check
                  type='checkbox'
                  label='Moderator Access'
                  checked={isMod}
                  onChange={(e) => setIsMod(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            ) : (
              <></>
            )}
            <Form.Group controlId='isdm'>
              <Form.Check
                type='checkbox'
                label='Appoint Delievery Man'
                checked={isDM}
                onChange={(e) => setIsDM(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='btn-p'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default UserEditScreen;
