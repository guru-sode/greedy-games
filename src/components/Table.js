import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: this.props.data
         };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentWillReceiveProps (nextProps){
        console.log(nextProps)
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
                data: sort
            })
        }
    }


    render() {
        return (
            <div>
            <div style={{ float: 'left', marginTop: '500px' }}>
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
            <ReactTable
              manual
              className="no-border -highlight"
              data={this.state.data.reverse()}
              filterable
              sortable= {true}
            //   page={this.state.page}
              defaultPageSize={10}
              pages={this.state.data.length/10}
              showPagination={true}
              columns={[
                {
                  Header: 'Date',
                  accessor: 'timestamp'
                },
                {
                  Header: 'Game',
                  accessor: 'game'
                },
                {
                  Header: 'Revenue',
                  accessor: 'revenue'
                },
                {
                  Header: 'Impressions',
                  accessor: 'impressions'
                },
                {
                    id: 'calculateEcPM',
                    Header: 'eCPM',
                    accessor: d => (d.revenue/d.impressions)*1000
                  }
              ]}
            //   onPageChange={pageIndex => this.loadPage(pageIndex)}
            />
            </div>
        );
    }
}

export default Table;