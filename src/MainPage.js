import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';

function MainPage() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    fetchComments();
    fetchQuestion();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://cmsback-f02e.onrender.com/api/comments/approved');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('https://cmsback-f02e.onrender.com/api/question');
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://cmsback-f02e.onrender.com/api/comments', { comment });
      if (response.status === 201) {
        alert('Comment submitted and pending approval.');
        setComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <h1>CMS People Opinion App</h1>
      <h2>{question}</h2>
      <div className="textarea-container">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />
      </div>
      <button onClick={handleSubmit}>Submit Comment</button>
      <div className="admin-login-link">
        <Link to="/admin">
          <button>Admin Login</button>
        </Link>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.comment}</p>
            {comment.adminReply && <p className="admin-reply">Admin Reply: {comment.adminReply}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;