import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import GroupList from "../components/GroupList"

export default class GroupIndex extends PureComponent {

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Classes" bordered={false} style={{maxWidth: '700px', width: '70vw'}}>
          <GroupList/>
        </Card>
      </Row>
    )
  }
}