import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
 
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Home', 'Head2', 'x', 'Head4', 'Away'],
      widthArr: [140, 50, 20, 50, 140]
    }
  }
 
  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 18; i += 1) {
      const rowData = [];
      for (let j = 0; j < 5; j += 1) {        
        if(j == 2){
          rowData.push("x");
        }
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal={true}>
          <SafeAreaView>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});