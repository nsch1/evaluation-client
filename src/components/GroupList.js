import React, {PureComponent} from 'react'
import List from "antd/es/list/index"

const data = [
  {
    id: 1,
    startDate: "2018-04-16",
    endDate: "2018-05-22",
    students: 18
  },
  {
    id: 2,
    startDate: "2018-04-16",
    endDate: "2018-05-22",
    students: 22
  },
  {
    id: 3,
    startDate: "2018-04-16",
    endDate: "2018-05-22",
    students: 25
  },
  {
    id: 4,
    startDate: "2018-04-16",
    endDate: "2018-05-22",
    students: 19
  },
]

export default class GroupList extends PureComponent {

  render() {
    return (
      <List
        dataSource={data}
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item actions={[<a>edit</a>, <a>remove</a>]}>
            <List.Item.Meta
              title={<a>{`Class #${item.id}`}</a>}
              description={`${item.students} students.`}
            />
            <div>
              {`Start date: ${item.startDate}`}
            </div>
            <div>
              {`End date: ${item.endDate}`}
            </div>
          </List.Item>
        )}
      />
    )
  }
}