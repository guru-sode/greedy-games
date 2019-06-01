import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentWillReceiveProps (nextProps){
        this.setState({
            data: nextProps
        })
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    render() {
        return (
            <div style={{ float: 'left' }}>
                <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    maxDate={new Date()}
                    placeholderText="Select FROM Date"
                    dateFormat="yyyy/MM/dd"
                />

                <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                    maxDate={new Date()}
                    placeholderText="Select TO Date"
                    dateFormat="yyyy/MM/dd"
                />
            </div>
        );
    }
}

export default Graph;