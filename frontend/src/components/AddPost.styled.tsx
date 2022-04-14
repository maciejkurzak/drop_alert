import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../hooks/useToken';

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

const AddPost = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [formData, setFormData] = useState({});

  const redirectToCreatedPost = () => {
    navigate('/posts');
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    axios
      .post('http://localhost:5100/api/add-post', { token, formData })
      .then((res) => {
        if (!res.data.isTokenValid) {
          setToken('');
          window.location.reload();
        }
        if (res.data.status === 'success') {
          redirectToCreatedPost();
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const updateFormData = (name: any, data: any) => {
    const abc: any = formData;
    abc[name] = data;
    setFormData(abc);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const [files, setFiles]: [any, any] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img src={file.preview} alt="" />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <StyledAddPost>
      <h1>Add Post</h1>
      <form>
        {Object.keys(columns).map((k: any) => {
          return (
            <div key={k} className="form-el">
              <div className="form-el-name">{columns[k]}</div>
              {(k === 'dateTime' && (
                <input
                  type="datetime-local"
                  name="shoeModel"
                  onChange={(e) => {
                    updateFormData(k, e.target.value);
                  }}
                />
              )) ||
                (k === 'app' && (
                  <div className="app-select">
                    <input
                      type="radio"
                      name="shoeModel"
                      onChange={(e) => {
                        updateFormData(k, e.target.value);
                      }}
                      value="LEO"
                      id="LEO"
                    />
                    <label htmlFor="LEO">LEO</label>
                    <br />
                    <input
                      type="radio"
                      name="shoeModel"
                      onChange={(e) => {
                        updateFormData(k, e.target.value);
                      }}
                      value="DAN"
                      id="DAN"
                    />
                    <label htmlFor="DAN">DAN</label>
                    <br />
                    <input
                      type="radio"
                      name="shoeModel"
                      onChange={(e) => {
                        updateFormData(k, e.target.value);
                      }}
                      value="none"
                      id="none"
                    />
                    <label htmlFor="none">none</label>
                    <br />
                  </div>
                )) ||
                (k === 'images' && <></>) || (
                  <input
                    type="text"
                    name="shoeModel"
                    onChange={(e) => {
                      updateFormData(k, e.target.value);
                    }}
                  />
                )}
            </div>
          );
        })}

        <div className="dnd">
          <div {...getRootProps({ className: 'dnd-zone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <ThumbsContainer>{thumbs}</ThumbsContainer>
        </div>

        <button disabled={true} onClick={submitForm}>
          Confirm
        </button>
      </form>
    </StyledAddPost>
  );
};

export default AddPost;
