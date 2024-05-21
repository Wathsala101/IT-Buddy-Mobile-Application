import React, {useState} from 'react';
import {Switch} from 'react-native';

export default function CommonSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={() => {}}
      value={isEnabled}
    />
  );
}
