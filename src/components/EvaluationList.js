import React, {PureComponent} from 'react'
import List from "antd/es/list/index"
import {colors} from "../constants"

export default class EvaluationList extends PureComponent {

  render() {
    return (
      <List
        dataSource={this.props.data}
        itemLayout="horizontal"
        style={{maxWidth: '50vw', width: 500}}
        renderItem={item => (
          <List.Item
            actions={[<a>edit</a>]}
            style={{
              background: colors[item.color.toUpperCase()],
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <List.Item.Meta
              title={item.color.toUpperCase()}
              description={item.remark}
            />
            <div>
              {`Date: ${item.date}`}
            </div>
          </List.Item>
        )}
      />
    )
  }
}