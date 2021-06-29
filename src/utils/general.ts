import moment from 'moment'
import { round } from 'lodash'
import { toPairs, reverse, forEach, find, orderBy, get, filter } from 'lodash/fp'
import { IStageStructure } from '../TS'

interface Iobject {
  [s: string]: string | {} | []
}

export const getFormatedDate = (date: string = ''): string => {
  const apiFormat = 'YYYY-MM-DDTHH:mm:ss.SSSS'
  if (date !== '') {
    const formated = moment(date)
    return formated.format(apiFormat)
  }
  return moment().format(apiFormat)

}

export const inverseObj = (obj: Iobject) => {
  const newObj: Iobject = {}
  const oldObj = reverse(toPairs(obj))

  forEach((el) => {
    newObj[el[0]] = el[1]
  }, oldObj)

  return newObj
}

export const percentageFromPrevious = (currentStage: IStageStructure, idx: number, dataArray: IStageStructure[]) => {
  const newOpp = find({ is_default: true }, dataArray) || {} as IStageStructure
  // higher order should be the bad end
  const ends: IStageStructure[] = orderBy('order', 'desc', filter({ end_stage: true }, dataArray))
  const badEnd: IStageStructure = get('[0]', ends) || {}

  if (badEnd.stage_id === currentStage.stage_id) {
    const conversion = round((currentStage.wereInStage / newOpp.wereInStage) * 100, 2)
    return conversion > 100 ? 100 : conversion
    
  }

  if (idx - 1 <  0) {
    return 0
  }

  const conversion = round((currentStage.wereInStage / dataArray[idx - 1].wereInStage) * 100, 2)
  return conversion > 100 ? 100 : conversion
}

export const percentageTotal = (currentStage: IStageStructure, dataArray: IStageStructure[]) => {
  const newOpp = find({ is_default: true }, dataArray) || {} as IStageStructure
  const conversion = round((currentStage.wereInStage / newOpp.wereInStage) * 100, 2)
  return conversion > 100 ? 100 : conversion
}
