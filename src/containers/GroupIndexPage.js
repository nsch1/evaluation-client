import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import GroupList from "../components/GroupList"
import Button from "antd/es/button/button"
import {getAllGroups, postGroup} from "../actions/groups"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import BackTop from "antd/es/back-top/index"
import GroupForm from "../components/GroupForm"
import Divider from "antd/es/divider/index"

class GroupIndex extends PureComponent {

  state = {
    addGroup: false
  }

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.getAllGroups()
    }
  }

  handleClick = () => {
    this.setState({
      addGroup: !this.state.addGroup
    })
  }

  handleSubmit = (data) => {
    this.props.postGroup(data)
    this.setState({
      addGroup: !this.state.addGroup
    })
  }

  render() {
    const {groups, authenticated} = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    return (
      <Row type="flex" justify="space-around" align="middle">
        <BackTop />
        <Card title="Classes" bordered={false} style={{maxWidth: '700px', width: '70vw'}}>
          <GroupList data={groups} />
          {
            this.state.addGroup &&
            <Row type="flex" justify="center">
              <Divider>Add Class</Divider>
              <GroupForm onSubmit={this.handleSubmit} />
              <Divider/>
            </Row>
          }
          <Row type="flex" justify="end">
            <Button onClick={this.handleClick} >
              Add Class
            </Button>
          </Row>
        </Card>
      </Row>
    )
  }
}

const mapStateToProps = ({groups, currentUser}) => {
  return {
    groups: groups.concat().map(g => {
      return {...g, studentAmount: g.students.length}
    }),
    authenticated: currentUser
  }
}

export default connect(mapStateToProps, {getAllGroups, postGroup})(GroupIndex)