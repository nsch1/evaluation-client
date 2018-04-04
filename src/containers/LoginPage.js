import React, {PureComponent} from 'react'
import LoginForm from "../components/LoginForm"
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"

export default class LoginPage extends PureComponent {
  //state = {}

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Teacher Login" bordered={false}>
          <LoginForm/>
        </Card>
      </Row>
    )
  }
}