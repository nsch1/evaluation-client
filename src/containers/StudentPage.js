import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import {connect} from "react-redux"
import {Link, Redirect} from "react-router-dom"
import StudentCard from "../components/StudentCard"
import EvaluationForm from "../components/EvaluationForm"
import {getStudent} from "../actions/students"
import {colors} from "../constants"
import {postEvaluation} from "../actions/evaluations"
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb"
import EvaluationList from "../components/EvaluationList"
import Divider from "antd/es/divider/index"
import {getGroup} from "../actions/groups"

class StudentPage extends PureComponent {

  componentWillMount() {
    this.props.getStudent(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.id !== this.props.match.params.id) {
      this.props.getStudent(newProps.match.params.id)
    }
  }

  handleSubmit = (data) => {
    this.props.postEvaluation(data, this.props.student.id)
  }

  handleSubmitNext = (data) => {
    this.props.postEvaluation(data, this.props.student.id)
    this.props.history.push(`/students/${this.getNextStudentId()}`)
  }

  getNextStudentId = () => {
    const {student, group} = this.props

    const index = group.students.findIndex(s => s.id === student.id) + 1
    return group.students[index].id
  }

  render() {
    const {student, group, getGroup, authenticated} = this.props

    if(!authenticated) return (
      <Redirect to="/classes" />
    )

    if(student.groupId && !group.id) getGroup(student.groupId)

    return (
      <div>
        <Row type="flex" justify="center" >
          <div style={{width: '70vw', marginBottom: 10}}>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/classes">Classes</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={`/classes/${student.groupId}`}>{`Class #${student.groupId}`}</Link></Breadcrumb.Item>
              <Breadcrumb.Item>{student.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Row>
        <Row type="flex" justify="space-around" align="middle" >
          <Card title={student.name} bordered={false} style={{width: '70vw'}} >
            <Row type="flex" justify="center">
            <StudentCard key={student.id} student={student} hoverable={false} pad={35} />
            <EvaluationForm onSubmit={this.handleSubmit} onSubmitNext={this.handleSubmitNext} pad={35} />
            </Row>
            <Row type="flex" justify="center">
              <Divider>Previous Evaluations</Divider>
              <EvaluationList data={student.evaluations} />
            </Row>
          </Card>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({student, group, currentUser}) => {
  const {evaluations} = student
  const color = evaluations ? evaluations[0] ? evaluations[0].color.toUpperCase() : 'GREY' : null

  return {
    rawStudent: student,
    student: {
      ...student,
      color,
      colorCode: colors[color]
    },
    authenticated: currentUser,
    group
  }
}

export default connect(mapStateToProps, {getStudent, postEvaluation, getGroup})(StudentPage)