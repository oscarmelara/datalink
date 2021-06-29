import React from 'react'
import moment from 'moment'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { IReportData } from '../../TS'

interface IReportByStage {
  data: IReportData[]
  title: string
  startDate: Date | null
  endDate: Date | null
}

export const ReportByStage: React.FC<IReportByStage> = ({ title, startDate, endDate, data }) => {
  Font.register({
    family: 'OpenBold',
    src: '/fonts/OpenSans-Bold.ttf'
  })
  Font.register({
    family: 'OpenRegular',
    src: '/fonts/OpenSans-Regular.ttf'
  })
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
      width: '140px',
      fontFamily: 'OpenBold',
    },
  })

  return (<Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Report - {title}</Text>
      {(startDate && endDate) && (<Text style={styles.subtitle}>
        Applied range: {moment(startDate).format('MM/DD/YYYY')} - {moment(endDate).format('MM/DD/YYYY')}
      </Text>)}
      {data.map((el, idx) => (<View key={idx} style={styles.body}>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>Contact Name: </Text><Text style={styles.bodyItem}>{el.contactName}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>Contact Phone: </Text><Text style={styles.bodyItem}>{el.contactPhone}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>User Name: </Text><Text style={styles.bodyItem}>{el.userName}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>Estimated Close Date: </Text><Text style={styles.bodyItem}>{el.estimatedCloseDate}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>Opportunity Title: </Text><Text style={styles.bodyItem}>{el.opportunityTitle}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyTitle}>Projected Revenue: </Text><Text style={styles.bodyItem}>{el.projectedRevenue}</Text>
        </View>
      </View>))}
    </Page>
  </Document>)
}
