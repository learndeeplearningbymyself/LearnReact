import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import { Picker } from 'emoji-mart';
import * as faker from 'faker';
import Drawer from './Drawer';
import Grid from '@material-ui/core/Grid';

import Main from './ChatBubble/Main';

import 'emoji-mart/css/emoji-mart.css';
import ChatSetting from './ChatSetting';

const emojiRegex = require('emoji-regex/text');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			newMessage: '',
			tempNewMessage: '',
			pickerStyle: {display: 'none'},
		}
	}

	convertDateToString(date) {
		return date.getFullYear() + '/' + date.getMonth() + '/' +
			date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
	}

	componentWillMount() {
		const  messages = [];

		for(let i = 0; i < 15; i += 1) {
			messages.push({
				content: faker.lorem.lines(1),
				ownerId: faker.random.number({ min: 0, max: 1 }),
				timeStamp: this.convertDateToString(faker.date.recent()),
			});
		}

		this.setState({ messages });
	}

	handleSubmit() {
		const { messages, newMessage } = this.state;

		const onlyEmoji = newMessage.replace(emojiRegex(), '').replace(/ /g,'') === '';

		messages.push({
			content: newMessage,
			ownerId: faker.random.number({ min: 0, max: 1 }),
			onlyEmoji: onlyEmoji,
			timeStamp: this.convertDateToString(faker.date.recent())
		});

		this.setState({ messages });
	}

	handleInputChange(evt) {
		this.setState({ newMessage: evt.target.value});
	}

	onClickEmoji(emoji, event) {
		let { newMessage } = this.state;

		newMessage += ' ' + emoji.native + ' ';
		this.setState({ newMessage });
	}

	togglePicker() {
		const { pickerStyle } = this.state;

		if (pickerStyle.display === 'none') {
			pickerStyle.display = 'inline-block';
		} else {
			pickerStyle.display = 'none';
		}

		this.setState({ pickerStyle });
	}

	render() {
		const { messages, newMessage, pickerStyle } = this.state;

		return(
			<div className="App">
				<Grid container spacing={24}>
					<Grid item xs={9}>
					</Grid>
        			<Grid item xs={3}>
						<ChatSetting />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default App;
