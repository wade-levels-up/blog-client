import React from "react";
import { useState } from "react"
import styled from "styled-components";
import { format } from "date-fns"

const StyledLi = styled.li`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    width: 100%;

    & span {
        display: flex;
        background-color: slategray;
        justify-content: space-between;
        padding: 3px;
    }

    & p {
        max-width: 100%;
        word-break: break-all;
        text-wrap: pretty;
        hyphens: auto;
    }

    & span div:nth-child(2) {
        display: flex;
        gap: 6px;
    }

    & button {
        padding: 2px 6px;
    }

    & form {
        width: 100%;
    }

    & form div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    & form div button {
        width: fit-content;
    }

    & form textarea {
        padding: 2px;
        width: 100%;
        background-color: aliceblue;
        font-family: inherit;
        font-size: 16px;
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
    }
`

const Comment = ({username, comment, getComments, deleteComment}) => {
    const [content, setContent] = useState(comment.content);
    const [beingEdited, setBeingEdited] = useState(false)

    function handleEditComment() {
        if (beingEdited === false) {
            setBeingEdited(true)
        } else {
            setBeingEdited(false)
        }
    }

    async function handleEditSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:3000/users/${username}/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ content }),
        }).catch(error => console.error(error));
        setBeingEdited(false);
        getComments()
    }
    
    return (
        <StyledLi>
            <span>
                <div>{comment.username}</div>
                <div>
                    <p>{format(comment.created, 'dd.M.yy')}</p>
                    {username === comment.username && <button title="Edit Comment" onClick={handleEditComment}><i className="fa-solid fa-pencil"></i></button>}
                    {username === comment.username && <button title="Delete Comment" onClick={() => deleteComment(comment.id)}><i className="fa-solid fa-trash"></i></button>}
                </div>   
            </span>
            {beingEdited === false ? 
            (<p>{comment.content}</p>) : 
            (<form onSubmit={handleEditSubmit}>
                <label hidden htmlFor="content"></label>
                <div>
                    <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                    <button>Save</button>
                </div>
            </form>)}
        </StyledLi>
    )
}

export default Comment;