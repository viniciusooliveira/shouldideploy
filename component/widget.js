import React from 'react'
import { getRandom, dayHelper } from '../helpers/constants'
export default class Widget extends React.Component {
  /**
   * Set default state element based on props
   * @param {any} props
   */
  constructor(props) {
    super(props)

    this.state = {
      timezone: this.props.now.timezone
      // reason: getRandom(await this.getReasons())
    }
    this.loadInfo()
  }

  loadInfo = async () =>{

    const chosenReason = getRandom(await this.getReasons())
    const reasonText = chosenReason?.reason
    const gifUrl = getRandom(chosenReason?.gifs)
    this.setState({
      ... this.state,
      reason: chosenReason,
      reasonText,
      gifUrl
    })
  }

  /**
   * On props change update state
   * @param {any} nextProps
   * @return void
   */
  componentDidUpdate(nextProps) {
    if (nextProps.now.timezone !== this.state.timezone) {
      this.setState({
        timezone: nextProps.now.timezone,
        reason: getRandom(this.getReasons())
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onSpacePressOrClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onSpacePressOrClick)
  }

  /**
   * On hitting Space reload reasons
   * @return void
   */
  onSpacePressOrClick = (event) => {
    if (event.type === 'click' || event?.keyCode == 32) {
      this.loadInfo()
    }
  }

  /**
   * Get reasons according to current time
   * @return string[]
   */
  async getReasons() {
    return await dayHelper(this.props.now)
  }

  /**
   * Render widget
   * @return JSX.Element
   */
  render() {
    return (
      <div className="item">
        <h3 className="tagline">Should I Deploy Today?</h3>
        <div id="reload" onClick={this.onSpacePressOrClick}>
          Hit <span className="space-btn">Space</span> or Click
        </div>
        <h2 id="text">{this.state.reasonText}</h2>
        <img className="gif-reason" src={this.state.gifUrl} alt={this.state.reasonText} />
      </div>
    )
  }
}
