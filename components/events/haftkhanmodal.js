import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import Link from "next/link";
const HaftkhanModal = ({ children }) => (
  <Modal trigger={children} basic size="small" style={{ direction: "rtl" }}>
    <Header as="h2" icon="archive" content="ثبت نام انجام شد" />
    <Modal.Content>
      <p dir="rtl">
        اگر اطلاعات خود را به درستی وارد کردید، برای تایید اطلاعات و نهایی شدن ثبت نام در این طرح منتظر تماس همکاران ما باشید.
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Link href="/">
        <Button inverted>تایید</Button>
      </Link>
    </Modal.Actions>
  </Modal>
);

export default HaftkhanModal;
