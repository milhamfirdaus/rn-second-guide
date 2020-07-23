import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Style from '../assets/theme/global-styles';

const MainButton = props => {
	return(
		<TouchableOpacity onPress={props.onPress}>
			<View style={customStyle.button}>
				<Text style={customStyle.buttonText}> {props.children} </Text>
			</View>
		</TouchableOpacity>
	);
}
const customStyle = StyleSheet.create({
	button:{
		backgroundColor : Style.accent.color,
		paddingVertical : 12,
		paddingHorizontal: 30,
		borderRadius : 10
	},

	buttonText:{
		color: 'white',
		fontFamily: 'openSans',
	}
});

export default MainButton;