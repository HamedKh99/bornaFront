import React, { Component } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

export default class SignupModal extends Component {
  render() {
    const { open, closeModal } = this.props;
    return (
      <div dir="rtl">
        <Modal as={Form} size="small" open={open}>
          <Modal.Header className="modalHeader">{"ورود به سایت"}</Modal.Header>
          <Modal.Content style={{ dir: "rtl" }}>
            <div dir="rtl">
              <Form.Field>
                <label>نام کاربری</label>
                <input placeholder="نام کاربری خود را وارد کنید" />
              </Form.Field>
              <Form.Field>
                <label>گذرواژه</label>
                <input type="password" placeholder="گذرواژه خود را وارد کنید" />
              </Form.Field>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive>ورود</Button>
            <Button onClick={() => closeModal()} negative>
              انصراف
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
