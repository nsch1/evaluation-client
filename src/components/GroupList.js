import React, {PureComponent} from 'react'
import List from "antd/es/list/index"
import {Link, Redirect} from "react-router-dom"

export default class GroupList extends PureComponent {

  state = {}

  handleClick = (groupId) => {
    this.setState({
      redirect: true,
      groupId
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/classes/${this.state.groupId}`} />
    }
    return (
      <List
        dataSource={this.props.data}
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item
            actions={[<a>edit</a>, <a>remove</a>]}
          >
            <List.Item.Meta
              title={<Link to={`/classes/${item.id}`}>{`Class #${item.id}`}</Link>}
              description={`${item.studentAmount} students.`}
              onClick={_ => this.handleClick(item.id)}
              style={{cursor: 'pointer'}}
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