import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import { useParams } from 'react-router-dom';

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

  const firstRender = useRef(0);

  const { postId } = useParams();

  // console.log(postId);

  useEffect(() => {
    axios
      .post(`http://localhost:5100/api/post/${postId}`, { token })
      .then((res) => {
        // console.log(res);
        if (!res.data.isTokenValid) {
          setToken('');
          window.location.reload();
        }
        setPost(res.data.posts);
        // console.log(res.data.posts);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [token]);

  useEffect(() => {
    if (firstRender.current <= 2) {
      firstRender.current++;
      if (post) {
        setImages([]);
        post['images'].forEach((el: any) => {
          setImages((images: any) => [...images, el]);
        });
      }
    }
  }, [images, post, setPost]);

  // setInterval(() => {
  //   console.log(post);
  // }, 3000);

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

  function toBase64(arr: any) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
    );
  }
  // if (post['images'].isArray)
  //   post['images'].forEach((el: any) => {
  //     console.log(el);
  //     images.push(el);
  //   })

  return post ? (
    <StyledPost>
      <h1>Post</h1>
      <br />
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
  ) : (
    <StyledPost>
      <h1>Loading</h1>
    </StyledPost>
  );
};

export default Post;
