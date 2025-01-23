import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { set } from "mongoose";




export default function PostEntryPage() {




    const { id } = useParams();
    const [ postInfo, setPostInfo] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [ redirect, setRedirect] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://host-5kkf.onrender.com/post/${id}`);
                const data = await response.json();
                setPostInfo(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [id]);

    if(redirect) {
        return <Navigate to = "/" />
    }

    async function deletePost() {
        const response = await fetch('https://host-5kkf.onrender.com/post', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (response.status === 200) {
            alert('Post Deleted');
            setRedirect(true);
        } else {
            alert('Failed to delete post');
        }
    }



    if (!postInfo) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className = "author">By {postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="admin-controls">
                    <Link to = {`/edit/${id}`}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={deletePost}>Del</button>
                </div>
            )}
            <div className="image">
                <img src={"https://host-5kkf.onrender.com/" + postInfo.cover} alt="Blog Post 404" />
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
    )

}