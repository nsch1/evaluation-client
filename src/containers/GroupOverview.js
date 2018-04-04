import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import StudentCard from "../components/StudentCard"
import Card from "antd/es/card/index"
import Col from "antd/es/grid/col"
import {connect} from "react-redux"
import {getGroup} from "../actions/groups"
import {Redirect} from "react-router-dom"
import BackTop from "antd/es/back-top/index"

class GroupOverview extends PureComponent {

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.getGroup(this.props.match.params.id)
    }
  }

  renderStudents = () => {
    const {students} = this.props.group
    const colors = {
      GREEN: '#A5D6A7',
      YELLOW: '#FFE082',
      RED: '#ef9a9a',
    }

    const newStudents = students.map(s => {
      const color = s.evaluations[0].color.toUpperCase()
      return {
        ...s,
        color,
        colorCode: colors[color]
      }
    })

    return newStudents.map(s => (
      <Col style={{margin: 15}}><StudentCard student={s} /></Col>
    ))
  }

  render() {
    const {group, authenticated} = this.props

    if(!authenticated) return (
      <Redirect to="/login" />
    )

    return (
      <Row type="flex" justify="space-around" align="middle">
        <BackTop />
        <Card title={`Class #${group.id}`} bordered={false} style={{maxWidth: '75vw'}}>
          <Row type="flex" justify="center">
          {
            group.students &&
            this.renderStudents()
          }
          </Row>
        </Card>
      </Row>
    )
  }
}

const mapStateToProps = ({group, currentUser}) => ({
  group,
  authenticated: currentUser
})

export default connect(mapStateToProps, {getGroup})(GroupOverview)