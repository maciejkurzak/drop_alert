import { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from '../store/userData';

interface StyledUserAvatarProps {
  src: string;
}

const StyledUserAvatar = styled.div<StyledUserAvatarProps>`
  background-image: ${(props) => `url(${props.src})`};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const UserAvatar: React.FC<{ src?: string }> = ({ src }) => (
  <StyledUserAvatar src={src ? src : 'https://i.imgur.com/lOlJPBo.jpg'} />
);

const StyledLoggedUser = styled.div`
  width: 100%;
  display: flex;
  .user-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    .name {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .role {
      font-size: 1rem;
      font-weight: 300;
    }
  }
`;

const LoggedUser = () => {
  const loggedUser = JSON.parse(useStore((state) => state.loggedUser)).user;

  return (
    <StyledLoggedUser className="logged-user">
      <UserAvatar />
      <div className="user-data">
        <div className="name">{loggedUser.username}</div>
        <div className="role">{loggedUser.role}</div>
      </div>
    </StyledLoggedUser>
  );
};

export default LoggedUser;
