import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  miniPreview: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #ccc',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '250px',
    zIndex: '999',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    visibility: 'hidden', // Initially hidden
  },
  previewImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '10px',
  },
  previewText: {
    fontSize: '1.2em',
    textAlign: 'center',
  },
  previewTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

function Home() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={{ position: 'relative' }}>
        {/* Name Section */}
        <h1
          style={{ fontSize: '5em' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data?.name}
        </h1>

        {/* Typewriter Effect */}
        <div>
          <h2>I'm&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>

        {/* Miniature Preview */}
        {isHovered && (
          <div style={styles.miniPreview}>
            <div style={styles.previewTitle}>{data?.name}</div>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data?.roles,
              }}
              style={styles.previewText}
            />
            <img
              src={data?.imageSource}
              alt="preview-profile"
              style={styles.previewImage}
            />
          </div>
        )}
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

function About() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        About Me
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>About Me</div>
          <p style={styles.previewText}>{data?.about}</p>
          <img
            src={data?.imageSource}
            alt="profile-preview"
            style={styles.previewImage}
          />
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

function Skills() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Skills
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>Skills</div>
          <p style={styles.previewText}>{data?.skills}</p>
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

function Education() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Education
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>Education</div>
          <p style={styles.previewText}>{data?.education}</p>
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

function Experience() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.experience, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Experience
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>Experience</div>
          <p style={styles.previewText}>{data?.experience}</p>
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

function Projects() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Projects
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>Projects</div>
          <p style={styles.previewText}>{data?.projects}</p>
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

function Resume() {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(endpoints.resume, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ position: 'relative' }}>
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Resume
      </h1>

      {/* Miniature Preview */}
      {isHovered && (
        <div style={styles.miniPreview}>
          <div style={styles.previewTitle}>Resume</div>
          <p style={styles.previewText}>{data?.resume}</p>
        </div>
      )}
    </div>
  ) : <FallbackSpinner />;
}

export { Home, About, Skills, Education, Experience, Projects, Resume };
