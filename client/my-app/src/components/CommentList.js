import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import CommentCard from './CommentCard'
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from './CommentForm';


function Article() {
  return (
    <div className='article'>
      <h2>Knicks Win Big in Their Playoff Return!</h2>
      <br></br>
      <p>By Teddy Economou | April 16, 2023</p>
      <br></br>
      <img className="article-image" src={"https://nypost.com/wp-content/uploads/sites/2/2023/01/knicksbarrett.jpg"} />
      <p>The New York Knicks faced off against the Philadelphia 76ers last night in what was expected to be a thrilling matchup. The game did not disappoint as both teams battled it out until the final buzzer. In the end, the Knicks came out on top with a 100-97 victory.
The Knicks got off to a slow start, with the 76ers taking an early lead. However, the Knicks were able to rally and tie the game at halftime. The second half was a back-and-forth battle with both teams exchanging leads throughout the game.</p>
<br></br>
<p>One of the standout performers for the Knicks was Julius Randle. Randle had an impressive game, finishing with 23 points, 10 rebounds, and 7 assists. He was instrumental in leading the Knicks to victory, making clutch plays down the stretch.</p>
<p>The Knicks also got a solid performance from their bench, with Derrick Rose and Alec Burks providing a spark off the bench. Rose finished with 12 points, 3 rebounds, and 3 assists, while Burks added 13 points and 2 rebounds.</p>
<p>On the other side of the court, the 76ers were led by Joel Embiid, who finished with 20 points and 7 rebounds. However, Embiid struggled with foul trouble throughout the game, which limited his impact on the court.</p>
<br></br>
<p>The Knicks' defense was also a major factor in the victory, as they held the 76ers to just 97 points. The Knicks were able to disrupt the 76ers' offense with their physical play and aggressive defense.</p>
<p>Overall, it was a great team effort from the Knicks, as they were able to secure an important victory against a tough opponent. With this win, the Knicks move to 38-30 on the season and remain in the hunt for a playoff spot in the Eastern Conference.</p>    </div>
  )
}

function CommentList ({comments, setComments, user, deleteComment, users}) {
  const [activeComment, setActiveComment] = useState(null)

  const navigate = useNavigate()
  console.log(comments)
  const rootComments = comments.filter(
    (comment) => comment.parentId === null)
  const getReplies = username => {
    return comments.filter(comments => comments.parentId === username).sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }
  const addComment = (text, parent_id = null) => {
    const newComment = {
      body: text, 
      user_id: user.id,
      parent_id: parent_id,
      username: user.username,
      createdAt: new Date()
    }
    // console.log(newComment)
    fetch("/comments", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newComment),
    })
    .then((resp) => resp.json())
    .then((newComment) => {
      setComments([newComment, ...comments])
      setActiveComment(null)
      console.log(user)
    })
    
  }

    return (
<div className='comments'>
  <Article />
  <h2 className="comment-title" style={{color: 'white'}}>Comment Section</h2>
  <div className='comment-form-title' style={{color: 'white'}}>Post a New Comment</div>
  <CommentForm submitLabel="Post" handleSubmit={addComment}/>
  <div className='comments-container'>
      {rootComments.map(rootComment => (
          <CommentCard key={rootComment.id}
                       comments = {comments} 
                       comment={rootComment} 
                       replies={getReplies(rootComment.id)}
                       user={user}
                       deleteComment={deleteComment}
                       setComments={setComments}
                       activeComment={activeComment}
                       setActiveComment={setActiveComment}
                       addComment={addComment}
                       users={users}/>
      ))}
  </div>
</div>
    )
}
export default CommentList