import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function UpdatePostData() {
    const [IdByData, SetDataById] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [numPhotos, setNumPhotos] = useState(0);
    const [numVideos, setNumVideos] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [alertVariant, setAlertVariant] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const { id } = useParams();

    const getAlldataById = () => {
        axios.get(`http://localhost:9000/post/get/${id}`)
            .then((response) => {
                console.log(response.data);
                SetDataById(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAlldataById();
    }, []);


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
          updatedata(downloadUrls);
        })
        .catch((error) => {
          console.error(error);
          //setAlertVariant('danger');
          //setAlertMessage(`Failed to upload files: ${error}`);
        });
    } catch (error) {
      console.error(error);
      //setAlertVariant('danger');
      //setAlertMessage(`Failed to upload files: ${error}`);
    }
  };
  
  
    const updatedata = (downloadUrl) => {
        const postData = {
            description: description,
            url:downloadUrl
        };

        axios.put(`http://localhost:8080/post/update/${id}`, postData)
            .then((response) => {
                console.log('Data Updated:', response.data);
                setAlertVariant('success');
                setAlertMessage('Data updated successfully');
               // window.location.reload();
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                setAlertVariant('danger');
                setAlertMessage(`Error updating data: ${error}`);
            });
    }

    // File upload
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
            setAlertVariant('danger');
            setAlertMessage('Only 3 photos are allowed.');
            setSelectedFiles([]);
            window.location.reload();
        }

        // Update the number of photos and videos
        setNumPhotos(photoCount);
        setNumVideos(videoCount);

        // Store selected files
        setSelectedFiles(Array.from(files));
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bolder',marginTop:'40px'}}>Update Post</div>
            <Card style={{ margin: '100px' }}>
                {Array(IdByData).map((data, index) => (
                    <div key={index}>
                        <Card.Header>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label style={{ fontWeight: 'bolder', fontSize: '30px' }}>Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} placeholder={data.description} onChange={(e) => { setDescription(e.target.value) }} />
                                </Form.Group>
                            </Form>
                        </Card.Header>
                        <Card.Body>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'flex' }}>
                                    {data.url && data.url.map((url, i) => (
                                        <div key={i} style={{  width: '80%', height: '100%', margin: '20px' }}>
                                            <Card.Img variant="bottom" src={url} style={{height:'400px',objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginLeft: '100px', marginRight: '100px', marginTop: '30px' }}>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Label style={{ fontWeight: 'bolder' }}>Select New Images And Videos</Form.Label>
                                    <Form.Control type="file" multiple onChange={handleFileChange} />
                                </Form.Group>
                            </div>

                            <div>
                                <div style={{ marginTop: '20px', display: 'flex' }}>
                                    {selectedFiles.map((file, index) => (
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

                         <div style={{margin:'40px'}}>

                         {alertVariant && alertMessage && (
                                <Alert variant={alertVariant}>{alertMessage}</Alert>
                            )}

                         </div>
                            

                            <div style={{ display: 'flex', justifyContent: 'center' ,margin:'40px' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <Button variant="primary" onClick={addData}>Update</Button>
                                </div>
                                <div>
                                    <Button variant="danger">Cancel</Button>
                                </div>
                            </div>

                        </Card.Body>
                    </div>
                ))}
            </Card>
        </div>
    );
}

export default UpdatePostData;
