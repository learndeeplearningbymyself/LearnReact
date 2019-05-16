import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { DEFAULT_AVA_1, DEFAULT_AVA_2 } from '../../utils/constants';

import '../../assets/chatbubble.scss';

function Item(props) {
    const { messagesComponent, isMine, lastTimeStamp } = props;
    return (
        <div className={`chat-bubble chat-bubble-${isMine ? 'mine' : 'friend'}`}>
            <Avatar
                alt="Remy Sharp"
                src={isMine ? DEFAULT_AVA_1 : DEFAULT_AVA_2}
                className="ava" />
            <p className="last-time-stamp">{lastTimeStamp}</p>
            <div className="papers">
                {messagesComponent}
            </div>
        </div>
    )
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    renderContent() {
        const { messages } = this.props;
        const components = [];
        const myId = 1;

        for(let i = 0; i < messages.length; i++) {
            const currentMessageOwnerId = messages[i].ownerId;
            const isMine = currentMessageOwnerId === myId;
            let j = i;

            while(j < messages.length) {
                if (messages[j].ownerId === currentMessageOwnerId) {
                    j++;
                }
                else {
                    break;
                }
            }

            const messageComs = [];

            for (let k = i; k < j; k++) {
                const messageCom =
                    messages[k].onlyEmoji ?
                    <div className="paper">
                        <Typography component="p" className="paper-emoji">
                            {messages[k].content.replace(/ /g,'')}
                        </Typography>
                        <div/>
                    </div>
                    :
                    <div className="paper">
                        <Paper className="paper-content">
                            <Typography component="p">
                                {messages[k].content}
                            </Typography>
                        </Paper>
                        <div/>
                    </div>;
                messageComs.push(messageCom);
            }
            i = j - 1;
            const lastTimeStamp = messages[i].timeStamp;

            components.push(
                <Item
                    lastTimeStamp={lastTimeStamp}
                    isMine={isMine}
                    messagesComponent={messageComs}
                />
            );
        }

        return (
            <div className="content">
                {components.map(component => component)}
            </div>
        )
    }

    render() {
        return (
            <div className="chat-bubbles">
                {this.renderContent()}
            </div>
        );
    }
}

Main.propTypes = {
    messages: PropTypes.arrayOf(object).isRequired,
};

export default Main;
