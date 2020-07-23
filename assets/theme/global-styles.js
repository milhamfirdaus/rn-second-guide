import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const Styles = StyleSheet.create({
	primary : {
		color: '#4C5E18',
	},

	accent :{
		color : '#F7AE54',
	},

	GameOverscreen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
		alignItems: 'center',
		paddingVertical : 10,
    },

    HomeScreen :{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

	text:{
		fontFamily: 'openSans'
	},

	textBig:{
		fontSize: 18,
		fontFamily: 'openSans-Bold'
	},

	textHighlight : {
		color : '#4C5E18',
		fontFamily: 'openSans-Bold'
	},

	textResult :{
		textAlign: 'center',
		fontSize : Dimensions.get('window').height > 400 ? 16 : 20,
	}
});

export default Styles;