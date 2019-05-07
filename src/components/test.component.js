import React from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';

export default class Test extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            data: {
                columns: [
                    {
                        label: 'Date',
                        field: 'date',
                        sort: 'desc',
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        sort: 'desc',

                    },
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'desc',

                    },
                    {
                        label: 'Quantity',
                        field: 'quantity',
                        sort: 'desc',

                    },
                    {
                        label: 'Unit',
                        field: 'unit',
                        sort: 'desc',

                    },
                ],
                rows: []
            },
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/log/')
        .then(res => {
            this.setState({ data: {
                columns: this.state.data.columns,
                rows: res.data.map(obj => {
                    return {date: obj.date, status: obj.history_log_status, name: obj.history_item_name, quantity: obj.history_item_quantity, unit: obj.history_item_unit}
                })
            }})
        })
        .catch(err => {
            console.log(err)
        })
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.data)  
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={this.state.data}
                    />
                    <input type="Submit" defaultValue="test" />
                </form>
            </div>
        )
    }
}