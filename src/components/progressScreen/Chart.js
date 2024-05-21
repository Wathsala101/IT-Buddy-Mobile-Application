import React from 'react';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import AppColors from '../../config/colors';

class Chart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {studentGpa: props.studentGpa};
  }

  render() {
    const data = this.state.studentGpa.split(", ").map(val => Number(val));

    const axesSvg = {fontSize: 10, fill: 'black'};
    const verticalContentInset = {top: 10, bottom: 10};
    const xAxisHeight = 30;

    return (
      <View style={{height: 250, padding: 15, flexDirection: 'row'}}>
        <YAxis
          data={data}
          style={{marginBottom: xAxisHeight}}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={data}
            contentInset={verticalContentInset}
            svg={{stroke: AppColors.primaryBlue}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, height: xAxisHeight}}
            data={data}
            formatLabel={(value, index) => `sem ${index}`}
            contentInset={{left: 10, right: 10}}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}

export default Chart;
