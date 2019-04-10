import React from 'react'

class CalculateStorage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          value: [],
          list: [],
        };
      }
    
      onChangeValue = event => {
        this.setState({ value: event.target.value });
      };
    
      onAddItem = () => {
        this.setState({
            list: [...this.state.list, this.state.value]
        });
        console.log(this.state.value)
        console.log(this.state.list)
      };
    
      render() {
        return (
          <div>
            <ul>
              {this.state.list.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
    
            <input
              type="text"
              value={this.state.value}
              onChange={this.onChangeValue}
            />
            <button
              type="button"
              onClick={this.onAddItem}
              disabled={!this.state.value}
            >
              Add
            </button>
          </div>
        );
      }
}

export default CalculateStorage
/*
import React from 'react'

class CalculateStorage extends React.Component {
    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)
        this.state = {         
            name: [
                {
                    id: 1,
                    content: 'hello'
                },
                {
                    id: 2,
                    content: 'fucksdsad'
                },
                {
                    id: 3,
                    content: 'fuasdqwe'
                }
            ]
        }
    }

    delete(id) {
        
        const name = this.state.name.filter(list => {
            return list.id !== id
        })
        this.setState({
            name
        })
        
        console.log(this.state.name)
       
    }
        

    render() {
        const Todos = (({list, del}) => {
            const nameList = list.length ? (
                this.state.name.map(obj => {
                    return (
                        <tr key={obj.id} >
                            <td onClick={() => {del(obj.id)}}>{obj.content} </td>
                            
                        </tr>
                    )
                })
            ) : (
                <tr><td>no content</td></tr>
            )
            return (
                <tbody>
                    {nameList}
                </tbody>
            )
        })
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                        <Todos list={this.state.name} del={this.delete}/>          
                </table>
            </div>
        )
    }
}

export default CalculateStorage

*/