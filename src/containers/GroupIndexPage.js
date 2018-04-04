import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import GroupList from "../components/GroupList"
import Button from "antd/es/button/button"
import {getAllGroups} from "../actions/groups"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import BackTop from "antd/es/back-top/index"

class GroupIndex extends PureComponent {

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.getAllGroups()
    }
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
          <Row type="flex" justify="end">
            <Button>
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

export default connect(mapStateToProps, {getAllGroups})(GroupIndex)