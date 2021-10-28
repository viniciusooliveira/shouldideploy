import {
  getRandom,
  dayHelper,
  shouldIDeployAnswerImage,
  shouldIDeployColorTheme,
  shouldIDeployFavIcon
} from '../../../helpers/constants'
import Time from '../../../helpers/time'

export default (req, res) => {
  let timezone = req.body.text || req.query.tz || Time.DEFAULT_TIMEZONE
  let time = Time.validOrNull(timezone)
  const chosenReason = getRandom(dayHelper(time))
  const reasonText = chosenReason.reason
  const gifUrl = getRandom(chosenReason.gifs)

  res.status(200).json({
    response_type: time ? 'in_channel' : 'ephemeral',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '*' + time ? reasonText : `Invalid time zone: '${timezone}'` + '*'
        },
        accessory: {
          type: 'image',
          image_url: shouldIDeployAnswerImage(time)
        }
      },
      {
        type: 'image',
        image_url: gifUrl
      }
    ]
  })

  // res.status(200).json({
  //   response_type: time ? 'in_channel' : 'ephemeral',
  //   attachments: [
  //     {
  //       text: time
  //         ? getRandom(dayHelper(time)).reason
  //         : `Invalid time zone: '${timezone}'`,
  //       color: shouldIDeployColorTheme(time),
  //       thumb_url: shouldIDeployAnswerImage(time),
  //       footer_icon: shouldIDeployFavIcon(time),
  //       footer: 'Should I deploy today' + (time ? ` | ${timezone}` : '')
  //     }
  //   ]
  // })
}
