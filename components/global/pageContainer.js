import React, { Component } from "react";
import { Container, Menu, Responsive } from "semantic-ui-react";

class PageContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <div dir="rtl">
        <Responsive>
          <Menu fixed="top" size="large" inverted>
            <Container>
              <a href="/">
                <Menu.Item as="a" position="right">
                  صفحه اصلی
                </Menu.Item>
              </a>
            </Container>
          </Menu>

          {children}
        </Responsive>
      </div>
    );
  }
}

export default PageContainer;
