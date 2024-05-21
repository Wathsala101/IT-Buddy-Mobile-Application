import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AppColors from '../../config/colors';
 
export default class ToBeDonePaymentTable extends Component {
  constructor(props) {
    super(props);
    let data = [];
    for(let i = 0; i< props.data.length; i++){
      let temp = [];
      temp.push(props.data[i]["invoiceNo"]);
      temp.push(props.data[i]["date"]);
      temp.push(props.data[i]["description"]);
      temp.push(props.data[i]["amount"]);
      data.push(temp);
    }
    this.state = {
      tableHead: ['Invoice No', 'Deadline', 'Description', 'Amount(Rs.)'],
      tableData: data
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 5, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: AppColors.primaryBlue,  },
  text: { margin: 6 }
});