import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { At, User, Lock, UserCheck, Check, X } from 'tabler-icons-react';

import styled from 'styled-components';
import useToken from '../hooks/useToken';

import {
  TextInput,
  NumberInput,
  Button,
  Space,
  Center,
  Select,
  InputWrapper,
  Input,
  PasswordInput,
  Popover,
  Progress,
  Text,
  NativeSelect,
} from '@mantine/core';
import React from 'react';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <Check size={20} /> : <X size={20} />}&nbsp;{label}
    </Text>
  );
}
const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const StyledAddPost = styled.div`
  padding-right: 20px;
  .dnd {
    margin-bottom: 1rem;
    .dnd-zone {
      cursor: pointer;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 20rem;
      border: 2px solid #ffffff80;
      background-color: rgba(255, 255, 255, 0.05);
      border-style: dashed;
      border-radius: 0.5rem;
      padding: 1rem;
      font-size: 0.8rem;
    }
  }
`;

const columns: any = {
  email: 'Email address',
  username: 'Username',
  password: 'Password',
  role: 'Role',
};

let form = new FormData();
const AddUser = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const submitForm = (e: any) => {
    e.preventDefault();

    fetch('http://localhost:5100/api/add-post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })
      .then((res) => {
        console.log(res);
        if ([401, 403].includes(res.status)) {
          setToken('');
          window.location.reload();
        }
        if (res.ok) {
          setTimeout(() => {
            // redirectToCreatedPost();
          }, 1000);
        }
        return res.json();
      })
      .then((res) => {
        if (!res.ok) {
          if (res.error) {
            // setError({ show: true, message: res.error });
          } else {
            // setError({ show: true, message: 'Unknown error' });
          }
        }
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  const updateFormData = (name: any, data: any) => {
    form.set(name, data);
  };

  return (
    <StyledAddPost>
      {/* <SweetAlert
        show={error.show}
        title="Error"
        text={error.message}
        type="error"
        onConfirm={() => setError({ show: false, message: '' })}
      /> */}
      <h1>Add Post</h1>
      <Space h="md" />
      <form>
        {Object.keys(columns).map((k: any) => {
          if (k === 'email') {
            return (
              <React.Fragment key={k}>
                <InputWrapper
                  required
                  label={columns[k]}
                  // error="Email address is not valid"
                >
                  <Input
                    icon={<At size={16} />}
                    style={{ width: '20rem' }}
                    placeholder={columns[k]}
                    onChange={(e: any) => {
                      updateFormData(k, e.target.value);
                    }}
                  />
                </InputWrapper>
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'username') {
            return (
              <React.Fragment key={k}>
                <TextInput
                  key={k}
                  required
                  style={{ width: '20rem' }}
                  label={columns[k]}
                  placeholder={columns[k]}
                  icon={<User size={16} />}
                  onChange={(e: any) => {
                    updateFormData(k, e.target.value);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'password') {
            return (
              <React.Fragment key={k}>
                <Popover
                  opened={popoverOpened}
                  position="bottom"
                  placement="start"
                  withArrow
                  styles={{ popover: { width: '100%' } }}
                  trapFocus={false}
                  transition="pop-top-left"
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                  target={
                    <PasswordInput
                      required
                      style={{ width: '20rem' }}
                      icon={<Lock size={16} />}
                      label={columns[k]}
                      placeholder={columns[k]}
                      description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
                      value={value}
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
                        updateFormData(k, e.target.value);
                      }}
                    />
                  }
                >
                  <Progress
                    color={color}
                    value={strength}
                    size={5}
                    style={{ marginBottom: 10 }}
                  />
                  <PasswordRequirement
                    label="Includes at least 6 characters"
                    meets={value.length > 5}
                  />
                  {checks}
                </Popover>
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'role') {
            return (
              <React.Fragment key={k}>
                <NativeSelect
                  icon={<UserCheck size={16} />}
                  style={{ width: '20rem' }}
                  data={['user', 'admin']}
                  placeholder="Pick one"
                  label={columns[k]}
                  required
                  onChange={(e) => {
                    updateFormData(k, e.target.value);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
        <Button
          variant="filled"
          disabled={false}
          onClick={submitForm}
          style={{ maxWidth: '15rem' }}
        >
          Add User
        </Button>
      </form>
    </StyledAddPost>
  );
};

export default AddUser;
