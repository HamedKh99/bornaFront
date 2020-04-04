import PropTypes from "prop-types";
import React, { Component } from "react";
import { Element, scroller } from "react-scroll";
import Fade from "react-reveal/Fade";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

import { BASE_IP } from "../utils/api";
import { getHomepage } from "../utils/requests/home";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = ({ heading, mobile }) => (
  <Container text>
    <Header
      as="h1"
      content={heading.title}
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content={heading.motto}
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  scrollToIntroduction = () => {
    scroller.scrollTo("introduction", {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  scrollToSections = () => {
    scroller.scrollTo("sections", {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  scrollToContactUs = () => {
    scroller.scrollTo("contactus", {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  render() {
    const { children, heading } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item>
                  <Button as="a" inverted={!fixed}>
                    ورود
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    ثبت نام
                  </Button>
                </Menu.Item>
                <Menu.Menu position="right" style={{ borderStyle: "none" }}>
                  <Menu.Item onClick={this.scrollToContactUs} as="a">
                    تماس با ما
                  </Menu.Item>
                  <Menu.Item onClick={this.scrollToSections} as="a">
                    بخش ها
                  </Menu.Item>
                  <Menu.Item onClick={this.scrollToIntroduction} as="a">
                    معرفی
                  </Menu.Item>
                  <Menu.Item>
                    <Image size="mini" src="images/logo.png" />
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
            <HomepageHeading heading={heading} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, heading } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
          direction="right"
        >
          <Menu.Item as="a">ورود</Menu.Item>
          <Menu.Item as="a">ثبت نام</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item>
                  <Button as="a" inverted>
                    ورود
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    ثبت نام
                  </Button>
                </Menu.Item>
                <Menu.Item position="right" onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading heading={heading} mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ heading, children }) => (
  <div>
    <DesktopContainer heading={heading}>{children}</DesktopContainer>
    <MobileContainer heading={heading}>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

class Home extends Component {
  state = {
    sectionsVisibility: [false, false, false, false, false],
  };

  static async getInitialProps() {
    const res = await getHomepage();
    return {
      heading: res.data.heading,
      introduction: res.data.introduction,
      sections: res.data.sections,
      contactUs: res.data.contact_us,
      socialNetworks: res.data.social_networks,
    };
  }

  renderSection = (section, index) => {
    if (index % 2 == 0) {
      return (
        <Grid.Row>
          <Grid.Column textAlign="center" width={8}>
            <Fade left>
              <Header inverted as="h3" style={{ fontSize: "2em" }}>
                {section.title}
              </Header>
              <p style={{ fontSize: "1.33em" }}>{section.description}</p>
              <a href={"/" + section.link_to}>
                <Button size="huge">ورود به بخش</Button>
              </a>
            </Fade>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Fade right>
              <Image
                bordered
                rounded
                size="large"
                src={BASE_IP + section.image}
              />
            </Fade>
          </Grid.Column>
        </Grid.Row>
      );
    } else {
      return (
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Fade left>
              <Image
                bordered
                rounded
                size="large"
                src={BASE_IP + section.image}
              />
            </Fade>
          </Grid.Column>
          <Grid.Column textAlign="center" width={8}>
            <Fade right>
              <Header inverted as="h3" style={{ fontSize: "2em" }}>
                {section.title}
              </Header>
              <p style={{ fontSize: "1.33em" }}>{section.description}</p>
              <a href={"/" + section.link_to}>
                <Button size="huge">ورود به بخش</Button>
              </a>
            </Fade>
          </Grid.Column>
        </Grid.Row>
      );
    }
  };

  render() {
    const { heading, introduction, sections, contactUs } = this.props;
    return (
      <ResponsiveContainer heading={heading}>
        <Element name="introduction">
          <Segment style={{ padding: "4em 8em 4em 8em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Fade up>
                    <Image size="medium" src={BASE_IP + introduction.logo} />
                  </Fade>
                </Grid.Column>
                <Grid.Column textAlign="center" width={8}>
                  <Fade up>
                    <Header as="h1">{introduction.title}</Header>
                    <p>{introduction.description}</p>
                  </Fade>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Element>
        <Element name="sections">
          <Segment inverted style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              {sections.map((section, index) => {
                return this.renderSection(section, index);
              })}
            </Grid>
          </Segment>
        </Element>
        <Element name="contactus">
          <Segment vertical style={{ padding: "5em 0em" }}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row textAlign="center">
                  <Grid.Column width={8}>
                    <Header as="h4" content="تماس با ما" />
                    <List link>
                      <List.Item as="li">
                        {contactUs.email + "  :ایمیل "}
                      </List.Item>
                      <List.Item as="li">
                        {contactUs.phone_number + "   :تلفن "}
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as="h4" content="شبکه های اجتماعی" />
                    <List link></List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Element>
      </ResponsiveContainer>
    );
  }
}

export default Home;
