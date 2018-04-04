import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Card from "antd/es/card/index"
const {Item} = Form

export default class StudentCard extends PureComponent {

  render() {
    const {student} = this.props

    return (
      <Card
        hoverable
        style={{width: 230, background: student.colorCode}}
        cover={<img alt="student" src={student.picture} />}
      >
        <Card.Meta
          title={student.name}
          description={student.color}
        />
      </Card>
    )
  }
}