import React, { Component } from "react";
import PageContainer from "../components/global/pageContainer";
import Modal from "../components/events/haftkhanmodal";
import { Header, Form, Button, Step, Icon } from "semantic-ui-react";
import { postHaftkhanSignup } from "../utils/requests/events";
import _ from "lodash";

class HaftkhanSignup extends Component {
  state = {
    step: 1,
    studentsCount: 1,
    complex_name: "",
    state_name: "",
    city_name: "",
    full_address: "",
    complex_phone_number: "",
    is_from_kanoon_imam_reza: false,
    head_name: "",
    head_family_name: "",
    head_phone_number: "",
    teacher_name: "",
    teacher_family_name: "",
    teacher_education: "",
    teacher_phone_number: "",
    students: [{ name: "", family_name: "", school_name: "" }]
  };

  addStudent = () => {
    let oldStudents = this.state.students;
    let newStudents = [...oldStudents];
    newStudents.push({
      name: "",
      family_name: "",
      school_name: ""
    });
    this.setState({
      studentsCount: this.state.studentsCount + 1,
      students: newStudents
    });
  };
  removeStudent = () => {
    let oldStudents = this.state.students;
    let newStudents = [...oldStudents];
    newStudents.pop();
    this.setState({
      studentsCount: this.state.studentsCount - 1,
      students: newStudents
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  toggleCheckbox = e =>
    this.setState({
      is_from_kanoon_imam_reza: !this.state.is_from_kanoon_imam_reza
    });

  changeStudent(field, value, i) {
    let oldStudents = this.state.students;
    let newStudents = [...oldStudents];
    if (field === "name") {
      newStudents[i].name = value;
    } else if (field === "family_name") {
      newStudents[i].family_name = value;
    } else {
      newStudents[i].school_name = value;
    }
    this.setState({ students: newStudents });
  }

  canSubmit = () => {
    const {studentsCount, students} = this.state
    if(studentsCount < 5) {
      return false
    } else {
      for (let i = 0; i < 5; i++) {
        if(students[i].name === "" || students[i].family_name === "" || students[i].school_name === "" )
        return false
      }
      return true
    }
  };

  submit = async () => {
    let data = this.state;
    delete data.studentsCount;
    delete data.step;
    const res = await postHaftkhanSignup(data);
    console.log(res.data);
  };

  renderStepOne = () => {
    const {
      complex_name,
      state_name,
      city_name,
      full_address,
      complex_phone_number,
      is_from_kanoon_imam_reza
    } = this.state;
    return (
      <>
        <Header
          as="h5"
          content="مشخصات مجموعه:"
          style={{
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight: "0.5em"
          }}
        />
        <Form.Group>
          <Form.Input
            value={complex_name}
            name="complex_name"
            onChange={this.handleChange}
            required
            width={3}
            label="نام مجموعه"
          />
          <Form.Input
            value={complex_phone_number}
            name="complex_phone_number"
            onChange={this.handleChange}
            required
            width={3}
            label="شماره تلفن مجموعه"
          />
          <Form.Input
            value={state_name}
            name="state_name"
            onChange={this.handleChange}
            required
            width={3}
            label="استان"
          />
          <Form.Input
            value={city_name}
            name="city_name"
            onChange={this.handleChange}
            required
            width={3}
            label="شهرستان"
          />
          <Form.TextArea
            value={full_address}
            name="full_address"
            onChange={this.handleChange}
            required
            width={3}
            label="آدرس کامل مجموعه"
          />
        </Form.Group>
        <Form.Checkbox
          checked={is_from_kanoon_imam_reza}
          name="is_from_kanoon_imam_reza"
          onChange={this.toggleCheckbox}
          required
          label=" مجموعه ﺟﺰو ﻃﺮح ﮐﺎﻧﻮن ﻫﺎي اﻣﺎم رﺿﺎ ﻋﻠﯿﻪ اﻟﺴﻼم  ﻣﯽ ﺑﺎﺷﺪ؟"
        />
      </>
    );
  };

  renderStepTwo = () => {
    const { head_name, head_family_name, head_phone_number } = this.state;
    return (
      <>
        <Header
          as="h5"
          content="مشخصات مسئول مجموعه:"
          style={{
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight: "0.5em"
          }}
        />
        <Form.Group>
          <Form.Input
            value={head_name}
            name="head_name"
            onChange={this.handleChange}
            required
            width={3}
            label="نام مسئول"
          />
          <Form.Input
            value={head_family_name}
            name="head_family_name"
            onChange={this.handleChange}
            required
            width={3}
            label="نام خانوادگی مسئول"
          />
          <Form.Input
            value={head_phone_number}
            name="head_phone_number"
            onChange={this.handleChange}
            required
            width={3}
            label="شماره تماس مسئول"
          />
        </Form.Group>
      </>
    );
  };

  renderStepThree = () => {
    const {
      teacher_name,
      teacher_family_name,
      teacher_education,
      teacher_phone_number
    } = this.state;
    return (
      <>
        <Header
          as="h5"
          content="مشخصات مربی که دانش آموزانش در این طرح شرکت می کنند:"
          style={{
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight: "0.5em"
          }}
        />
        <Form.Group>
          <Form.Input
            value={teacher_name}
            name="teacher_name"
            onChange={this.handleChange}
            required
            width={3}
            label="نام مربی"
          />
          <Form.Input
            value={teacher_family_name}
            name="teacher_family_name"
            onChange={this.handleChange}
            required
            width={3}
            label="نام خانوادگی مربی"
          />
          <Form.Input
            value={teacher_education}
            name="teacher_education"
            onChange={this.handleChange}
            width={3}
            label="تحصیلات مربی"
          />
          <Form.Input
            value={teacher_phone_number}
            name="teacher_phone_number"
            onChange={this.handleChange}
            required
            width={3}
            label="شماره تماس مربی"
          />
        </Form.Group>
      </>
    );
  };

  renderStepFour = () => {
    const { studentsCount, students } = this.state;
    return (
      <>
        <Header
          as="h5"
          content={
            "اطلاعات دانش آموزان را وارد کنید:" + "(حداقل پنج دانش آموز)"
          }
          style={{
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight: "0.5em"
          }}
        />
        {_.map(_.range(studentsCount), i => {
          return (
            <Form.Group key={i} width={2}>
              <Form.Input
                label="نام دانش آموز"
                style={{
                  textAlign: "left !important",
                  direction: "ltr !important"
                }}
                width={3}
                onChange={(e, { value }) =>
                  this.changeStudent("name", value, i)
                }
                value={students[i].name}
              />
              <Form.Input
                label="نام خانوادگی دانش آموز"
                style={{
                  textAlign: "left !important",
                  direction: "ltr !important"
                }}
                width={3}
                onChange={(e, { value }) =>
                  this.changeStudent("family_name", value, i)
                }
                value={students[i].family_name}
              />
              <Form.Input
                label="نام مدرسه"
                style={{
                  textAlign: "left !important",
                  direction: "ltr !important"
                }}
                width={3}
                onChange={(e, { value }) =>
                  this.changeStudent("school_name", value, i)
                }
                value={students[i].school_name}
              />
            </Form.Group>
          );
        })}
        <Button secondary onClick={this.addStudent}>
          +
        </Button>
        {studentsCount > 1 && (
          <Button secondary onClick={this.removeStudent}>
            -
          </Button>
        )}
      </>
    );
  };

  renderStep = () => {
    const { step } = this.state;
    if (step === 1) return this.renderStepOne();
    else if (step === 2) return this.renderStepTwo();
    else if (step === 3) return this.renderStepThree();
    else return this.renderStepFour();
  };

  canGoNextStep = () => {
    const {
      step,
      complex_name,
      state_name,
      city_name,
      full_address,
      complex_phone_number,
      head_name,
      head_family_name,
      head_phone_number,
      teacher_name,
      teacher_family_name,
      teacher_phone_number
    } = this.state;

    if(step === 1) {
      return (complex_name !== "") && (state_name !== "") && (city_name !== "") && (full_address !== "") && (complex_phone_number !== "")
    } else if(step === 2){
      return (head_name !== "") && (head_family_name !== "") && (head_phone_number !== "")
    } else if(step === 3){
      return (teacher_name !== "") && (teacher_family_name !== "") && (teacher_phone_number !== "")
    }
  }

  goNextStep = () => {
    this.setState({step : this.state.step + 1})
  }

  renderButton = () => {
    const { step } = this.state;

    if (step !== 4) {
      return (
        <Button style={{marginTop: '1em'}} disabled={!this.canGoNextStep()} onClick={this.goNextStep} primary>
          مرحله بعد
        </Button>
      );
    } else {
      return (
        <Modal>
          <Button style={{marginTop: '1em'}} disabled={!this.canSubmit()} onClick={this.submit} primary>
            ثبت نام
          </Button>
        </Modal>
      );
    }
  };

  render() {
    return (
      <PageContainer>
        <Header
          as="h2"
          content="ثبت نام در هفت خوان"
          style={{
            fontSize: "3em",
            fontWeight: "normal",
            marginTop: "1.5em",
            paddingRight: "0.5em"
          }}
        />
        <div dir="rtl" style={{ paddingRight: "1em" }}>
          <Form>{this.renderStep()}</Form>
        </div>
        {this.renderButton()}
      </PageContainer>
    );
  }
}

export default HaftkhanSignup;
