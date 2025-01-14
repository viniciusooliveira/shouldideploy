import {
  getRandom,
  dayHelper,
  shouldIDeployText,
  shouldIDeployAnswerImage,
  shouldIDeployColorTheme,
  shouldIDeployFavIcon
} from '../../../helpers/constants'
import Time from '../../../helpers/time'

export default async (req, res) => {
  let timezone = req.body.text || req.query.tz || Time.DEFAULT_TIMEZONE
  let time = Time.validOrNull(timezone)
  const chosenReason = getRandom(await dayHelper(time))
  const reasonText = `*${await shouldIDeployText(time)}*\n*${
    chosenReason.reason
  }*`
  const gifUrl = getRandom(chosenReason.gifs)

  res.status(200).json({
    response_type: time ? 'in_channel' : 'ephemeral',
    blocks: [
      // {
      //   type: 'section',
      //   text: {
      //     type: 'mrkdwn',
      //     text: time ? reasonText : `Invalid time zone: '${timezone}'`
      //   },
      //   accessory: {
      //     type: 'image',
      //     alt_text: '',
      //     image_url: gifUrl //shouldIDeployAnswerImage(time)
      //   }
      // },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: time ? reasonText : `Invalid time zone: '${timezone}'`
        }
      },
      {
        type: 'image',
        title: {
          type: 'plain_text',
          text: 'gif',
          emoji: true
        },
        image_url: gifUrl,
        alt_text: 'gif'
      } //,
      // {
      //   type: 'image',
      //   alt_text: '',
      //   image_url: gifUrl
      // }
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
