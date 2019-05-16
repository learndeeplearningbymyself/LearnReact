import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import { Picker } from 'emoji-mart';
import * as faker from 'faker';

import Main from './ChatBubble/Main';

import 'emoji-mart/css/emoji-mart.css';

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
				<Main messages={messages} />
				<Input value={newMessage} onChange={this.handleInputChange.bind(this)} />
				<MoodIcon onClick={this.togglePicker.bind(this)} />
				<Fab onClick={this.handleSubmit.bind(this)} color="primary" aria-label="Send">
					<SendIcon />
				</Fab>
				<Picker
					style={pickerStyle}
					set='messenger'
					autoFocus={false}
					onClick={this.onClickEmoji.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
