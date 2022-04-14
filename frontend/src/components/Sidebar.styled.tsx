import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import LoggedUser from './LoggedUser.styled';

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 1rem;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    font-size: 1.6rem;
  }
  .logged-user {
    margin-top: 1rem;
  }
  .links {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    a {
      padding: 0.5rem 1rem;
      width: 100%;
      color: rgba(255, 255, 255, 0.5);
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 400;
      display: flex;
      align-items: center;
      border: solid transparent 0.15rem;
      i {
        margin-right: 0.5rem;
      }
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      &:hover:not(.active) {
        border: solid rgba(255, 255, 255, 0.15) 0.15rem;
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }
  }
  .logout {
    display: flex;
    margin-top: auto;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 400;
    display: flex;
    align-items: center;
    border: solid transparent 0.15rem;
    cursor: pointer;
    i {
      margin-right: 0.5rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }
  }
`;

const SideBar = () => {
  const { token, setToken } = useToken();

  const logOut = () => {
    setToken('');
    window.location.reload();
  };

  return (
    <StyledSideBar>
      <div className="header">drop_alert</div>
      <hr />
      <LoggedUser />

      <div className="links">
        <NavLink to="/posts">
          <i className="ri-grid-fill"></i>
          <p>Posts</p>
        </NavLink>
        <NavLink to="/add-post">
          <i className="ri-file-add-fill"></i>
          <p>Add Post</p>
        </NavLink>
      </div>

      <div className="logout" onClick={logOut}>
        <i className="ri-logout-box-r-fill"></i>
        <p>Log out</p>
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
