import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import Link from "next/link";
const HaftkhanModal = ({ children }) => (
  <Modal trigger={children} basic size="small" style={{ direction: "rtl" }}>
    <Header as="h2" icon="archive" content="ثبت نام انجام شد" />
    <Modal.Content>
      <p dir="rtl">
        موارد توسط سایت برنا دریافت گردید، منتظر تایید باشید. درصورت تایید شدن
        اطلاعات وارد شده به شما اجازه داده می شود وارد مرحله بعد شوید.
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
