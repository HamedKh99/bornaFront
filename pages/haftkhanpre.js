import React, { Component } from "react";
import ReactPlayer from "react-player";
import { getHaftkhanPre } from "../utils/requests/events";
import { BASE_IP } from "../utils/api";
import PageContainer from "../components/global/pageContainer";
import { Button, Grid, Header, Form, Checkbox } from "semantic-ui-react";
import Link from 'next/link'

class HaftkhanPre extends Component {
  state = {
    read: false
  };

  static async getInitialProps() {
    const res = await getHaftkhanPre();
    return {
      description: res.data.haftkhan_pre.description,
      video: res.data.haftkhan_pre.video
    };
  }

  toggle = () => this.setState(prevState => ({ read: !prevState.read }));

  render() {
    const { description, video } = this.props;
    return (
      <PageContainer>
        <Header
          as="h2"
          content="رویداد هفت خوان"
          style={{
            fontSize: "3em",
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight : '0.5em'
          }}
        />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <ReactPlayer
                width="480px"
                height="360px"
                url={BASE_IP + video}
                controls
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <p
                style={{
                  fontSize: "1.2em",
                  fontWeight: "normal"
                }}
              >
                {description}
              </p>
              <Form>
                <Form.Field>
                  <Checkbox onChange={this.toggle} on label="مطالعه شد" />
                </Form.Field>
                <Link href='/haftkhansignup'>
                  <Button disabled={!this.state.read} primary>
                    ثبت نام
                  </Button>
                </Link>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </PageContainer>
    );
  }
}

export default HaftkhanPre;
