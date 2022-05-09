import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    async function run() {
      fetch('http://localhost:5100/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          setPosts(res.posts);
        });
    }
    run();
  }, [token]);

  const columns: any = {
    shoeModel: 'Shoe model',
    shoeColor: 'Shoe color',
    dateTime: 'Date time',
    dropType: 'Drop type',
    app: 'App',
  };

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
                {Object.keys(columns).map((k: any) => (
                  <React.Fragment key={k}>
                    {k === 'shoeModel' && (
                      <td>
                        <a href={`/posts/${posts[j]['_id']}`}>{posts[j][k]}</a>
                      </td>
                    )}
                    {k === 'shoeColor' && (
                      <td>
                        <a href={`/posts/${posts[j]['_id']}`}>{posts[j][k]}</a>
                      </td>
                    )}
                    {k === 'dateTime' && (
                      <td>
                        <a href={`/posts/${posts[j]['_id']}`}>
                          {/* {posts[j][k]['day']}.{posts[j][k]['month']}.
                        {posts[j][k]['year']} {posts[j][k]['time']} */}
                        </a>
                      </td>
                    )}
                    {k === 'dropType' && (
                      <td>
                        <a href={`/posts/${posts[j]['_id']}`}>{posts[j][k]}</a>
                      </td>
                    )}
                    {k === 'app' && (
                      <td>
                        <a href={`/posts/${posts[j]['_id']}`}>{posts[j][k]}</a>
                      </td>
                    )}
                  </React.Fragment>
                ))}
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
