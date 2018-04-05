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

class StudentPage extends PureComponent {

  componentWillMount() {
    this.props.getStudent(this.props.match.params.id)
  }

  handleSubmit = (data) => {
    this.props.postEvaluation(data, this.props.student.id)
  }

  render() {
    const {student, authenticated} = this.props

    if(!authenticated) return (
      <Redirect to="/classes" />
    )

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
            <StudentCard student={student} hoverable={false} pad={35} />
            <EvaluationForm onSubmit={this.handleSubmit} pad={35} />
            </Row>
          </Card>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({student, currentUser}) => {
  const {evaluations} = student
  const color = evaluations ? evaluations[0] ? evaluations[0].color.toUpperCase() : 'GREY' : null

  return {
    student: {
      ...student,
      color,
      colorCode: colors[color]
    },
    authenticated: currentUser
  }
}

export default connect(mapStateToProps, {getStudent, postEvaluation})(StudentPage)