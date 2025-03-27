import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'back':
      imageSource = require('../assets/icons/back.png');
      break;
    case 'reset':
      imageSource = require('../assets/icons/reset.png');
      break;
    case 'share':
      imageSource = require('../assets/icons/share.png');
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'minus':
      imageSource = require('../assets/icons/minus.png');
      break;
    case 'rules':
      imageSource = require('../assets/icons/rules.png');
      break;
    case 'cross':
      imageSource = require('../assets/icons/cross.png');
      break;
    case 'sparkles':
      imageSource = require('../assets/icons/sparkles.png');
      break;
    case 'pause':
      imageSource = require('../assets/icons/pause.png');
      break;
    case 'arrow':
      imageSource = require('../assets/icons/arrow.png');
      break;
    case 'upload':
      imageSource = require('../assets/icons/upload.png');
      break;
    case 'edit':
      imageSource = require('../assets/icons/edit.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }

});

export default Icons;
