import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Input from "antd/es/input/Input"
import Button from "antd/es/button/button"
import DatePicker from "antd/es/date-picker/index"
const {Item} = Form

export default class GroupForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (e) => {
    const {name, value} = e.target

    const newValue = value.replace(/[^\d]/,'')
    e.target.value = newValue

    this.setState({
      [name]: parseInt(newValue)
    })
  }

  dateChange = (date, type) => {
    this.setState({
      [type]: new Date(date).toISOString()
    })
  }

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Item>
          <Input name="id" placeholder="Class number" onChange={this.handleChange} />
        </Item>
        <Item>
          <DatePicker placeholder="Start date" onChange={(_, date) => this.dateChange(date, 'startDate')} />
        </Item>
        <Item>
          <DatePicker placeholder="End date" onChange={(_, date) => this.dateChange(date, 'endDate')} />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit Class
          </Button>
        </Item>
      </Form>
    )
  }
}