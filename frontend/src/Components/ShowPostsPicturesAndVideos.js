import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form,Card} from 'react-bootstrap';
import { FaRegThumbsUp } from 'react-icons/fa';
import { BsTrash, BsArchiveFill, BsChat, BsShare } from 'react-icons/bs';

function ShowPostsPicturesAndVideos() {
    const [allData, setAllData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [userId, setUserId] = useState('');
    const [postId, setPostId] = useState('');
    const [commentData, setCommentData] = useState([]);
    const [likeDataByUid, setLikeDataByUid] = useState([]);
    const[likeStatus,setLikeStatus]=useState(false);


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const getData = async () => {
        await axios.get('http://localhost:9000/post/getAll').then((response) => {
            setAllData(response.data);
            console.log("Data fetched", response.data); 
        }).catch((error) => {
            console.log("Data not fetched", error);
        })
        
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/post/delete/${id}`);
            getData(); // Refresh data after deletion
        } catch (err) {
            console.log("Data not deleted", err);
        }
    };

    const addLike = async (userId, postId, boolValue) => {
        const likeData = {
            userId: userId,
            postId: postId,
            likeStatus: boolValue
        }

        try {
            await axios.post(`http://localhost:9000/like/add`, likeData);
            // Refresh data after adding like
            console.log("Like added");
            setLikeDataByUid([...likeDataByUid, { user_id: userId, post_id: postId }]);
            getData();
        } catch (err) {
            console.log("Data not added", err);
        }
    }

    const getTimeElapsed = (postDate) => {
        const currentDate = new Date();
        const postTime = new Date(postDate);
        const timeDiff = Math.floor((currentDate.getTime() - postTime.getTime()) / 1000); // Convert milliseconds to seconds
        const hoursDiff = Math.floor(timeDiff / 3600); // Convert seconds to hours
        const daysDiff = Math.floor(hoursDiff / 24);
        if (daysDiff > 0) {
            return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
        } else if (hoursDiff > 0) {
            return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
        } else {
            return `${timeDiff} second${timeDiff !== 1 ? 's' : ''} ago`;
        }
    };

    const uid=1;

    const getLikedata=()=>{
        axios.get(`http://localhost:9000/like/getLikeData/${uid}`).then((response) => {
            setLikeDataByUid(response.data);
            console.log("Data fetched", response.data);
        }).catch((error) => {
            console.log("Data not fetched", error);
        })
    }

    useEffect(() => {
        getLikedata();
    }, []);
    

    const updateLike = (uid, pid) => {   
        console.log(uid);
        console.log(pid);    
        try{

            axios.put(`http://localhost:9000/like/update/${pid}/${uid}`)
                setLikeDataByUid(prevLikeData => [...prevLikeData, { user_id: uid, post_id: pid }]);   
                getLikedata();   
        }catch(err){
            console.log("Like not updated", err);
        }
           
    }
    

    const handleCommentSubmit = async (userId,postId) => {
        const commentData = {
            userId: userId,
            postId: postId,
            comment: commentContent
        }
      
        try{
            axios.post(`http://localhost:9000/comment/add`,commentData)
            console.log("Comment added");
            setCommentData(prevCommentData => [...prevCommentData, commentContent]);
        }catch(err){
            console.log("Comment not added", err);
        }
    };

    const getAllComments=async(postId)=>{
        try{
            const response = await axios.get(`http://localhost:9000/comment/allcomment/${postId}`);
           console.log(response.data);
            setCommentData(response.data);
        }catch(err){
            console.log("Comments not fetched", err);
        }
    }

    useEffect(() => {
        getAllComments(postId);
    }, []);

    
    const addComment=(userId,postId)=>{      
        setUserId(userId);
        setPostId(postId);
        getAllComments(postId);
        handleShowModal();   
    }

    return (
        <div className="container mt-4 justify-content-center">
            {allData.map(item => (
                <div key={item.postId} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{item.userName}</h5>
                        <div>
               <a href={`updatepost/${item.postId}`}>
                      <Button variant="primary" className="mr-2">
                                   <BsArchiveFill />
                     </Button>
                </a>
             <Button variant="danger" onClick={() => deleteData(item.postId)} style={{margin:'10px'}}>
                                    <BsTrash />
             </Button>

               </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{item.description}</p>
                        <div className="row justify-content-center">
    {item.url.map((url, index) => (
        <div key={index} className="col-md-4 mb-3">
            {url.includes('.mp4') ? (
                <video controls className="img-fluid">
                    <source src={url} type="video/mp4" style={{ width: '100%', height: '400px', objectFit: 'cover' }}/>
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={url} className="img-fluid custom-image" alt={`Image ${index}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            )}
        </div>
    ))}
</div>

                    </div>
                    <div className="card-footer d-flex justify-content-center">
                    <div style={{margin:'10px'}}>
                {/* Check if the current post has been liked by the user */}
                {likeDataByUid.some(like => like.post_id === item.postId && like.user_id === uid) ? (

                    <Button variant="primary">
                        <FaRegThumbsUp onClick={() => {updateLike(uid,item.postId) }}  /> Liked
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => { addLike(uid, item.postId, true) }}  >
                        <FaRegThumbsUp /> Like
                    </Button>
                )}
            </div>
                        
                        <div>
                            <Button variant="secondary" className="mr-2" onClick={()=>{addComment(1,item.postId)} }  style={{margin:'10px'}}><BsChat /> Comment</Button>
                            <Button variant="success"  style={{margin:'10px'}}><BsShare /> Share</Button>
                        </div>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Posted {getTimeElapsed(item.date)}</small>
                    </div>
                </div>
            ))}

            {/* Comment Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="commentContent">
                            
                        <Card style={{margin:'20px'}}>
                            <Card.Body >
                                {commentData.map((comment, index) => (
                                    <Card.Text key={index} style={{margin:'30px'}}>{comment}</Card.Text>
                                ))}
                            </Card.Body>
                        </Card>

                        <div style={{margin:'20px'}}>
                            <Form.Control as="textarea" rows={3} placeholder='Add Your Comment' onChange={(e) => setCommentContent(e.target.value)} />
                        </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={()=>{handleCommentSubmit(userId,postId)}}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowPostsPicturesAndVideos;
