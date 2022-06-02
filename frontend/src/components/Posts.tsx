import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';

import { Loader, Center, Space, Table } from '@mantine/core';
import { Link } from 'react-router-dom';

const StyledPosts = styled.div`
  width: 100%;
`;

function Td({ children, to }: any) {
  // Conditionally wrapping content into a link
  const ContentTag = to ? Link : 'div';

  return (
    <td>
      <ContentTag
        style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
        to={`/posts/${to}`}
      >
        {children}
      </ContentTag>
    </td>
  );
}

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
          setPosts(
            res.posts.map((element: any) => (
              <tr key={element.shoeModel}>
                <Td to={element._id}>{element.shoeModel}</Td>
                <Td to={element._id}>{element.shoeColor}</Td>
                <Td to={element._id}>{element.date}</Td>
                <Td to={element._id}>{element.time}</Td>
                <Td to={element._id}>{element.dropType}</Td>
                <Td to={element._id}>{element.app}</Td>
              </tr>
            ))
          );
        });
    }
    run();
  }, [token]);

  const columns: any = {
    shoeModel: 'Shoe model',
    shoeColor: 'Shoe color',
    date: 'Date',
    time: 'Time',
    dropType: 'Drop type',
    app: 'App',
  };

  return posts ? (
    <StyledPosts>
      <h1>Posts</h1>
      <br />
      <Table verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            {Object.keys(columns).map((i: any) => {
              return <th key={i}>{columns[i]}</th>;
            })}
          </tr>
        </thead>
        <tbody>{posts}</tbody>
      </Table>
    </StyledPosts>
  ) : (
    <StyledPosts>
      <h1>Posts</h1>
      <Space h="md" />
      <Center style={{ width: '100%', height: '100%' }}>
        <Loader size="xl" />
      </Center>
    </StyledPosts>
  );
};

export default Posts;
