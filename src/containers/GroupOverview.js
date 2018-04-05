import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import StudentCard from "../components/StudentCard"
import Card from "antd/es/card/index"
import Col from "antd/es/grid/col"
import {connect} from "react-redux"
import {getGroup} from "../actions/groups"
import {Redirect} from "react-router-dom"
import BackTop from "antd/es/back-top/index"
import Spin from "antd/es/spin/index"
import {colors} from "../constants"

class GroupOverview extends PureComponent {

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.getGroup(this.props.match.params.id)
    }
  }

  renderStudents = () => {
    const {students} = this.props

    return students.map(s => (
      <Col style={{margin: 15}}><StudentCard student={s} /></Col>
    ))
  }

  calcColSpan = (perc) => {
    return Math.round(18 / 100 * perc)
  }

  calcColorPercentage = (students, color) => {
    if(!students) return 0
    const colorAmount = students.reduce((sum, student) => {
      if(student.color === color) {
        return sum + 1
      }
      return sum
    }, 0)

    return Math.round(100 / students.length * colorAmount)
  }

  render() {
    const {group, authenticated, students} = this.props

    if(!authenticated) return (
      <Redirect to="/login" />
    )

    const redPercent = this.calcColorPercentage(students, 'RED')
    const yellowPercent = this.calcColorPercentage(students, 'YELLOW')
    const greenPercent = this.calcColorPercentage(students, 'GREEN')

    return (
      <Row type="flex" justify="space-around" align="middle">
        <BackTop />
        {
          !group.id ?
            <Card title={`Loading..`} bordered={false} style={{maxWidth: '75vw'}}>
              <Spin />
            </Card> :
            <Card title={`Class #${group.id}`} bordered={false} style={{maxWidth: '75vw'}}>
              <Row type="flex" justify="center" >
                <Col
                  span={this.calcColSpan(redPercent)}
                  style={{height: 20, background: '#ef9a9a', textAlign: 'center'}}
                >
                  {`${redPercent}%`}
                </Col>
                <Col
                  span={this.calcColSpan(yellowPercent)}
                  style={{height: 20, background: '#FFE082', textAlign: 'center'}}
                >
                  {`${yellowPercent}%`}
                </Col>
                <Col
                  span={this.calcColSpan(greenPercent)}
                  style={{height: 20, background: '#A5D6A7', textAlign: 'center'}}
                >
                  {`${greenPercent}%`}
                </Col>
              </Row>
              <Row type="flex" justify="center">
                {
                  group.students &&
                  this.renderStudents()
                }
              </Row>
            </Card>
        }
      </Row>
    )
  }
}

const mapStateToProps = ({group, currentUser}) => {
  if(!group.students) return {
    group,
    authenticated: currentUser
  }
  return {
    group,
    students: group.students.map(s => {
      const color = s.evaluations[0].color.toUpperCase() || 'GREY'
      return {
        ...s,
        color,
        colorCode: colors[color]
      }
    }) || [],
    authenticated: currentUser
  }
}

export default connect(mapStateToProps, {getGroup})(GroupOverview)