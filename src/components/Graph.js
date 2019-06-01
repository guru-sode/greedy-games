import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip , Legend, Line} from 'recharts';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            dataForGraph: this.props.data
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps
        })
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
        if(this.state.endDate){
            const start = moment(date, "YYYY/MM/DD").valueOf();
            const end = moment(this.state.endDate, "YYYY/MM/DD").valueOf();
            const sort = this.state.data.filter((entry)=>{
                const milli = moment(entry.timestamp, "YYYY/MM/DD").valueOf();
                if(milli >= start && milli <= end){
                    return entry
                }
            })
            this.setState({
                dataForGraph: sort
            })
        }
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
        if(this.state.startDate){
            const start = moment(this.state.startDate, "YYYY/MM/DD").valueOf();
            const end = moment(date, "YYYY/MM/DD").valueOf();
            const sort = this.state.data.filter((entry)=>{
                const milli = moment(entry.timestamp, "YYYY/MM/DD").valueOf();
                if(milli >= start && milli <= end){
                    return entry
                }
            })
            this.setState({
                dataForGraph: sort
            })
        }
    }

    getData(){
        const graphObj =this.state.dataForGraph.map((data)=>{
            return {
                timestamp: data.timestamp,
                eCPM: (data.revenue/data.impressions)*1000
            }
        })
        console.log(graphObj)
        return graphObj
    }

    render() {
        return (
            <div>
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                        maxDate={new Date()}
                        placeholderText="Select FROM Date"
                        dateFormat="yyyy/MM/dd"
                        className="datePicker"
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
                        className="datePicker"
                    />
                <LineChart width={1000} height={500} data={this.getData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="eCPM" stroke="#82ca9d" />
                </LineChart>
            </div>
        );
    }
}

export default Graph;