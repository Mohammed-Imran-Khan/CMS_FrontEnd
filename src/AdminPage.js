import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingComments, setPendingComments] = useState([]);
  const [approvedComments, setApprovedComments] = useState([]);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    fetchComments();
    fetchQuestion();
  }, [loggedIn]);

  const fetchComments = async () => {
    try {
      const pendingResponse = await axios.get('https://cmsback-f02e.onrender.com/api/comments/pending');
      const approvedResponse = await axios.get('https://cmsback-f02e.onrender.com/api/comments/approved');
      setPendingComments(pendingResponse.data);
      setApprovedComments(approvedResponse.data);
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

  const updateQuestion = async () => {
    try {
      const baseUrl = 'https://cmsback-f02e.onrender.com'; // Base URL for your API
      await axios.patch(`${baseUrl}/api/question`, { question });
      fetchQuestion();
      alert('Question updated successfully.');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };


  const approveComment = async (commentId, approveWithReply) => {
    try {
      if (approveWithReply) {
        await axios.patch(`https://cmsback-f02e.onrender.com/api/comments/${commentId}`, {
          approved: true,
          adminReply: adminReply,
        });
      } else {
        await axios.patch(`https://cmsback-f02e.onrender.com/api/comments/${commentId}`, {
          approved: true,
        });
      }
      setAdminReply('');
      setReplyCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`https://cmsback-f02e.onrender.com/api/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'imran' && password === '1234') {
      setLoggedIn(true);
    }
  };

  const handleReplyChange = (e) => {
    setAdminReply(e.target.value);
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>CMS Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p></p>
          <p> Username: imran </p><p> Password: 1234</p>
        </form>

      </div>
    );
  }

  return (
    <div>
      <h1>CMS Admin Page</h1>
      <div>
        <h2>Edit Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={updateQuestion}>Update Question</button>
      </div>
      <div>
        <h2>Pending Comments</h2>
        {pendingComments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.comment}</p>
            {replyCommentId === comment._id ? (
              <>
                <textarea value={adminReply} onChange={handleReplyChange} placeholder="Enter your reply" />
                <button onClick={() => approveComment(comment._id, true)}>Approve with Reply</button>
              </>
            ) : (
              <>
                <button onClick={() => approveComment(comment._id, false)}>Approve</button>
                <button onClick={() => setReplyCommentId(comment._id)}>Approve with Reply</button>
              </>
            )}
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Approved Comments</h2>
        {approvedComments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.comment}</p>
            {comment.adminReply && <p>Admin Reply: {comment.adminReply}</p>}
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;