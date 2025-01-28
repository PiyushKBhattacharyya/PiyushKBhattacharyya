import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em', // Default size for desktop
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', // Ensure everything is centered on all screens
    padding: '20px', // Add padding for mobile
  },
  typewriterContainer: {
    display: 'flex',
    flexDirection: 'row', // Ensure "I'm" and Typewriter are on the same line
    alignItems: 'center',  // Align vertically at the center
    justifyContent: 'center', // Center horizontally
  },
  typewriterText: {
    fontSize: '2.5em', // Adjust Typewriter font size for better alignment with "I'm"
    lineHeight: '1',    // Remove any unwanted spacing between lines
  },
  inlineText: {
    fontSize: '2.5em', // Match "I'm" size with the Typewriter
    lineHeight: '1',   // Remove any unwanted spacing between lines
  },
};

function Home() {
  const [data, setData] = useState(null);

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
      <div style={styles.mainContainer}>
        {/* Adjust the name size based on screen width */}
        <h1 style={{ ...styles.nameStyle, fontSize: window.innerWidth < 768 ? '3em' : '5em' }}>
          {data?.name}
        </h1>

        <div style={styles.typewriterContainer}>
          <h2 style={styles.inlineText}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
            style={styles.typewriterText}
          />
        </div>

        <Social />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;