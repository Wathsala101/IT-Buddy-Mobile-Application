import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AppColors from '../../config/colors';
 
export default class GroceryTable extends Component {
  constructor(props) {
    super(props);

    let nameArr = props.data.map(val => val["name"]);
    let priceArr = props.data.map(val => val["price"]);

    let dataArr = [];
    for(let i=0; i < nameArr.length; i++){
      let tempArr = [];
      tempArr.push(nameArr[i]);
      tempArr.push(priceArr[i]);
      dataArr.push(tempArr);
    }

    this.state = {
      tableHead: ['Food Item', 'Price(Rs)'],
      tableData: [
        ...dataArr
      ]
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
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: AppColors.primaryBlue },
  text: { margin: 6 }
});