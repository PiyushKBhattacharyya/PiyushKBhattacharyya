import React, { useContext } from 'react';
import { Button, Card, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const BadgeStyled = styled(Badge)`
  padding: 5px 10px;
  margin: 5px;
`;

const CardStyled = styled(Card)`
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBackground};
  border-color: ${(props) => props.theme.cardBorderColor};
`;

const CardTitleStyled = styled(Card.Title)`
  font-size: 24px;
  font-weight: 700;
`;

const CardTextStyled = styled(Card.Text)`
  text-align: left;
`;

const ButtonStyled = styled(Button)`
  margin: 5px;
`;

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  if (!project) return null;

  const { title, bodyText, image, links, tags } = project;

  return (
    <Col>
      <CardStyled text={theme.bsSecondaryVariant}>
        {image && <Card.Img variant="top" src={image} />}
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
            {tags.map((tag) => (
              <BadgeStyled key={tag} pill bg={theme.bsSecondaryVariant} text={theme.bsPrimaryVariant}>
                {tag}
              </BadgeStyled>
            ))}
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
