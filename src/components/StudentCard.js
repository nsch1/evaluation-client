import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Card from "antd/es/card/index"
const {Item} = Form

const student = {
  name: 'Test Student',
  picture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
  color: 'GREEN',
  colorCode: '#A5D6A7'
}

export default class StudentCard extends PureComponent {

  render() {
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