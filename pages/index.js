import React from 'react'
import Head from 'next/head'
import {
  shouldIDeploy,
  shouldIDeployFavIcon,
  shouldIDeployAnswerImage
} from '../helpers/constants'
import Time from '../helpers/time'
import Widget from '../component/widget'
import Footer from '../component/footer'
import Router from 'next/router'

class Page extends React.Component {
  constructor(props) {
    super(props)

    let timezoneError = false

    if (!Time.zoneExists(this.props.timezone)) {
      timezoneError = true
    }
    this.state = {
      timezone: timezoneError ? 'America/Sao_Paulo' : this.props.timezone,
      now: new Time(timezoneError ? 'America/Sao_Paulo' : this.props.timezone)
    }
    this.loadInfo()
  }

  static async getInitialProps(request) {
    let timezone = request.query.tz || 'America/Sao_Paulo'

    return {
      timezone: timezone
    }
  }

  loadInfo = async () => {
    this.setState({
      ...this.state,
      favicon: await shouldIDeployFavIcon(this.state.now),
      answerImage: await shouldIDeployAnswerImage(this.state.now),
      shouldIDeploy: await shouldIDeploy(this.state.now)
    })
  }

  changeTimeZone = (timezone) => {
    if (!Time.zoneExists(this.props.timezone)) {
      return
    }
    let newUrl = new URL(location)
    newUrl.searchParams.set('tz', timezone)

    Router.push(newUrl.pathname + newUrl.search)
    this.setState({
      timezone: timezone,
      now: new Time(timezone)
    })
    this.loadInfo()
  }

  render() {
    return (
      <>
        <Head>
          <link
            rel="icon"
            type="image/png"
            href={this.state.favicon}
            sizes="32x32"
          />
          <meta
            property="og:image"
            content={this.state.answerImage}
          />
          <title>Should I Deploy Today?</title>
        </Head>
        <div
          className={`wrapper ${
            !this.state.shouldIDeploy && 'its-friday'
          }`}
        >
          <Widget now={this.state.now} />
          <div className="meta">
            <Footer
              timezone={this.state.timezone}
              changeTimeZone={this.changeTimeZone}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Page
