import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
      <Link to={"/post/" + _id}>
      <img src={"https://host-5kkf.onrender.com/" + cover} alt="Blog Post 404" />
      </Link>
      </div>
      <div className="texts">
      <Link to={"/post/" + _id}>
      <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </Link>
      </div>
    </div>
  );
}