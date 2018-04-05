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
    const {initialValues} = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <Item>
          <Input name="name" placeholder="Name" value={this.state.name || initialValues.name || ''} onChange={this.handleChange} />
        </Item>
        <Item>
          <Input name="picture" type="url" placeholder="Picture url" value={initialValues.picture || this.state.picture || ''} onChange={this.handleChange} />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Item>
      </Form>
    )
  }
}