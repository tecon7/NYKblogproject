import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import CommentCard from './CommentCard'
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from './CommentForm';


function Article() {
  return (
    <div className='article'>
      <h2>Knicks Win Big in their Playoff Return!</h2>
      <em style={{'font-size': '20px'}}>Brunson's heroics powers team to Knicks first Game 1 road victory in over 20 years.</em>
      <br></br>
      <p>By Teddy Economou | April 16, 2023</p>
      <br></br>
      <img className="article-image" src={"https://imengine.prod.srp.navigacloud.com/?uuid=dd0c7504-87e0-591b-98e0-7122adda57a6&type=primary&q=72&width=1024"} />
      <p>Two of the grittiest teams in the league met for a widely anticipated playoff matchup that most fans and pundits felt would be a hard-fought and physical series. After watching game 1, physical might be an understatement. The Cavaliers might boast the league’s best defense, but the return of Julius Randle meant the Knicks had a presence that would dominate down low alongside center Mitchell Robinson. </p>
      <br></br>
      <p>There were questions and speculations abound in regards to not only Randle’s availability, but his effectiveness. Well those questions were quickly answered as Randle started 3-4 from the field, but more impressively played an extra aggressive brand of defense that seemed infectious for the entire team. Even RJ Barrett’s defense which has been a contentious point of emphasis was a bright spot. Although his shooting struggles continued as he finished the game on a woeful 2-12, including 1-5 from beyond the arc.</p>
      <br></br>
      <p>The Knicks late game savior, Jalen Brunson was sidelined for most of the first half after picking up 3 fouls, but as has been the case for most of the season, the Knicks bench came in and did what Wally described post-game as a “professional job.” It was sparked, by perhaps the second biggest signing of the season Josh Hart, who might have hit one of the biggest shots in Knicks playoff history if they go on to win this series. With the Knicks up 10 in the 4th quarter, the Cavs had one more run in them and after a Jarret Allen layup gave the Cavs their first lead since the 1st quarter, Knicks fans felt the doom and gloom that often besets this team in late game situations.</p>
      <br></br>
      <img className="article-image-2" src={"https://www.gannett-cdn.com/presto/2023/04/16/NABJ/e61d255d-2ea1-4787-8465-bee2e6a6cbe2-AP23106034580259.jpg?crop=5080,2858,x0,y258&width=660&height=372&format=pjpg&auto=webp"} />
      <br></br>
      <p>It actually seemed as if Hart had sprained his ankle on the play before so for him to hit a step-back three to put the Knicks back up by 2 with a minute left was the quintessential “heart” moment. How many clutch rebounds, big shots, and stellar defense can he continue to display? It has absolutely earned him a contract extension at the end of the season and Knicks management should make it a priority signing. </p>
      <br></br>
      <p>Although you can take away many positives from this win, the younger core of the Knicks clearly displayed some playoff jitters, but notably Immanuel Quickley. The potential sixth-man of the year winner, went 0-5 on the night and has often closed games in place of RJ this season. Darius Garland, however, torched Quickley on several possessions prompting fans to ask for RJ to sub back in and cover Cleveland’s guard.</p>
      <br></br>
      <p>Playoff basketball is played at a different pace than the regular season where halfcourt sets are valued and iso-heavy plays which are maligned, become the standard. More than any other sport, in the NBA playoffs, you need your guys to “go get me a bucket.” For all the flak Carmelo Anthony received during his time with the Knicks, the playoffs often serve as a reminder of what you have until it’s gone. </p>
      <br></br>
      <p>This might explain why the young core struggled, especially in Thib’s system of iso-heavy sets, Grimes and Quick not only got less touches, but faced a much more aggressive defense. That will be something to watch moving forward in this series. </p>
      <br></br>  
      <img className="article-image-2" src={"https://www.si.com/.image/t_share/MTk3MjgyNzUwMDk5NjI5MzMz/knicks-cavs-game-1.jpg"} />
      <br></br>
      <p>You may have noticed that I have yet to speak about perhaps the most important figure on the Cavaliers, Donovan Mitchell. Let’s paint a picture here, a starting lineup of Brunson, Mitchell, Hart, Randle, and Mitchell. Two of the best guards in this season playing on the same team as opposed to matching up against each other. The narratives speak for themselves: The Knicks had an opportunity to get fleeced by Danny Ainge this summer and give a significant trade for the All-Star guard. Regardless of where you stand in regards to the trade, it doesn’t stop the hot-take crowd such as Stephen A. Smith adding extra fuel to Mitchell’s performances. </p>
      <br></br>
      <p>Mitchell dropped a cool 38 points on 14-30 shooting and single-handedly carried the Cavs offense for significant portions of the game. It seems as if it’s going to take this sort of effort if the Cavs have any chance of keeping up in this series. For the Knicks, however, the recipe will be simple, continue to rely on Brunson and Randle, but be prepared. There’s no way the Cavs will continue to play one-on-one coverage on those two if the rest of the Knicks continue to struggle. Brunson should expect blitzes on screens and Randle should prepare for doubles in the post. This is what makes a playoff series so much more dynamic: the ebbs and flows of game to game adjustments. For one night though, Knicks fans rejoice, home court is ours regardless of Game 2.</p>
      </div>
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