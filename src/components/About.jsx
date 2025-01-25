import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row className="align-items-center justify-content-center">
                {/* Text Column */}
                <Col xs={12} md={8} className="text-container">
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Col>

                {/* Image Column */}
                <Col xs={12} md={8} className="image-container">
                  <img src={data?.imageSource} alt="profile" className="responsive-image" />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .text-container {
          font-size: 1.2em;
          font-weight: 500;
          text-align: center; /* Center text for desktop */
          margin: 10px;
        }

        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
        }

        .responsive-image {
          width: 150px; /* Fixed size for cropping */
          height: 150px; /* Fixed size for cropping */
          object-fit: cover; /* Crop the image to fit the container */
          border-radius: 50%; /* Circular frame */
          border: 5px solid #fff; /* Optional: Add a border for the circular frame */
        }

        @media (max-width: 768px) {
          .text-container {
            text-align: left; /* Align text to left for mobile */
            font-size: 1em;
          }

          .image-container {
            margin-top: 20px;
          }

          .responsive-image {
            width: 120px; /* Adjust size for mobile */
            height: 120px; /* Adjust size for mobile */
          }
        }
      `}</style>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
