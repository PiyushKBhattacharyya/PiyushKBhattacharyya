import React, { useContext } from 'react';
import { Button, Card, Badge, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

// Styled Components for custom styling and responsiveness
const BadgeStyled = styled(Badge)`
  padding: 5px 10px;
  margin: 5px;
`;

const CardStyled = styled(Card)`
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBackground};
  border-color: ${(props) => props.theme.cardBorderColor};
  margin-bottom: 20px; /* Add margin at the bottom for better spacing */
`;

const CardTitleStyled = styled(Card.Title)`
  font-size: 24px;
  font-weight: 700;
  @media (max-width: 767px) {
    font-size: 20px; /* Adjust font size on mobile */
  }
`;

const CardTextStyled = styled(Card.Text)`
  text-align: left;
  @media (max-width: 767px) {
    font-size: 14px; /* Adjust font size on mobile */
  }
`;

const ButtonStyled = styled(Button)`
  margin: 5px;
`;

const CardImgStyled = styled(Card.Img)`
  max-height: 200px;
  object-fit: cover;
  @media (max-width: 767px) {
    max-height: 150px; /* Adjust image size on mobile */
  }
`;

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  if (!project) return null;

  const { title, bodyText, image, links, tags } = project;

  return (
    <Col xs={12} sm={6} md={4} lg={3}> {/* Adjust for different screen sizes */}
      <CardStyled text={theme.bsSecondaryVariant}>
        {image && <CardImgStyled variant="top" src={image} />}
        <Card.Body>
          <CardTitleStyled>{title}</CardTitleStyled>
          <CardTextStyled>{parseBodyText(bodyText)}</CardTextStyled>
        </Card.Body>

        <Card.Body>
          {links?.map((link) => (
            <ButtonStyled
              key={link.href}
              variant={'outline-' + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </ButtonStyled>
          ))}
        </Card.Body>

        {tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            <Row>
              {tags.map((tag) => (
                <Col key={tag} xs="auto">
                  <BadgeStyled pill bg={theme.bsSecondaryVariant} text={theme.bsPrimaryVariant}>
                    {tag}
                  </BadgeStyled>
                </Col>
              ))}
            </Row>
          </Card.Footer>
        )}
      </CardStyled>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
