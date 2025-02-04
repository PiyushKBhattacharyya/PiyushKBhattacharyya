import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [timelineMode, setTimelineMode] = useState('left');

  useEffect(() => {
    fetch(endpoints.experiences)
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => console.error(err));

    const handleResize = () => {
      setTimelineMode(window.innerWidth < 768 ? 'alternate' : 'left');
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header title={header} />

      {data ? (
        <div className="section-content-container">
          <Container>
            <Timeline lineColor={theme.timelineLineColor} mode={timelineMode}>
              {data.map((item) => (
                <Fade key={item.title + item.dateText}>
                  <TimelineItem
                    dateText={item.dateText}
                    dateInnerStyle={{ background: theme.accentColor }}
                    style={styles.itemStyle}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    <h2 className="item-title">{item.title}</h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                        {item.subtitle}
                      </h4>
                      {item.workType && (
                        <h5 style={styles.inlineChild}>
                          &nbsp;· {item.workType}
                        </h5>
                      )}
                    </div>
                    <ul style={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <li key={point}>
                          <ReactMarkdown
                            children={point}
                            components={{ p: 'span' }}
                          />
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}

      {/* Responsive CSS */}
      <style jsx>{`
        .section-content-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 10px;
        }

        .item-title {
          font-size: 1.5em;
        }

        .timeline-date {
          white-space: normal; /* Allow date to wrap properly */
          word-wrap: break-word; /* Ensure long dates don't overflow */
          font-size: 1em; /* Adjust font size to avoid truncation */
        }

        @media (max-width: 768px) {
          .section-content-container {
            width: 90vw;
            padding: 5px;
          }

          .item-title {
            font-size: 1.2em;
          }

          ul {
            padding-left: 15px;
          }

          .timeline-date {
            font-size: 0.9em; /* Smaller font size on mobile */
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
