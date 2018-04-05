import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Input from "antd/es/input/Input"
import Button from "antd/es/button/button"
const {Item} = Form

export default class StudentForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (e) => {
    const {name, value} = e.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item>
          <Input name="name" placeholder="Name" onChange={this.handleChange} />
        </Item>
        <Item>
          <Input name="picture" type="url" placeholder="Picture url" onChange={this.handleChange} />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Add Student
          </Button>
        </Item>
      </Form>
    )
  }
}