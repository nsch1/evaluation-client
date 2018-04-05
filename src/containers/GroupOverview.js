import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import StudentCard from "../components/StudentCard"
import Card from "antd/es/card/index"
import Col from "antd/es/grid/col"
import {connect} from "react-redux"
import {getGroup} from "../actions/groups"
import {Link, Redirect} from "react-router-dom"
import BackTop from "antd/es/back-top/index"
import Spin from "antd/es/spin/index"
import {colors} from "../constants"
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb"
import Icon from "antd/es/icon/index"
import Button from "antd/es/button/button"
import Divider from "antd/es/divider/index"
import StudentForm from "../components/StudentForm"
import {deleteStudent, editStudent, postStudent} from "../actions/students"
import {getRandomStudentId} from "../randomStudent"

class GroupOverview extends PureComponent {

  state = {
    addStudent: false,
    editStudent: false
  }

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.getGroup(this.props.match.params.id)
    }
  }

  renderStudents = () => {
    const {students} = this.props

    return students.map(s => (
      <Col style={{margin: 15}}>
        <StudentCard
          student={s}
          hoverable={false}
          actions={[
            <Icon type="edit" onClick={_ => this.toggleEditStudent(s.id)}/>,
            <Icon type="delete" onClick={_ => this.handleDeleteClick(s.id)} />
          ]}
        />
      </Col>
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

  toggleAddStudent = () => {
    this.setState({
      addStudent: !this.state.addStudent
    })
  }

  toggleEditStudent = (id) => {
    const {students} = this.props

    this.setState({
      editStudent: true,
      targetStudent: students.filter(s => s.id === id)[0]
    })
  }

  handleDeleteClick = (id) => {
    this.props.deleteStudent(id)
  }

  handleSubmit = (data) => {
    this.props.postStudent(data, this.props.group.id)
    this.toggleAddStudent()
  }

  handleEditSubmit = (data) => {
    this.props.editStudent(data, this.state.targetStudent.id)
    this.setState({
      editStudent: false,
      targetStudent: {}
    })
  }

  handleQuestionClick = (students) => {
    this.setState({
      studentId: getRandomStudentId(students),
      redirect: true
    })
  }

  render() {
    const {group, authenticated, students} = this.props

    if(!authenticated) return (
      <Redirect to="/login" />
    )

    if (this.state.redirect) {
      return <Redirect push to={`/students/${this.state.studentId}`} />
    }

    const redPercent = this.calcColorPercentage(students, 'RED')
    const yellowPercent = this.calcColorPercentage(students, 'YELLOW')
    const greenPercent = this.calcColorPercentage(students, 'GREEN')

    return (
      <div>
        <Row type="flex" justify="center" >
          <div style={{width: '75vw', marginBottom: 10}}>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/classes">Classes</Link></Breadcrumb.Item>
              <Breadcrumb.Item>{`Class #${group.id}`}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Row>
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
                    {redPercent ? `${redPercent}%` : null}
                  </Col>
                  <Col
                    span={this.calcColSpan(yellowPercent)}
                    style={{height: 20, background: '#FFE082', textAlign: 'center'}}
                  >
                    {yellowPercent ? `${yellowPercent}%` : null}
                  </Col>
                  <Col
                    span={this.calcColSpan(greenPercent)}
                    style={{height: 20, background: '#A5D6A7', textAlign: 'center'}}
                  >
                    {greenPercent ? `${greenPercent}%` : null}
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Divider>{this.state.addStudent && 'Add Student'}{this.state.editStudent && 'Edit Student'}</Divider>
                  {
                    !this.state.addStudent && !this.state.editStudent &&
                    <div>
                      <Button
                        style={{marginRight: 10}}
                        onClick={this.toggleAddStudent}
                      >
                        Add Student
                      </Button>
                      <Button
                        style={{marginLeft: 10}}
                        onClick={_ => this.handleQuestionClick(students)}
                      >
                        Question Student
                      </Button>
                    </div>
                  }
                  {
                    this.state.addStudent &&
                    <StudentForm onSubmit={this.handleSubmit} />
                  }
                  {
                    this.state.editStudent &&
                    <StudentForm initialValues={this.state.targetStudent} onSubmit={this.handleEditSubmit}/>
                  }
                  <Divider/>
                </Row>
                <Row type="flex" justify="center">
                  {
                    group.students &&
                    this.renderStudents()
                  }
                  {
                    !group.students[0] &&
                    <p>No students found.</p>
                  }
                </Row>
              </Card>
          }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({group, currentUser}) => {
  return {
    group,
    students: !group.students ? null : group.students.map(s => {
      const color = s.evaluations[0] ? s.evaluations[0].color.toUpperCase() : 'GREY'
      return {
        ...s,
        color,
        colorCode: colors[color]
      }
    }) || [],
    authenticated: currentUser
  }
}

export default connect(mapStateToProps, {getGroup, postStudent, deleteStudent, editStudent})(GroupOverview)