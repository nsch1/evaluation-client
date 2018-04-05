import React, {PureComponent} from 'react'
import Form from "antd/es/form/Form"
import Input from "antd/es/input/Input"
import Button from "antd/es/button/button"
import RadioGroup from "antd/es/radio/group"
import Radio from "antd/es/radio/radio"
import DatePicker from "antd/es/date-picker/index"
import moment from 'moment'
import TextArea from "antd/es/input/TextArea"
const {Item} = Form

export default class EvaluationForm extends PureComponent {
  state = {
    date: new Date().toISOString()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      color: '',
      remark: '',
      date: new Date().toISOString()
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target

    this.setState({
      [name]: value
    })
  }

  dateChange = (date, type) => {
    this.setState({
      [type]: new Date(date).toISOString()
    })
  }

  render() {
    const {pad} = this.props

    return (
      <Form onSubmit={this.handleSubmit} style={{paddingLeft: pad || 0, paddingRight: pad || 0}} >
        <Item>
          <RadioGroup name="color" onChange={this.handleChange} value={this.state.color} >
            <Radio value={'GREEN'}>Green</Radio>
            <Radio value={'YELLOW'}>Yellow</Radio>
            <Radio value={'RED'}>Red</Radio>
          </RadioGroup>
        </Item>
        <Item>
          <DatePicker value={moment(new Date(this.state.date)) || moment(new Date())} onChange={(_, date) => this.dateChange(date, 'date')} />
        </Item>
        <Item>
          <TextArea name="remark" rows={4} value={this.state.remark || ''} onChange={this.handleChange} />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Item>
      </Form>
    )
  }
}