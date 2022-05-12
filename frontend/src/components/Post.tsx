import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import { Navigate, useParams } from 'react-router-dom';

import { Button, Group, Space } from '@mantine/core';

const StyledPost = styled.div`
  width: 100%;
  .data {
    display: flex;
    flex-direction: column;
    .data-el {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      h3 {
        margin-bottom: 0.25rem;
      }
      .images {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        img {
          max-width: 100%;
          width: 20rem;
          &:not(:last-child) {
            margin-right: 1rem;
          }
        }
      }
    }
  }
`;

const Post = (abc: any) => {
  const { token, setToken } = useToken();
  const [post, setPost] = useState() as [any, any];
  const [images, setImages]: [any, any] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5100/api/post/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if ([401, 403].includes(res.status)) {
          setToken('');
          window.location.reload();
        }
        return res.json();
      })
      .then((res) => {
        setPost(res.post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, setToken, token]);

  useEffect(() => {
    if (post) {
      setImages([]);
      post['images'].forEach((el: any) => {
        setImages((images: any) => [...images, el]);
      });
    }
  }, [post]);

  const columns: any = {
    shoeModel: 'shoe model',
    shoeColor: 'shoe color',
    retailPrice: 'retail price',
    resellPrice: 'resell price',
    dateTime: 'date time',
    dropType: 'drop type',
    app: 'app',
    images: 'images',
  };

  const deletePost = () => {
    fetch(`http://localhost:5100/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if ([401, 403].includes(res.status)) {
          setToken('');
          window.location.reload();
        } else if ([200, 404].includes(res.status)) {
          setIsLoading(false);
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isLoading && !post) {
    return <Navigate to="../" />;
  }

  if (isLoading) {
    return (
      <StyledPost>
        <h1>Loading</h1>
      </StyledPost>
    );
  }

  if (post) {
    return (
      <StyledPost>
        <Group>
          <h1>Post</h1>
          <Button variant="light" size="xs" onClick={deletePost}>
            Delete Post
          </Button>
        </Group>
        <Space h="md" />
        <div className="data">
          {Object.keys(columns).map((k: any) => {
            if (k === 'dateTime') {
              return (
                <div key={k} className="data-el">
                  <h3>{columns[k]}</h3>
                </div>
              );
            } else if (k === 'images') {
              return (
                <div key={k} className="data-el">
                  <h3>{columns[k]}</h3>
                  <div className="images">
                    {images.map((el: any, index: number) => {
                      return (
                        <img
                          key={el}
                          src={`http://localhost:5100/public/output/${el}`}
                          alt="alt"
                        ></img>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return (
              <div key={k} className="data-el">
                <h3>{columns[k]}</h3>
                <p>{post && post[k]}</p>
              </div>
            );
          })}
        </div>
      </StyledPost>
    );
  }

  return null;
};

export default Post;
