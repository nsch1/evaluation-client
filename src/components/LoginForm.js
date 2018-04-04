import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Input from "antd/es/input/Input"
import Button from "antd/es/button/button"
const {Item} = Form

export default class LoginForm extends PureComponent {
  //state = {}

  render() {
    return (
      <Form layout="inline">
        <Item>
          <Input placeholder="Email" />
        </Item>
        <Item>
          <Input type="password" placeholder="Password" />
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