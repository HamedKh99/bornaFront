import React, { Component } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

export default class SignupModal extends Component {
  render() {
    const { open, closeModal } = this.props;
    return (
      <div dir="rtl">
        <Modal as={Form} size="small" open={open}>
          <Modal.Header className="modalHeader">{"ثبت نام کنید"}</Modal.Header>
          <Modal.Content style={{ dir: "rtl" }}>
            <div dir="rtl">
              <Form.Field>
                <label>نام کاربری</label>
                <input placeholder="نام کاربری خود را وارد کنید" />
              </Form.Field>
              <Form.Field>
                <label>ایمیل</label>
                <input type="email" placeholder="ایمیل خود را وارد کنید" />
              </Form.Field>
              <Form.Field>
                <label>گذرواژه</label>
                <input type="password" />
              </Form.Field>
              <Form.Field>
                <label>تایید گذرواژه</label>
                <input type="password" />
              </Form.Field>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive>ثبت نام</Button>
            <Button onClick={() => closeModal()} negative>
              انصراف
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
