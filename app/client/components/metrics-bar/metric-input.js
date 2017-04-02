import React, { PropTypes, Component } from "react"
import { TextInput } from "../ui/inputs"
import { Text } from "../ui/text"
import { ContentContainer } from "../ui/containers"
import { AppColors } from "../../util/constants"

export default class MetricInput extends Component {
  static propTypes = {
    property: PropTypes.string.isRequired,
    value: PropTypes.number,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    unit: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  state = {
    presentedValue: ""
  }

  constructor() {
    super(...arguments)
    this.updateValue = this.updateValue.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { value = "" } = nextProps
    this.setState({
      presentedValue: value
    })
  }

  updateValue(event) {
    this.setState({ presentedValue: event.target.value })
  }

  validateInput() {
    const parsedValue = parseFloat(this.state.presentedValue)
    const { property, onChange } = this.props
    if (!isNaN(parsedValue)) {
      this.setState({ presentedValue: parsedValue })
      onChange({ [property]: parsedValue })
    } else {
      this.setState({ presentedValue: this.props.value })
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.validateInput()
    }
  }

  render() {
    const {
      label,
      property,
      value,
      enabled,
      unit
    } = this.props
    return (
      <ContentContainer verticalAlign>
        <Text
          color={enabled ? AppColors.DarkGray : AppColors.DisabledGray}
          size="0.8em"
          mr="0.25em"
        >
          { label }
        </Text>
        <TextInput
          small
          alignRight
          onChange={this.updateValue}
          onBlur={this.validateInput}
          disabled={!enabled}
          onKeyPress={this.handleKeyPress}
          value={this.state.presentedValue}
        />
        <Text
          color={enabled ? AppColors.DarkGray : AppColors.DisabledGray}
          size="0.8em"
          ml="0.25em"
          mr="0.85em"
        >
          { unit }
        </Text>
      </ContentContainer>
    )
  }
}
