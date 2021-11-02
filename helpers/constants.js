import Time from './time'
import {
  REASONS_TO_DEPLOY,
  REASONS_TO_NOT_DEPLOY,
  REASONS_FOR_THURSDAY_AFTERNOON,
  REASONS_FOR_FRIDAY_AFTERNOON,
  REASONS_FOR_FRIDAY_13TH,
  REASONS_FOR_AFTERNOON,
  REASONS_FOR_WEEKEND
} from './reasons-with-gif'

export const HOST = 'https://shouldideploy.today'

export const shouldIDeploy = async (time) => 
  time && !time.isFriday() && !time.isWeekend() && await !time.isHoliday()

export const shouldIDeployText = async (time) => 
  await shouldIDeploy(time) ? 'Yes!' : 'No!'

export const shouldIDeployAnswerImage = async (time) => 
  await shouldIDeploy(time) ? `${HOST}/yes.png` : `${HOST}/no.png`

export const shouldIDeployColorTheme = async (time) =>
  await shouldIDeploy(time) ? '#36a64f' : '#ff4136'


export const shouldIDeployFavIcon = async (time) =>
  await shouldIDeploy(time) ? `${HOST}/dots.png` : `${HOST}/dots-red.png`


export const getRandom = function ranDay(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Return a list of reasons according of time parameter
 * @param string[]
 */
export async function dayHelper(time) {
  time = time || new Time()

  if (time.isFriday13th()) {
    return REASONS_FOR_FRIDAY_13TH
  }

  if (time.isFridayAfternoon()) {
    return REASONS_FOR_FRIDAY_AFTERNOON
  }

  if (time.isFriday()) {
    return REASONS_TO_NOT_DEPLOY
  }

  if (await time.isHoliday()) {
    return REASONS_TO_NOT_DEPLOY
  }

  if (time.isThursdayAfternoon()) {
    return REASONS_FOR_THURSDAY_AFTERNOON
  }
  if (time.isAfternoon() && !time.isWeekend()) {
    return REASONS_FOR_AFTERNOON
  }
  if (time.isWeekend()) {
    return REASONS_FOR_WEEKEND
  }
  return REASONS_TO_DEPLOY
}
