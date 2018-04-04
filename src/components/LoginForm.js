import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Input from "antd/es/input/Input"
import Button from "antd/es/button/button"
const {Item} = Form

export default class LoginForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  handleChange = (e) => {
    const {name, value} = e.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Item>
          <Input name="email" type="email" placeholder="Email" onChange={this.handleChange} />
        </Item>
        <Item>
          <Input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Item>
      </Form>
    )
  }
}