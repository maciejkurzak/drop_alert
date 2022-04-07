import { stringify } from 'querystring';
import styled from 'styled-components';

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
  border-radius: 1rem;
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

const LoggedUser = () => (
  <StyledLoggedUser className="logged-user">
    <UserAvatar />
    <div className="user-data">
      <div className="name">Użyszkodnik</div>
      <div className="role">Administrator</div>
    </div>
  </StyledLoggedUser>
);

export default LoggedUser;
