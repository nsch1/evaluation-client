import React, {PureComponent} from 'react'
import Row from "antd/es/grid/row"
import Card from "antd/es/card/index"
import GroupList from "../components/GroupList"
import Button from "antd/es/button/button"
import Col from "antd/es/grid/col"

export default class GroupIndex extends PureComponent {

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Card title="Classes" bordered={false} style={{maxWidth: '700px', width: '70vw'}}>
          <GroupList/>
          <Button
            type="primary"
          >
            Add Class
          </Button>
        </Card>
      </Row>
    )
  }
}