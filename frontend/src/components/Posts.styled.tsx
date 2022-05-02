import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';

const StyledPosts = styled.div`
  width: 100%;
`;

const StyledTable = styled.table`
  width: calc(100% + 2rem);
  margin-left: -1rem;
  border-collapse: collapse;
  thead {
    background-color: rgba(255, 255, 255, 0.05);
    outline: none;
    tr {
      outline: none;
      th {
        padding-left: 1rem;
        padding: 0.5rem;
        text-align: left;
        font-weight: 400;
        font-size: 1.2rem;
        &:first-child {
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
        }
        &:last-child {
          padding: 0.5rem 1.5rem 0.5rem 0.5rem;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        /* padding: 0.5rem; */
        text-align: left;
        font-weight: 300;
        font-size: 1rem;
        &:first-child {
          a {
            padding: 1rem 0.5rem 1rem 1.5rem;
          }
        }
        &:last-child {
          a {
            padding: 1rem 1.5rem 1rem 0.5rem;
          }
        }
        a {
          padding: 1rem 0.5rem;
          width: 100%;
          height: 100%;
          display: flex;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
        }
      }
      &:not(:last-child) {
        border-bottom: solid rgba(255, 255, 255, 0.1) 1px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
`;

const Posts = () => {
  const { token, setToken } = useToken();
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .post('http://localhost:5100/api/posts', { token })
      .then((res) => {
        // console.log(res);
        if (!res.data.isTokenValid) {
          setToken('');
          window.location.reload();
        }
        setPosts(res.data.posts);
        // console.log(res.data.posts);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [token]);

  const columns: any = {
    shoeModel: 'Shoe model',
    shoeColor: 'Shoe color',
    retailPrice: 'Retail price',
    resellPrice: 'Resell price',
    dateTime: 'Date time',
    dropType: 'Drop type',
    app: 'App',
  };

  function toBase64(arr: any) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
    );
  }

  return posts ? (
    <StyledPosts>
      <h1>Posts</h1>
      <br />
      <StyledTable>
        <thead>
          <tr>
            {Object.keys(columns).map((i: any) => {
              return <th key={i}>{columns[i]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.keys(posts).map((j: any) => {
            return (
              <tr key={j}>
                {Object.keys(columns).map((k: any) => {
                  if (k === 'dateTime') {
                    return (
                      <td key={k}>
                        <a href={`/posts/${posts[j]['_id']}`}>
                          {/* {posts[j][k]['day']}.{posts[j][k]['month']}.
                          {posts[j][k]['year']} {posts[j][k]['time']} */}
                        </a>
                      </td>
                    );
                  } else if (k === 'images') {
                    return (
                      <td key={k}>
                        <img
                          src={`data:image/png;base64,${toBase64(
                            JSON.parse(JSON.stringify(posts[j][k][0])).data
                          )}`}
                          alt="alt"
                        ></img>
                      </td>
                    );
                  }
                  return (
                    <td key={k}>
                      <a href={`/posts/${posts[j]['_id']}`}>{posts[j][k]}</a>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledPosts>
  ) : (
    <StyledPosts>
      <h1>Posts</h1>
      <br />
      <div>Loading...</div>
    </StyledPosts>
  );
};

export default Posts;
