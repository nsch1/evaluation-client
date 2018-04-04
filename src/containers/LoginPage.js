import React, {PureComponent} from 'react'
import LoginForm from "../components/LoginForm"
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import {connect} from "react-redux"
import {login} from "../actions/users"

class LoginPage extends PureComponent {

  handleSubmit = (data) => {
    this.props.login(data)
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Teacher Login" bordered={false}>
          <LoginForm onSubmit={this.handleSubmit} />
        </Card>
      </Row>
    )
  }
}

export default connect(null, {login})(LoginPage)