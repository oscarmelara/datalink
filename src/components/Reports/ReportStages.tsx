import React from 'react'
import moment from 'moment'
import { round } from 'lodash'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { IgenericObjectNumbers } from '../../TS'
import { percentageFromPrevious, percentageTotal } from '../../utils'
import { store } from '../../config'

interface IReportStages {
  averageByClient: IgenericObjectNumbers
  averageByProspect: IgenericObjectNumbers
}

export const ReportStages: React.FC<IReportStages> = ({ averageByClient, averageByProspect }) => {
  const { filtersReducer, userControlReducer, stagesReducer } = store.getState()
  Font.register({ family: 'OpenBold', src: '/fonts/OpenSans-Bold.ttf' })
  Font.register({ family: 'OpenRegular', src: '/fonts/OpenSans-Regular.ttf' })
  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 60,
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'OpenBold',
    },
    subtitle: {
      color: '#717171',
      fontSize: 11,
      textAlign: 'center',
      fontFamily: 'OpenRegular',
    },
    body: {
      margin: '10px 0',
    },
    bodyRow: {
      flexDirection: 'row',
    },
    bodyItem: {
      fontSize: 9,
      fontWeight: 'normal',
      textAlign: 'left',
      color: '#505050',
      fontFamily: 'OpenRegular',
    },
    bodyTitle: {
      fontSize: 9,
      fontWeight: 600,
      textAlign: 'left',
      color: '#505050',
      width: '180px',
      fontFamily: 'OpenBold',
    },
  })

  const data = stagesReducer.stagesData[userControlReducer.selectedUser.value].stageCardsData || {}
  const dataArray = Object.values(data)
  const isNumber = (n: number) => {
    if (isNaN(n) || n === Infinity) { return false }
    return true
  }

  return (<Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Opportunity Stage Report</Text>
      {(filtersReducer.startDate && filtersReducer.endDate) && (
      <Text style={styles.subtitle}>
        Applied range: {moment(filtersReducer.startDate).format('MM/DD/YYYY')} - {moment(filtersReducer.endDate).format('MM/DD/YYYY')}
      </Text>
      )}
      {dataArray.map((el, idx) => {
        const average = el.averageRevenue / el.currentlyInStage
        const conversion = el.is_default ? 100 : percentageFromPrevious(el, idx, dataArray)
        const total = el.is_default ? 100 : percentageTotal(el, dataArray)
        
        return (<View key={idx} style={styles.body}>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Stage: </Text><Text style={styles.bodyItem}>{el.stage}</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Currently in stage: </Text><Text style={styles.bodyItem}>{el.currentlyInStage}</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Were in stage: </Text><Text style={styles.bodyItem}>{el.wereInStage}</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Conversion from previous stage: </Text>
            <Text style={styles.bodyItem}>{isNumber(conversion) ? conversion : 0}%</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Total that enter this stage: </Text>
            <Text style={styles.bodyItem}>{isNumber(total) ? total : 0}%</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Average revenue by client: </Text>
            <Text style={styles.bodyItem}>${round(averageByClient[`stage_${el.stage_id}`] || 0, 2)}</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Average revenue by prospect: </Text>
            <Text style={styles.bodyItem}>${round(averageByProspect[`stage_${el.stage_id}`] || 0, 2)}</Text>
          </View>
          <View style={styles.bodyRow}>
            <Text style={styles.bodyTitle}>Average revenue: </Text>
            <Text style={styles.bodyItem}>${round(isNumber(average) ? average : 0, 2)}</Text>
          </View>
        </View>)
      })}
    </Page>
  </Document>)
}
