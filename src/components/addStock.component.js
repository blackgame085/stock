import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DropDownList } from '@progress/kendo-react-dropdowns'

export default class AddStock extends React.Component {
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
        e.preventDefault()
        console.log(`Item Name: ${this.state.item_name}`)
        console.log(`Quantity: ${this.state.quantity}`)
        console.log(`Unit: ${this.state.unit.unit_name}`)
        console.log(`Warning: ${this.state.warning}`)
        console.log(this.formatDate(this.state.date))

        const newStock = {
            item_name: this.state.item_name,
            quantity: this.state.quantity,
            unit: this.state.unit.unit_name,
            warning: this.state.warning,
            history_item_name: this.state.item_name,
            history_quantity: this.state.quantity,
            history_unit: this.state.unit.unit_name,
            history_warning: this.state.warning,
        }

        axios.post('http://localhost:4000/stock/addstock', newStock)
        .then(
            //res => console.log(newStock.item_name)
            
            () => {
                const test = {
                    history_item_name: newStock.item_name,
                    history_item_quantity: newStock.quantity,
                    history_item_unit: newStock.unit,
                    history_log_status: `Add`,
                    date: this.formatDate(this.state.date)
                }
        
                axios.post('http://localhost:4000/log/addLog', test)
                .then(
                    res => {
                        if(test.history_log_status){
                            console.log('hi')
                        }else{
                            console.log('no')
                        }
                    }
                )
            }
        )

        this.setState({
            item_name: '',
            quantity: '',
            unit: '',
            warning: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Add New Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Item Name: </label>
                        <input 
                        type="text" 
                        required="required"
                        className="form-control"
                        value={this.state.item_name}
                        onChange={this.onChangeItemName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Quantity: </label>
                        <input 
                        type="number" 
                        required="required"
                        className="form-control" 
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Warning: </label>
                        <input 
                        type="number" 
                        required="required"
                        className="form-control" 
                        value={this.state.warning}
                        onChange={this.onChangeWarning}
                        />
                    </div> 
                    <fieldset>
                        <label>Add Unit: </label><br />
                        <DropDownList
                            data={this.state.unitstock}
                            textField="unit_name"
                            dataItemKey="_id"
                            value={this.state.unit}
                            onChange={this.handleChange}
                            required= {true}     
                        />
                    
                    <div className="form group" style={{marginTop: '30px'}}>
                        <Link to={"/stock"} className="btn btn-primary" style={{marginRight: 30}}>Back</Link>
                        <input type="submit" value="Register Item" className="btn btn-primary" />
                    </div>
                    </fieldset>
                </form>

            </div>
        )
    }
}


