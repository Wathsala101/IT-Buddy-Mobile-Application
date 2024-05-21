import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

export default class TableData extends Component {
  constructor(props) {
    super(props);
    let studentGpa = props.studentGpa == undefined ? [] : props.studentGpa.split(', ');
    let topGpa = props.studentGpa == undefined ? [] : props.topGpa.split(', ');

    this.state = {
      tableHead: ['Name', 'Batch top : GPA', 'GPA'],
      tableData: [
        ['semester 01', topGpa[0], studentGpa[0]],
        ['semester 02', topGpa[1], studentGpa[1]],
        ['semester 03', topGpa[2], studentGpa[2]],
        ['semester 04', topGpa[3], studentGpa[3]],
      ],
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 0, borderColor: '#c8e1ff'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  head: {height: 40, backgroundColor: 'transparent'},
  text: {margin: 6},
});
