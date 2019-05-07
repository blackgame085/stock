import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DropDownList } from '@progress/kendo-react-dropdowns'

export default class EditStock extends React.Component {

    constructor(props) {
        super(props)
        this.onChangeItemName = this.onChangeItemName.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onChangeWarning = this.onChangeWarning.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            item_name: '',
            quantity: '',
            unit: '',
            warning: '',
            unitstock: [],
            history_item_name: [],
            history_item_quantity: [],
            history_item_unit: [],
            history_log_status: [],
            date: new Date()
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/stock/edit/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                item_name: res.data.item_name,
                quantity: res.data.quantity,
                unit: res.data.unit,
                warning: res.data.warning
            })
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://localhost:4000/unit')
        .then(res => {
            this.setState({ unitstock: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    onChangeItemName(e) {
        this.setState({
            item_name: e.target.value
        })
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    onChangeWarning(e) {
        this.setState({
            warning: e.target.value
        })
    }
    
    handleChange(e) {
        this.setState({
            unit: e.target.value
        });
    }

    formatDate(date) {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes
        seconds = seconds < 10 ? '0'+seconds : seconds
        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime
        
    }

    onSubmit(e) {
        console.log(this.formatDate(this.state.date))
        const obj = {
            item_name: this.state.item_name,
            quantity: this.state.quantity,
            unit: this.state.unit.unit_name,
            warning: this.state.warning
        }

        axios.post('http://localhost:4000/stock/update/'+this.props.match.params.id, obj)
        .then(
            console.log(obj.item_name)
        )
        .then(
            axios.get('http://localhost:4000/stock/edit/'+this.props.match.params.id)
            .then(res => {
                const name = {
                    item_name: res.data.item_name,
                    quantity: res.data.quantity,
                    unit: res.data.unit,
                    warning: res.data.warning
                }
                const test = {
                    history_item_name: `${name.item_name} => ${obj.item_name}`,
                    history_item_quantity: `${name.quantity} => ${obj.quantity}`,
                    history_item_unit: `${name.unit} => ${obj.unit}`,
                    history_log_status: `Edit`,
                    date: this.formatDate(this.state.date)
                }
                console.log(test.history_log)
                
                axios.post('http://localhost:4000/log/addLog', test)
                .then(
                    console.log(test)
                )
                
            })
            
        )

        //this.props.history.push('/stock')
    }

    render() {
        return (
            <div>
                <h3>Edit Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Edit Item Name: </label>
                        <input 
                        type="text" 
                        className="form-control"
                        value={this.state.item_name}
                        onChange={this.onChangeItemName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Quantity: </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Warning: </label>
                        <input 
                        type="number" 
                        required="required"
                        className="form-control" 
                        value={this.state.warning}
                        onChange={this.onChangeWarning}
                        />
                    </div>
                    <div className="form-group">
                    <label>Edit Unit: </label><br />
                        <DropDownList
                            data={this.state.unitstock}
                            textField="unit_name"
                            dataItemKey="_id"
                            value={this.state.unit}
                            onChange={this.handleChange}
                            required= {true}
                        />
                    </div>
                    <div className="form-group">
                        <Link to={"/stock"} className="btn btn-primary" style={{marginRight: 30}}>Back</Link>
                        <input type="submit" value="Update Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}