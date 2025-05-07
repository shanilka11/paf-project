import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import axios from 'axios';

function AddPhotosVideos() {
  const [numPhotos, setNumPhotos] = useState(0);
  const [numVideos, setNumVideos] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBAqn_Zd8L9vVriJRVkbe26PMMJHint1fU",
    authDomain: "paf-socialmedia-c2a9e.firebaseapp.com",
    projectId: "paf-socialmedia-c2a9e",
    storageBucket: "paf-socialmedia-c2a9e.appspot.com",
    messagingSenderId: "846008854427",
    appId: "1:846008854427:web:f7cfe29b05306cfb39233e",
    measurementId: "G-J9QFJ62HLN"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const storageRef = firebase.storage().ref();

  const addData = async (e) => {
    e.preventDefault();
    try {
      const promises = selectedFiles.map((file) => {
        const fileRef = storageRef.child(file.name);
        const uploadTask = fileRef.put(file);
        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(`Upload is ${progress}% done`);
              setUploadProgress(progress);
            },
            (error) => {
              console.error(error);
              reject(`Failed to upload file ${file.name}: ${error.message}`);
            },
            async () => {
              try {
                const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('File uploaded successfully. Download URL:', downloadUrl);
                resolve(downloadUrl);
              } catch (error) {
                console.error(error);
                reject(`Failed to get download URL for file ${file.name}: ${error.message}`);
              }
            }
          );
        });
      });
  
      Promise.all(promises)
        .then((downloadUrls) => {
          // Here you can use downloadUrls array containing download URLs of all uploaded files
          console.log('All files uploaded successfully', downloadUrls);
          // Now you can proceed to save other data with these download URLs
          AddingData(downloadUrls);
        })
        .catch((error) => {
          console.error(error);
          alert(`Failed to upload files: ${error}`);
        });
    } catch (error) {
      console.error(error);
      alert(`Failed to upload files: ${error}`);
    }
  };
  
  const AddingData = (downloadUrls) => {
    const postData = {
      url: downloadUrls,
      description: textValue
    };
  
    axios.post('http://localhost:9000/post/add', postData)
      .then((response) => {
        console.log('Data Added:', response.data);
        // Clear state after successful upload
        setUploadProgress(0);
        setTextValue('');
        setSelectedFiles([]);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    let photoCount = 0;
    let videoCount = 0;

    // Count the number of photos and videos
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image')) {
        photoCount++;
      } else if (files[i].type.startsWith('video')) {
        videoCount++;
      }
    }

    // Allow up to 3 photos
    if (photoCount > 3) {
      event.preventDefault(); // Prevent additional photo uploads
      alert('Only 3 photos are allowed.');
      setSelectedFiles([]);
    }

    // Update the number of photos and videos
    setNumPhotos(photoCount);
    setNumVideos(videoCount);

    // Store selected files
    setSelectedFiles(Array.from(files));
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <Container className="d-flex flex-column align-items-center" style={{ marginTop: '10%' }}>
      <div className="border p-3 mt-3" style={{ height: '70%', width: '70%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bolder',margin:'40px'}}>
    Add post
</div>
        <div>
          <FormControl
            as="textarea"
            placeholder="Add Your "
            value={textValue}
            onChange={handleTextChange}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Upload files</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} multiple />
            <Form.Text>{`${numPhotos} photos selected, ${numVideos} videos selected`}</Form.Text>
          </Form.Group>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="primary" onClick={addData}>Add</Button>
          <Button variant="danger" style={{ marginLeft: '20px' }}>Clear</Button>
        </div>

        {uploadProgress > 0 && uploadProgress <= 100 && (
          <div style={{ margin: '30px' }}>
            <ProgressBar variant="success" now={uploadProgress} />
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex' }}>
          {selectedFiles && selectedFiles.map((file, index) => (
            <div key={index}>
              {file.type.startsWith('image') && (
                <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              )}
              {file.type.startsWith('video') && (
                <video controls src={URL.createObjectURL(file)} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default AddPhotosVideos;
