import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import AppColors from '../../config/colors';

const FullScreenLoadingIndicator = () => {
    return(
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color={AppColors.primaryBlue} />
        </View>
    );
}

export default FullScreenLoadingIndicator;

