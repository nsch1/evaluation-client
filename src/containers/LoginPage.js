import React, {PureComponent} from 'react'
import LoginForm from "../components/LoginForm"
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import {connect} from "react-redux"
import {login} from "../actions/users"
import {Redirect} from "react-router-dom"

class LoginPage extends PureComponent {

  handleSubmit = (data) => {
    this.props.login(data)
  }

  render() {
    if(this.props.currentUser) return (
      <Redirect to="/classes" />
    )
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Teacher Login" bordered={false}>
          <LoginForm onSubmit={this.handleSubmit} />
        </Card>
      </Row>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser})


export default connect(mapStateToProps, {login})(LoginPage)