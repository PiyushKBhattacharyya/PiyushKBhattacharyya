import { Navbar, Nav, Container, Tooltip, OverlayTrigger } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
  tooltipStyle: {
    maxWidth: '200px', // Control max width of preview
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const renderTooltip = (preview) => (
    <Tooltip id="preview-tooltip" style={styles.tooltipStyle}>
      {preview ? preview : 'Preview not available'}
    </Tooltip>
  );

  return (
    <Navbar
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
    >
      <Container>
        {data?.logo && (
          <Navbar.Brand href="/">
            <img
              src={data?.logo?.source}
              className="d-inline-block align-top"
              alt="main logo"
              style={
                data?.logo?.height && data?.logo?.width
                  ? { height: data?.logo?.height, width: data?.logo?.width }
                  : styles.logoStyle
              }
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data
              && data.sections?.map((section, index) => (
                section?.type === 'link' ? (
                  <OverlayTrigger
                    key={section.title}
                    placement="bottom"
                    overlay={renderTooltip(section.preview)} // Assuming preview data is available
                  >
                    <ExternalNavLink
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setExpanded(false)}
                      className="navbar__link"
                      theme={theme}
                    >
                      {section.title}
                    </ExternalNavLink>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    key={section.title}
                    placement="bottom"
                    overlay={renderTooltip(section.preview)} // Assuming preview data is available
                  >
                    <InternalNavLink
                      onClick={() => setExpanded(false)}
                      exact={index === 0}
                      activeClassName="navbar__link--active"
                      className="navbar__link"
                      to={section.href}
                      theme={theme}
                    >
                      {section.title}
                    </InternalNavLink>
                  </OverlayTrigger>
                )
              ))}
          </Nav>
          <ThemeToggler
            onClick={() => setExpanded(false)}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
