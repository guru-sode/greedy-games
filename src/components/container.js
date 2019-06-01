import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Graph from './Graph';
import Table from './Table';

const tab = {
    flexGrow: '1',
    backgroundColor: 'white',
    bottom: '80px',
    position: 'absolute',
    zIndex: '1',
    marginLeft: '20px',
    height: '300px',
    width: '70%',
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingTop: '0px', paddingLeft: '20px' }}>
            {props.children}
        </Typography>
    );
}

class container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isError: false,
            value: 0
        };
    }

    componentWillMount = () => {
        const url = 'http://www.mocky.io/v2/5cd04a20320000442200fc10';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    data
                })
            })
            .catch((e) => {
                this.setState({
                    isError: true
                })
            })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div>
                <h1>GREEDY GAMES ASSIGNMENT</h1>
                <div className={tab}>
                    <AppBar position="static">
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Graphical representation" />
                            <Tab label="Tabular  representation" />
                        </Tabs>
                    </AppBar>
                    {this.state.value === 0 && <TabContainer> <Graph data={this.state.data} /></TabContainer>}
                    {this.state.value === 1 && <TabContainer> <Table data={this.state.data} /></TabContainer>}
                </div>
            </div>
        );
    }
}

export default container;