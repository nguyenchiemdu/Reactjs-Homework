import React from 'react';


class TableItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ListUser : [],
            user : {},
            top : 0,
            isUpdated : false,
            userUpdate: {},
        }


    }

    componentDidMount(){
        fetch('http://dummy.restapiexample.com/api/v1/employees')
        .then(res => res.json())
        .then(json => {
            this.setState({
                ListUser: json.data,
            },()=> this.setState({top : this.state.ListUser.length}))
        })
    }
    handleChange = e=>{
        this.setState({
            user : {...this.state.user,[e.target.name]: e.target.value}
        })
    }
    handleClickAdd = ()=>{
        this.setState({top : this.state.top +1},
                ()=>{
                    this.setState({
                                    user : {...this.state.user,id: this.state.top},
                                },
                                        ()=>{
                                            this.setState({
                                                ListUser : [...this.state.ListUser,this.state.user],
                                            })}
                                )}      
        )
        
    }

    handleClickUpdate= (item) => ()=>{
        this.setState({
            isUpdated : true,
            userUpdate  : item,
        })
    }
    handleChangeUpdate = e =>{
       this.setState({
           userUpdate : {...this.state.userUpdate,[e.target.name]: e.target.value}
       })
    }

    handleUpdate = ()=>{
        const ListUserUpdated = this.state.ListUser.map(item =>{
            if (item.id== this.state.userUpdate.id){return this.state.userUpdate}
            return item
          })
          this.setState({
              ListUser : ListUserUpdated,
          })
    }
    handleClickDelete =  (id) => () =>{
                const ListUserDeleted = this.state.ListUser.filter((item)=>{
                    return item.id !== id;
                })
                this.setState(
                    {
                        ListUser : ListUserDeleted
                    }
                )
    }
    


    render(){
        return(
            <div>
                {
                    this.state.isUpdated == false ? null :  
                    <div className='UpdateComponent'>
                    <input placeholder="employee_name" onChange={this.handleChangeUpdate}  name='employee_name' value={this.state.userUpdate.employee_name}/>
                    <input placeholder="employee_salary"onChange={this.handleChangeUpdate} name='employee_salary'value={this.state.userUpdate.employee_salary}/>
                    <input placeholder="employee_age"onChange={this.handleChangeUpdate} name='employee_age'value={this.state.userUpdate.employee_age}/>
                    <button onClick={this.handleUpdate}>Update</button>
                    </div>
                }
                <table style={{width:'80%',textAlign: 'left', margin:'0 auto'}}>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Change</th>
                    </tr>
                    {
                        this.state.ListUser.map((item,idx)=>{
                            return(
                                <tr>
                                    <td>{idx+1}</td>
                                    <td>{item.employee_name}</td>
                                    <td>{item.employee_salary}</td>
                                    <td>{item.employee_age}</td>
                                    <td><button onClick={this.handleClickUpdate(item)}>Update</button><button onClick={this.handleClickDelete(item.id)} >Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
                <div className='AddComponent'>
                    <input placeholder="employee_name" onChange={this.handleChange}  name='employee_name'/>
                    <input placeholder="employee_salary"onChange={this.handleChange} name='employee_salary'/>
                    <input placeholder="employee_age"onChange={this.handleChange} name='employee_age'/>
                    <button onClick={this.handleClickAdd}>Add</button>
                </div>
            </div>
        )
     
    }
}

export default TableItem;