import React, {PureComponent} from 'react'
import Card from "antd/es/card/index"
import {Link} from "react-router-dom"

export default class StudentCard extends PureComponent {

  render() {
    const {student, pad, actions} = this.props

    return (
      <Card
        hoverable={this.props.hoverable}
        style={{width: 230, background: student.colorCode, marginLeft: pad || 0, marginRight: pad || 0}}
        cover={<img alt="student" src={student.picture} />}
        actions={actions}
      >
        <Link to={`/students/${student.id}`} >
        <Card.Meta
          title={student.name}
          description={student.color}
        />
        </Link>
      </Card>
    )
  }
}