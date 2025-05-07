import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaRegThumbsUp } from 'react-icons/fa';
import { BsChat, BsShare } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';

function ViewWorkoutStatus() {
    const [workoutStatuses, setWorkoutStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [likeDataByUid, setLikeDataByUid] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const uid = 1;

    useEffect(() => {
        fetchWorkoutStatuses();
    }, []);

    const calculateBMR = (gender, weight, height, age) => {
        if (gender === "male") {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === "female") {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            const maleBMR = calculateBMR("male", weight, height, age);
            const femaleBMR = calculateBMR("female", weight, height, age);
            return (maleBMR + femaleBMR) / 2;
        }
    };

    const calculateTDEE = (BMR, activityFactor = 1.55) => BMR * activityFactor;

    const recommendCalories = (gender, weight, height, age) => {
        const BMR = calculateBMR(gender, weight, height, age);
        const TDEE = calculateTDEE(BMR);
        
        let recommendedCalories;
        if (gender === "male") {
            if (weight >= 60 && weight < 70) {
                recommendedCalories = 2453;
            } else if (weight >= 70) {
                recommendedCalories = 2668;
            } else {
                recommendedCalories = TDEE;
            }
        } else if (gender === "female") {
            if (weight >= 50 && weight < 60) {
                recommendedCalories = 2055;
            } else if (weight >= 60) {
                recommendedCalories = 2171;
            } else {
                recommendedCalories = TDEE;
            }
        } else {
            recommendedCalories = TDEE;
        }
        
        let targetBurn;
        if (gender === "male") {
            targetBurn = recommendedCalories - 500;
        } else if (gender === "female") {
            targetBurn = recommendedCalories - 300;
        } else {
            targetBurn = recommendedCalories - 400;
        }
        
        return {
            recommendedCalories,
            targetBurn,
        };
    };

    const fetchWorkoutStatuses = async () => {
        try {
            const response = await axios.get('http://localhost:9000/workout/workouts');
            const updatedStatuses = response.data.map(status => {
                const { recommendedCalories, targetBurn } = recommendCalories(status.gender, status.weight, status.height, status.age);
                return { ...status, calories: recommendedCalories, targetBurn };
            });
            setWorkoutStatuses(updatedStatuses);
        } catch (error) {
            console.error('Error fetching workout status:', error);
        }
    };

    const fetchWorkoutStatusById = async (workoutStatusId) => {
        try {
            const response = await axios.get(`http://localhost:9000/workout/workout/${workoutStatusId}`);
            const status = response.data;
            const { recommendedCalories, targetBurn } = recommendCalories(status.gender, status.weight, status.height, status.age);
            setSelectedStatus({ ...status, calories: recommendedCalories, targetBurn });
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching workout status by ID", error);
        }
    };

    const updateWorkoutStatus = async (workoutStatusId, updatedStatus) => {
        try {
            if (typeof workoutStatusId !== 'number') {
                throw new Error(`Invalid workoutStatusId: ${workoutStatusId}`);
            }
            await updateWorkoutStatusOnServer(workoutStatusId, updatedStatus);
            updateWorkoutStatusLocally(workoutStatusId, updatedStatus);
            setShowModal(false);
        } catch (error) {
            handleUpdateError(error);
        }
    };

    const updateWorkoutStatusOnServer = async (workoutStatusId, updatedStatus) => {
        const url = `http://localhost:9000/workout/update/${workoutStatusId}`;
        await axios.put(url, updatedStatus);
    };

    const updateWorkoutStatusLocally = (workoutStatusId, updatedStatus) => {
        setWorkoutStatuses(prevStatuses =>
            prevStatuses.map(status =>
                status.workoutStatusId === workoutStatusId ? { ...status, ...updatedStatus } : status
            )
        );
    };

    const handleUpdateError = (error) => {
        console.error("Error updating workout status", error);
        alert(`Error updating workout status: ${error.message}`);
    };

    const deleteWorkoutStatus = async (workoutStatusId) => {
        try {
            const response = await axios.delete(`http://localhost:9000/workout/delete/${workoutStatusId}`);
            console.log("Workout status deleted", response);
            setWorkoutStatuses(prevStatuses => prevStatuses.filter(status => status.workoutStatusId !== workoutStatusId));
        } catch (error) {
            console.error("Error deleting workout status", error);
        }
    };

    const calculateProgress = (burned, target) => (burned / target) * 100;

    const handleClose = () => setShowModal(false);

    const handleCloseCommentModal = () => setShowCommentModal(false);

    const addLike = async (userId, postId, boolValue) => {
        const likeData = {
            userId: userId,
            postId: postId,
            likeStatus: boolValue
        }

        try {
            await axios.post(`http://localhost:9000/like/add`, likeData);
            console.log("Like added");
            setLikeDataByUid([...likeDataByUid, { user_id: userId, post_id: postId }]);
            fetchWorkoutStatuses();
        } catch (err) {
            console.log("Data not added", err);
        }
    }

    const updateLike = (uid, pid) => {
        try {
            axios.put(`http://localhost:9000/like/update/${pid}/{uid}`);
            setLikeDataByUid(prevLikeData => [...prevLikeData, { user_id: uid, post_id: pid }]);
            fetchWorkoutStatuses();
        } catch (err) {
            console.log("Like not updated", err);
        }
    }

    const handleCommentSubmit = async (userId, postId) => {
        const commentData = {
            userId: userId,
            postId: postId,
            comment: commentContent
        }

        try {
            await axios.post(`http://localhost:9000/comment/add`, commentData);
            console.log("Comment added");
            setCommentData(prevCommentData => [...prevCommentData, commentContent]);
        } catch (err) {
            console.log("Comment not added", err);
        }
    };

    const getAllComments = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:9000/comment/allcomment/{postId}`);
            setCommentData(response.data);
        } catch (err) {
            console.log("Comments not fetched", err);
        }
    }

    const addComment = (userId, postId) => {
        setShowCommentModal(true);
        setSelectedWorkout({ userId, postId });
        getAllComments(postId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedStatus(prevStatus => ({
            ...prevStatus,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        if (selectedStatus) {
            updateWorkoutStatus(selectedStatus.workoutStatusId, selectedStatus);
        }
    };

    return (
        <div className="container mt-4" style={{ width: '75%' }}>
            {workoutStatuses.length > 0 ? workoutStatuses.map(status => (
                <div key={status.workoutStatusId} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title">Workout Status #{status.workoutStatusId}</h5>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-info me-2" onClick={() => fetchWorkoutStatusById(status.workoutStatusId)}>
                                <i className="fas fa-eye"></i> View
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => deleteWorkoutStatus(status.workoutStatusId)}>
                                <i className="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
    <div className="card-body">
        <p className="card-text h3 mb-5">Weight: {status.weight} kg</p>
        <p className="card-text h3 mb-5">Height: {status.height} cm</p>
        <p className="card-text h3 mb-5">Age: {status.age} years</p>
        <p className="card-text h3 mb-5">Gender: {status.gender}</p>
        <p className="card-text h3 mb-4">Activity Level: {status.activity}</p>
        <p className="card-text h3 mb-4">Calories Needed: {status.calories} kcal</p>
    </div>
</div>

                        <div class="col-md-6">
                            <div className="card-body">
                                <CircularProgressbar 
                                    value={calculateProgress(status.calories, status.targetBurn)} 
                                    text={`${Math.round(calculateProgress(status.calories, status.targetBurn))}%`} 
                                    styles={buildStyles({
                                        pathColor: `rgba(62, 152, 199, ${calculateProgress(status.calories, status.targetBurn) / 100})`,
                                        textColor: '#3e98c7',
                                        trailColor: '#d6d6d6'
                                    })}
                                    className="me-2"
                                    style={{ width: 100, height: 100 }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        <div style={{ margin: '10px' }}>
                            {likeDataByUid.some(like => like.post_id === status.workoutStatusId && like.user_id === uid) ? (
                                <Button variant="primary">
                                    <FaRegThumbsUp onClick={() => { updateLike(uid, status.workoutStatusId) }} /> Liked
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={() => { addLike(uid, status.workoutStatusId, true) }} >
                                    <FaRegThumbsUp /> Like
                                </Button>
                            )}
                        </div>
                        <div>
                            <Button variant="secondary" className="me-2" onClick={() => { addComment(uid, status.workoutStatusId) }} style={{ margin: '10px' }}>
                                <BsChat /> Comment
                            </Button>
                            <Button variant="success" style={{ margin: '10px' }}><BsShare /> Share</Button>
                        </div>
                    </div>
                </div>
            )) : <p>No workout statuses found!!!!!!!!!!!!</p>}

        {/* Comment Modal */}
            <Modal show={showCommentModal} onHide={handleCloseCommentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="commentContent">
                            <Card style={{ margin: '20px' }}>
                                <Card.Body>
                                    {commentData.map((comment, index) => (
                                        <Card.Text key={index} style={{ margin: '30px' }}>{comment}</Card.Text>
                                    ))}
                                </Card.Body>
                            </Card>
                            <div style={{ margin: '20px' }}>
                                <Form.Control as="textarea" rows={3} placeholder='Add Your Comment' onChange={(e) => setCommentContent(e.target.value)} />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCommentModal}>Close</Button>
                    <Button variant="primary" onClick={() => { handleCommentSubmit(selectedWorkout?.userId, selectedWorkout?.postId) }}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Workout Status #{selectedStatus?.workoutStatusId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStatus && (
                        <form id="updateForm">
                            <div className="form-group">
                                <label>Weight</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="weight"
                                    value={selectedStatus.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Height</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="height"
                                    value={selectedStatus.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={selectedStatus.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="gender"
                                    value={selectedStatus.gender}
                                    onChange={handleChange}
                                />
                            </div>
                            <div classname="form-group">
                                <label>Activity Level</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="activity"
                                    value={selectedStatus.activity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Calories Needed</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="calories"
                                    value={selectedStatus.calories}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ViewWorkoutStatus;
