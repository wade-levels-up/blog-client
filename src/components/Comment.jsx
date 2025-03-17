import React from "react";
import { format } from "date-fns"

const Comment = ({username, comment, deleteComment}) => {
    return (
        <li>
            <span>
                <div>{comment.username}</div>
                <div>{format(comment.created, 'dd/M/yy')}</div>
                {username === comment.username && <button onClick={() => deleteComment(comment.id)}>Delete</button>}
            </span>
            <p>{comment.content}</p>
        </li>
    )
}

export default Comment;