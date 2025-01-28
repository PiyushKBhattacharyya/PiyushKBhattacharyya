import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const previewStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  transform: 'translate(-50%, -50%) scale(0.2)',  // Shrinks the content for preview
  zIndex: 999,
  backgroundColor: '#f7f7f7',
  padding: '10px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '250px', // Max size for the preview box
  overflow: 'hidden',
};

const styles = {
  nameStyle: {
    fontSize: '5em', // Default size for desktop
    transition: 'text-shadow 0.3s ease-in-out',
  },
  nameGlowStyle: {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',  // For positioning the preview box
  },
  typewriterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typewriterText: {
    fontSize: '2.5em',
    lineHeight: '1',
  },
  inlineText: {
    fontSize: '2.5em',
    lineHeight: '1',
  },
};

function TabContent({ title, roles, children, showPreview, setShowPreview }) {
  return (
    <div
      style={{ ...styles.mainContainer }}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <h1
        style={{
          ...styles.nameStyle,
          fontSize: window.innerWidth < 768 ? '3em' : '5em',
          ...(title ? styles.nameGlowStyle : {}),
        }}
        onMouseEnter={(e) => e.target.style.textShadow = styles.nameGlowStyle.textShadow}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        {title}
      </h1>

      <div style={styles.typewriterContainer}>
        <h2 style={styles.inlineText}>I&apos;m&nbsp;</h2>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: roles,
          }}
          style={styles.typewriterText}
        />
      </div>

      {children}

      {/* Live Preview Box */}
      {showPreview && (
        <div style={previewStyles}>
          <h1>{title}</h1>
          <p>I'm&nbsp;
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: roles,
              }}
              style={styles.typewriterText}
            />
          </p>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [data, setData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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
      <TabContent
        title={data?.name}
        roles={data?.roles}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      >
        <Social />
      </TabContent>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
