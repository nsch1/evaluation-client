import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Card from "antd/es/card/index"
const {Item} = Form

export default class StudentCard extends PureComponent {

  render() {
    const {student, pad} = this.props

    return (
      <Card
        hoverable={this.props.hoverable}
        style={{width: 230, background: student.colorCode, marginLeft: pad || 0, marginRight: pad || 0}}
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