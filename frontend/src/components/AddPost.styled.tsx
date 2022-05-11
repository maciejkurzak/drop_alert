import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';
import useToken from '../hooks/useToken';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import {
  TextInput,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Box,
  Space,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { RadioGroup, Radio } from '@mantine/core';
import React from 'react';

const StyledAddPost = styled.div`
  form {
    display: flex;
    flex-direction: column;
    .form-el {
      display: flex;
      flex-direction: column;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .app-select {
        input {
          width: 1rem;
          height: 1rem;
          border-radius: 0;
        }
        label {
          margin-left: 0.5rem;
          color: rgba(255, 255, 255, 0.75);
        }
      }
    }
    .form-el > .form-el-name {
      margin-bottom: 0.25rem;
      font-size: 1rem;
      color: rgba(255, 255, 255, 1);
    }
    .form-el > input[type='text'],
    .form-el > input[type='datetime-local'],
    button {
      max-width: 15rem;
      outline: none;
      border-radius: 0.5rem;
      padding: 0.3rem 0.5rem;
      color: rgba(255, 255, 255, 0.75);
      background-color: rgba(255, 255, 255, 0.05);
      border: solid 2px rgba(255, 255, 255, 0.25);
      font-size: 1rem;
      &:focus {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.1);
        border: solid 2px rgba(255, 255, 255, 0.5);
      }
      &:hover {
        border: solid 2px rgba(255, 255, 255, 0.5);
      }
      &:disabled {
        color: rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.05);
        border: solid 2px rgba(255, 255, 255, 0.25);
        cursor: not-allowed;
      }
    }
    button {
      cursor: pointer;
      padding: 0.5rem;
    }
    .dnd {
      margin-bottom: 1rem;
      .dnd-zone {
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 15rem;
        border: 2px solid #ffffff80;
        background-color: rgba(255, 255, 255, 0.05);
        border-style: dashed;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 0.8rem;
      }
    }
  }
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid #ffffff80;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 0.5rem;
  width: 100;
  height: 100;
  box-sizing: border-box;
  height: 100%;
  margin-bottom: 0.5rem;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  height: 100%;
  border-radius: 0.25rem;
`;

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
  max-height: 10rem;
`;

const columns: any = {
  shoeModel: 'Shoe model',
  shoeColor: 'Shoe color',
  retailPrice: 'Retail price',
  resellPrice: 'Resell price',
  dateTime: 'Post date and time',
  dropType: 'Drop type',
  app: 'App',
  images: 'Images',
};

let form = new FormData();
const AddPost = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  // const [formData, setFormData] = useState({});
  const [files, setFiles]: [any, any] = useState([]);

  const maxSize = 1048576 * 10;

  const redirectToCreatedPost = () => {
    navigate('/posts');
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    if (files.length !== 0) {
      for (const singleFile of files) {
        form.append('images', singleFile);
      }
      form.append('imagesCount', files.length);
    }

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
            redirectToCreatedPost();
          }, 1000);
        }
        return res.json();
      })
      .then((res) => {
        if (!res.ok) {
          if (res.error) {
            setError({ show: true, message: res.error });
          } else {
            setError({ show: true, message: 'Unknown error' });
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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);

      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png',
    minSize: 0,
    maxSize: maxSize,
    onDrop,
  });

  const thumbs = files.map((file: any) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img src={file.preview} alt="" />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  interface errorProps {
    show?: boolean;
    message?: string;
  }

  const [error, setError]: [errorProps, Dispatch<SetStateAction<errorProps>>] =
    useState({});

  return (
    <StyledAddPost>
      <SweetAlert
        show={error.show}
        title="Error"
        text={error.message}
        type="error"
        onConfirm={() => setError({ show: false, message: '' })}
      />
      <h1>Add Post</h1>
      <form>
        {Object.keys(columns).map((k: any) => {
          if (k === 'images') {
            return (
              <div key={k} className="form-el">
                <div className="form-el-name">{columns[k]}</div>{' '}
              </div>
            );
          } else if (k === 'dateTime') {
            return (
              <React.Fragment key={k}>
                <DatePicker
                  placeholder="Pick date"
                  label="Post date and time"
                  required
                  minDate={dayjs(new Date()).toDate()}
                  maxDate={dayjs(new Date())
                    .endOf('month')
                    .subtract(5, 'days')
                    .toDate()}
                  onChange={(e) => {
                    updateFormData(k, e);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'app') {
            return (
              <React.Fragment key={k}>
                <RadioGroup
                  key={k}
                  orientation="vertical"
                  label="App"
                  required
                  onChange={(e) => {
                    updateFormData(k, e);
                  }}
                >
                  <Radio
                    value="adidas CONFIRMED"
                    label="adidas CONFIRMED"
                    required
                  />
                  <Radio value="Nike SNKRS" label="Nike SNKRS" required />
                  <Radio value="Nike" label="Nike" required />
                </RadioGroup>
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'dropType') {
            return (
              <React.Fragment key={k}>
                <RadioGroup
                  key={k}
                  orientation="vertical"
                  label="Drop type"
                  required
                  onChange={(e) => {
                    updateFormData(k, e);
                  }}
                >
                  <Radio value="LEO" label="LEO" />
                  <Radio value="DAN" label="DAN" />
                  <Radio value="none" label="none" />
                </RadioGroup>
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'resellPrice') {
            return (
              <React.Fragment key={k}>
                <NumberInput
                  key={k}
                  required
                  label={columns[k]}
                  placeholder=""
                  hideControls
                  min={0}
                  onChange={(e: any) => {
                    updateFormData(k, e);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'retailPrice') {
            return (
              <React.Fragment key={k}>
                <NumberInput
                  key={k}
                  required
                  label={columns[k]}
                  placeholder=""
                  hideControls
                  min={0}
                  onChange={(e: any) => {
                    updateFormData(k, e);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={k}>
                <TextInput
                  key={k}
                  required
                  label={columns[k]}
                  placeholder=""
                  onChange={(e) => {
                    updateFormData(k, e.target.value);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          }
        })}
        <div className="dnd">
          <div {...getRootProps({ className: 'dnd-zone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>

          <ThumbsContainer>{thumbs}</ThumbsContainer>
        </div>
        <button disabled={false} onClick={submitForm}>
          Confirm
        </button>
      </form>
    </StyledAddPost>
  );
};

export default AddPost;
