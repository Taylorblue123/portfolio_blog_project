import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import image from '../image.png';

function IndexPage() {
  const [githubData, setGithubData] = useState(null);
  const [linkedinData, setLinkedinData] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]); // 新增状态

  useEffect(() => {
    // Fetch GitHub data
    fetch('https://api.github.com/users/taylorblue123')
      .then(response => response.json())
      .then(data => setGithubData(data));

    // Fetch GitHub Repos
    fetch('https://api.github.com/users/taylorblue123/repos')
      .then(response => response.json())
      .then(data => setGithubRepos(data));

    //TODO
    fetch('/api/linkedin')
      .then(response => response.json())
      .then(data => setLinkedinData(data));
  }, []);

  return (
    <>
      <header className="hero-section">
        <img src={image} alt="Wenxuan Wu" className="avatar" />
        <h1>Wenxuan Wu</h1>
        <p className="intro">
          <strong>Coder and Explorer</strong><br /><br />
          I am passionate about blending human-centric design to build innovative digital solutions. <br /><br />
          My research interests focus on Human-Computer Interaction, Social Computing, VR/AR, as well as Graphics & Vision—everything that can be perceived by or involves human interaction.<br /><br />
          My long-term mission for work is to leverage advanced technologies, including Mixed Reality and Generative AI, to create digital experiences that inspire and foster closer digital connections for all.
        </p>
      </header>

      <section className="grid-container">
        {/* Past Projects Tile */}
        <Link to="/past-projects" className="tile-link">
          <div className="tile" data-color="blue">
            <div className="tile-inner">
              <div className="tile-front">
                <i className="fas fa-project-diagram"></i>
                <h2>Past Projects</h2>
              </div>
              <div className="tile-back">
                <p>Explore my previous works and completed projects.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Ongoing Projects Tile */}
        <Link to="/ongoing-projects" className="tile-link">
          <div className="tile" data-color="green">
            <div className="tile-inner">
              <div className="tile-front">
                <i className="fas fa-spinner"></i>
                <h2>Ongoing Projects</h2>
              </div>
              <div className="tile-back">
                <p>Discover what I'm currently working on.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Work Experience Tile */}
        <Link to="/work-experience" className="tile-link">
          <div className="tile" data-color="pink">
            <div className="tile-inner">
              <div className="tile-front">
                <i className="fas fa-briefcase"></i>
                <h2>Work Experience</h2>
              </div>
              <div className="tile-back">
                <p>Learn about my professional background.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Insights & Blogs Tile */}
        <Link to="/insights-blogs" className="tile-link">
          <div className="tile" data-color="orange">
            <div className="tile-inner">
              <div className="tile-front">
                <i className="fas fa-blog"></i>
                <h2>Insights & Blogs</h2>
              </div>
              <div className="tile-back">
                <p>Read my thoughts and articles.</p>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="api-section">
        {githubData && (
          <div className="github-info">
            <h3>GitHub: {githubData.login}</h3>
            <a href={githubData.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </div>
        )}
        {githubRepos && githubRepos.length > 0 && (
          <div className="github-repos">
            {githubRepos.map(repo => (
              <div className="api-card" key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description"}</p>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View Repo</a>
              </div>
            ))}
          </div>
        )}
        {linkedinData && (
          <div className="linkedin-repos">
            <div className="api-card">
              <h3>LinkedIn</h3>
              <p>Name: {linkedinData.name}</p>
              <p>Headline: {linkedinData.headline}</p>
              <p>Location: {linkedinData.location}</p>
              <p>Industry: {linkedinData.industry}</p>
              <a href={linkedinData.profileUrl} target="_blank" rel="noopener noreferrer">View Profile</a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default IndexPage;
