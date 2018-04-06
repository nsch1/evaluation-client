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
      [name]: Number(newValue)
    })
  }

  dateChange = (date, dateStr, type, field) => {
    this.setState({
      [type]: new Date(dateStr).toISOString(),
      [field]: date
    })
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.end
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.start
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Item>
          <Input name="id" placeholder="Class number" onChange={this.handleChange} />
        </Item>
        <Item>
          <DatePicker
            disabledDate={this.disabledStartDate}
            placeholder="Start date"
            value={this.state.start}
            onChange={(date, dateStr) => this.dateChange(date, dateStr, 'startDate', 'start')} />
        </Item>
        <Item>
          <DatePicker
            disabledDate={this.disabledEndDate}
            placeholder="End date"
            value={this.state.end}
            onChange={(date, dateStr) => this.dateChange(date, dateStr, 'endDate', 'end')} />
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