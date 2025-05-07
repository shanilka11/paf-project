import React, { useState, useEffect } from 'react';
import { Button, Card, Collapse, Dropdown, Form } from 'react-bootstrap';
import axios from 'axios';
import { MdFavorite, MdShare, MdExpandMore, MdMoreVert, MdComment, MdSend } from 'react-icons/md';

export default function MealCard({ meal }) {
  const [expanded, setExpanded] = useState(false);
  const [showCommentField, setShowCommentField] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/comments/${meal.id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentIconClick = () => {
    setShowCommentField(!showCommentField);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/delete/${meal.id}`);
        window.location.reload();        
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditClick = () => {
    window.location.href = `meal/update/${meal.id}`;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:9000/addComment`, {
        mealId: meal.id,
        comment: newComment
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getTimeSincePost = () => {
    const postDate = new Date(meal.date);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - postDate;

    // Convert milliseconds to seconds
    const seconds = Math.floor(differenceInMilliseconds / 1000);

    if (seconds < 60) {
      return `posted ${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `posted ${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `posted ${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `posted ${days} days ago`;
    }
  };

  return (
    <Card style={{ width: '75%'}}>
      <Card.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: 'red',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                fontWeight: 'bold', // Added fontWeight to make the initial of the name bold
              }}
            >
              {meal.name.charAt(0).toUpperCase()} {/* Display the initial of the name */}
            </div>
            <div>
              <Card.Title>{meal.name}</Card.Title>
            </div>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle as={MdMoreVert} id="dropdown-basic" style={{ cursor: 'pointer' }} />
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditClick}>Edit Post</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>Delete Post</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>{meal.description}</Card.Text>
        <Card.Text>Calories: {meal.calories} | Servings: {meal.servings}</Card.Text>
      </Card.Body>
      
      <Card.Img
        variant="top"
        src={meal.imageURL}
        alt={meal.name}
        className="img-fluid rounded-0"
      />
      
      <Card.Footer>
        <div style={{ display: 'flex' }}>
          <Button variant="link" style={{ padding: '0', marginRight: '10px' }}>
            <MdFavorite />
          </Button>
          <Button variant="link" style={{ padding: '0' }}>
            <MdShare />
          </Button>
          <Button variant="link" style={{ marginRight: '10px' }} onClick={handleCommentIconClick}>
            <MdComment />
          </Button>
        </div>
        <Card.Text style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>{getTimeSincePost()}</Card.Text>
      </Card.Footer>
      
      <Collapse in={expanded}>
        <Card.Body>
          <Card.Title>Recipe:</Card.Title>
          <Card.Text>{meal.recipe}</Card.Text>
        </Card.Body>
      </Collapse>

      {/* Comment section */}
      <Collapse in={showCommentField}>
        <Card.Body>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="comment">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
          </Form>
          {/* Display the send button separately */}
          <Button variant="link" style={{ display: 'block', marginTop: '10px' }} onClick={handleCommentSubmit}>
            <MdSend />
          </Button>
        </Card.Body>
      </Collapse>
    </Card>
  );
}
