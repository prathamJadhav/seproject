import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isMod)) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Container className='test2'>
        <h1>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='sample'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Role</th>
               
              </tr>
            </thead>
            <tbody>
              {userInfo.isAdmin
                ? users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            class='fas fa-user-shield'
                            style={{ color: 'purple' }}
                          ></i>
                        ) : user.isMod ? (
                          <i
                            class='fas fa-users-cog'
                            style={{ color: 'deepskyblue' }}
                          ></i>
                        ) : user.isDM ? (
                          <i
                            class='fas fa-biking'
                            style={{ color: 'forestgreen' }}
                          ></i>
                        ) : (
                          <i
                            class='fas fa-user-minus'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i class='far fa-trash-alt fa-2x'></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                : users
                    .filter((user) => user.isAdmin === false)
                    .filter((user) => user.isMod === false)
                    .map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                         { user.isDM ? (
                          <i
                            class='fas fa-biking'
                            style={{ color: 'green' }}
                          ></i>
                          ) : (
                          <i
                            class='fas fa-user-minus'
                            style={{ color: 'red' }}
                          ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
                            onClick={() => deleteHandler(user._id)}
                          >
                            <i class='far fa-trash-alt fa-2x'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default UserListScreen;
