import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import StudentCard from "../components/StudentCard"
import Card from "antd/es/card/index"
import Col from "antd/es/grid/col"

const students = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
]

export default class GroupOverview extends PureComponent {

  renderStudents = () => {
    return students.map(_ => (
      <Col style={{margin: 15}}><StudentCard/></Col>
    ))
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Class #1" bordered={false} style={{maxWidth: '75vw'}}>
          <Row type="flex" justify="center">
          {this.renderStudents()}
          </Row>
        </Card>
      </Row>
    )
  }
}