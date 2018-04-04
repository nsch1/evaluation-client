import React, {PureComponent} from 'react'
import List from "antd/es/list/index"

export default class GroupList extends PureComponent {

  render() {
    return (
      <List
        dataSource={this.props.data}
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item actions={[<a>edit</a>, <a>remove</a>]}>
            <List.Item.Meta
              title={<a>{`Class #${item.id}`}</a>}
              description={`${item.studentAmount} students.`}
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