import Card from 'react-bootstrap/Card';
import {useState} from 'react';
import CommentForm from './CommentForm';


function CommentCard({comment, replies, user, deleteComment, setComments, activeComment, setActiveComment, parentId = null, addComment, comments, users}) {

    const canReply = Boolean(user.id)
    const canEdit = user.id === comment.userId
    const canDelete = user.id === comment.userId
    const timezoneOffset = -5 * 60;
    const currentDate = new Date(Date.now() + timezoneOffset * 1000);
    const hour = currentDate.getHours() % 12 || 12;
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
    const amOrPm = currentDate.getHours() < 12 ? 'AM' : 'PM';
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${hour}:${minute}:${currentDate.getSeconds()} ${amOrPm}`;
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;

 function deleteComment(id) {
    fetch(`/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    setComments(prev => prev.filter(comment => {
        return comment.id !== id
    }))
  }

  function updateComment(text, id) {
    setComments(prevVal => prevVal.map(comment => {
      if (comment.id === id) {
        return {...comment, body: text};
      } else {
        return comment;
      }
    }));
    fetch(`/comments/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({body: text}),
    })
    .then(resp => resp.json())
    .then(updatedComment => {
      setComments(prevVal => prevVal.map(comment => {
        if (comment.id === updatedComment.id) {
          return updatedComment;
        } else {
          return comment;
        }
      }));
      setActiveComment(null);
    });
  }

    return (
       <div className='comment'>
        <div className='comment-image-container'>
  <img className='author-image' 
    src={comment.userId === user.id ? user.image_url : (Array.isArray(users) && users.length > 0 ? users.find(u => u.id === comment.userId).image_url : 'default_image_url')} 
    alt="User icon" 
  />
</div> 
        <div className='comment-right-part'>
            <div className='comment-content'>
                <div className='comment-author'>{ comment.userId === user.id ? user.username : comment.username }</div>
                <div>{comment.created_at === comment.created_at ? comment.created_at : formattedDate}</div>
            </div>
            {!isEditing && <div className='comment-text'>{comment.body}</div>}
            {isEditing && (
                <CommentForm 
                submitLabel="Update" 
                hasCancelButton 
                initialText={comment.body} 
                handleSubmit={(text) => updateComment(text, comment.id)} 
                handleCancel={() => setActiveComment(null)}/>
            )}
            <div className='comment-actions'>
                {canReply && <div className="comment-action" onClick={() => 
                    setActiveComment({id: comment.id, type: "replying"})}>Reply</div>}
                {canEdit && <div className="comment-action" onClick={() => 
                    setActiveComment({id: comment.id, type: "editing"})}>Edit</div>}
                {canDelete && <div className="comment-action" 
                onClick={() => deleteComment(comment.id)}>Delete</div>}
            </div>
            {isReplying && (
                <CommentForm 
                submitLabel="Reply" 
                handleSubmit={(text) => addComment(text, replyId)}
                />
            )}
            {replies.length > 0 && (
                <div className='replies'>
                    {replies.map(reply =>(
                        <CommentCard 
                         comment={reply}
                         key={reply.id}
                         replies={[]} 
                         user={user}
                         deleteComment={deleteComment}
                         users={users}
                         setComments={setComments}
                         activeComment={activeComment}
                         setActiveComment={setActiveComment}
                         parentId={comment.id} 
                         addComment={addComment}
                         updateComment={updateComment}/>
                    ))}
                </div>
            )}
       </div>
       </div>
      ) 
  }
  
  export default CommentCard