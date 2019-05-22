import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import Viewer from 'react-viewer';

import 'react-viewer/dist/index.css';

import { DEFAULT_AVA_1, DEFAULT_AVA_2 } from '../utils/constants';

import '../assets/chatsetting.scss';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  title: {
    color: '#0989fd',
  },
  collapse: {
    paddingTop: 10,
  },
  filesListItem: {
    marginTop: 15,
  }
});


class ChatSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openImagesList: false,
      openFilesList: false,
      viewerVisible: false,
    };
  }

  handleToggleImagesList = () => {
    this.setState(state => ({ openImagesList: !state.openImagesList }));
  };

  handleToggleFilesList = () => {
    this.setState(state => ({ openFilesList: !state.openFilesList }));
  };

  openImageViewer() {
    this.setState({ viewerVisible: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={1} className={classes.root}>
        <Typography variant="title" className={classes.title} component="p">
          Chat Setting
        </Typography>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleToggleImagesList}>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText inset primary="Images List" />
            {this.state.openImagesList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.collapse} in={this.state.openImagesList} timeout="auto" unmountOnExit>
            <GridList cellHeight={100} cols={6}>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_1} onClick={this.openImageViewer.bind(this)}/>
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_2} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_1} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_2} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_1} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_2} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_1} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_2} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
              <GridListTile cols={2}>
                <img src={DEFAULT_AVA_1} onClick={this.openImageViewer.bind(this)} />
              </GridListTile>
            </GridList>
          </Collapse>
          <ListItem className={classes.filesListItem} button onClick={this.handleToggleFilesList}>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText inset primary="Files List" />
            {this.state.openFilesList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Viewer
            visible={this.state.viewerVisible}
            onClose={() => { this.setState({ viewerVisible: false }); } }
            images={[{src: DEFAULT_AVA_1, alt: ''}, {src: DEFAULT_AVA_2, alt: ''}, {src: DEFAULT_AVA_1, alt: ''},{src: DEFAULT_AVA_2, alt: ''}, {src: DEFAULT_AVA_1, alt: ''}, {src: DEFAULT_AVA_2, alt: ''}]}
          />
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(ChatSetting);
