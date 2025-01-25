import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));

    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (screenWidth >= 576 && screenWidth < 768) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('90vw');
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('75vw');
      } else {
        setMode('VERTICAL_ALTERNATING');
        setWidth('50vw');
      }
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize); // Listen to window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.education}
                cardHeight={250}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.chronoTheme.titleColor,
                }}
              >
                <div className="chrono-icons">
                  {data.education.map((education) =>
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                        className="education-icon"
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}

      {/* Additional CSS for better responsiveness */}
      <style jsx>{`
        .section-content-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 10px;
        }

        .education-icon {
          max-width: 50px;
          height: auto;
        }

        @media (max-width: 576px) {
          .section-content-container {
            width: 95vw;
          }

          .education-icon {
            max-width: 40px;
          }
        }
      `}</style>
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
