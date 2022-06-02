import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

import {
  Calendar,
  Clock,
  ColorSwatch,
  CurrencyDollar,
  DeviceMobile,
} from 'tabler-icons-react';

import styled from 'styled-components';
import useToken from '../hooks/useToken';

import {
  TextInput,
  NumberInput,
  Button,
  Space,
  Center,
  Select,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import React from 'react';

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
  }
`;

const ThumbsContainer = styled.aside`
  min-height: 10rem;
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
  date: 'Drop date',
  time: 'Drop time',
  dropType: 'Drop type',
  app: 'App',
  images: 'Images',
};

let form = new FormData();
const AddPost = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
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
          if (k === 'images') {
            return (
              <div key={k} className="form-el">
                <div className="form-el-name">{columns[k]}</div>{' '}
              </div>
            );
          } else if (k === 'date') {
            return (
              <React.Fragment key={k}>
                <DatePicker
                  placeholder="Pick date"
                  label="Drop date"
                  required
                  style={{ width: '20rem' }}
                  icon={<Calendar size={16} />}
                  minDate={dayjs(new Date()).toDate()}
                  maxDate={dayjs(new Date()).add(30, 'days').toDate()}
                  locale="pl"
                  inputFormat="DD MMMM YYYY"
                  labelFormat="DD MMMM YYYY"
                  clearable={false}
                  onChange={(e: any) => {
                    const date = e
                      ? `${
                          e.getDate() < 10 ? '0' + e.getDate() : e.getDate()
                        }.${
                          e.getMonth() < 9
                            ? '0' + (e.getMonth() + 1)
                            : e.getMonth() + 1
                        }.${e.getFullYear()}`
                      : '';
                    updateFormData(k, date);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'time') {
            return (
              <React.Fragment key={k}>
                <TimeInput
                  label="Drop time"
                  required
                  style={{ width: '20rem' }}
                  icon={<Clock size={16} />}
                  onChange={(e) => {
                    const time = `${
                      e.getHours() < 10 ? '0' + e.getHours() : e.getHours()
                    }:${
                      e.getMinutes() < 10
                        ? '0' + e.getMinutes()
                        : e.getMinutes()
                    }`;
                    updateFormData(k, time);
                  }}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'app') {
            return (
              <React.Fragment key={k}>
                <Select
                  label="App"
                  placeholder="Pick one"
                  style={{ width: '20rem' }}
                  onChange={(e) => {
                    updateFormData(k, e);
                  }}
                  icon={<DeviceMobile size={16} />}
                  data={[
                    { value: 'adidas CONFIRMED', label: 'adidas CONFIRMED' },
                    { value: 'Nike SNKRS', label: 'Nike SNKRS' },
                    { value: 'Nike', label: 'Nike' },
                  ]}
                />
                <Space h="sm" />
              </React.Fragment>
            );
          } else if (k === 'dropType') {
            return (
              <React.Fragment key={k}>
                <Select
                  label="Drop type"
                  placeholder="Pick one"
                  style={{ width: '20rem' }}
                  onChange={(e) => {
                    updateFormData(k, e);
                  }}
                  icon={<ColorSwatch size={16} />}
                  data={[
                    { value: 'LEO', label: 'LEO' },
                    { value: 'DAN', label: 'DAN' },
                    { value: '', label: 'none' },
                  ]}
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
                  icon={<CurrencyDollar size={16} />}
                  style={{ width: '20rem' }}
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
          } else if (k === 'resellPrice') {
            return (
              <React.Fragment key={k}>
                <NumberInput
                  key={k}
                  required
                  style={{ width: '20rem' }}
                  label={columns[k]}
                  placeholder=""
                  hideControls
                  min={0}
                  icon={<CurrencyDollar size={16} />}
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
                  style={{ width: '20rem' }}
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
          {thumbs.length > 0 ? (
            <ThumbsContainer>{thumbs}</ThumbsContainer>
          ) : (
            <ThumbsContainer>
              <Center style={{ width: '100%' }}>No images uploaded</Center>
            </ThumbsContainer>
          )}
        </div>
        <Button
          variant="filled"
          disabled={false}
          onClick={submitForm}
          style={{ maxWidth: '15rem' }}
        >
          Add Post
        </Button>
      </form>
    </StyledAddPost>
  );
};

export default AddPost;
