import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Example logos
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const styles = {
  iconStyle: {
    fontSize: '2.5em',
    margin: '0 15px',
    transition: 'transform 0.3s ease', // Smooth transition for zoom effect
  },
  iconHoverStyle: {
    transform: 'scale(0.9)', // Zoom out the icon when hovered
  },
};

function Social() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="github-tooltip">GitHub</Tooltip>}
      >
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.iconStyle }}
          onMouseEnter={(e) => (e.target.style.transform = styles.iconHoverStyle.transform)}
          onMouseLeave={(e) => (e.target.style.transform = 'none')} // Reset zoom on hover out
        >
          <FaGithub />
        </a>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="linkedin-tooltip">LinkedIn</Tooltip>}
      >
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.iconStyle }}
          onMouseEnter={(e) => (e.target.style.transform = styles.iconHoverStyle.transform)}
          onMouseLeave={(e) => (e.target.style.transform = 'none')} // Reset zoom on hover out
        >
          <FaLinkedin />
        </a>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="twitter-tooltip">Twitter</Tooltip>}
      >
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.iconStyle }}
          onMouseEnter={(e) => (e.target.style.transform = styles.iconHoverStyle.transform)}
          onMouseLeave={(e) => (e.target.style.transform = 'none')} // Reset zoom on hover out
        >
          <FaTwitter />
        </a>
      </OverlayTrigger>
    </div>
  );
}

export default Social;
