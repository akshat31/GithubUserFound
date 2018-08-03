import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//components
import Title from "./component/title";
import Form from "./component/form";
import UserDetail from "./component/UserDetail";
import TableHead from "./component/tableHead";
import UserImage from './component/UserImage';

class App extends Component {
    state ={
        imgError:false,
        dataSet:[],
        showTable:false,
    }


    getDetail = async (e) =>{
        const currentComp = this;
        e.preventDefault();
        const user = e.target.elements.gitUser.value;
        axios.get(`https://api.github.com/users/${user}/repos?all`)
        .then(api_call => { 
            const fullData = api_call.data;
            this.setState({ dataSet:fullData , showTable:true , imgError:false });
        })
        .catch(function (error) {
            console.log(error);
            currentComp.setState({ dataSet:false , showTable:false , imgError:true });
          });
    }

    errorimg =() =>{
        return(
            <div className="text-center">
                <h1 className="display-5" style={{color:'red'}}>USER NOT FOUND</h1>
                <img src={ require("./images/NoUser.jpg")} alt="error"/>
            </div>
        )
    }

    getImage = () =>{
        return(
            <div>
                <UserImage userIMG={this.state.dataSet[0].owner.avatar_url}/>
            </div>
        )
    }

    render() {

    return (
        <div className="container mt-5">
         <div className="row">
            <div className="col-lg-4">
                <Title/><br/>
                <Form getDetail ={ this.getDetail }/>
                <br/>
                <br/>
            </div>
            
            <div className="col-lg-4">
                { this.state.showTable && this.getImage() }
            </div>
            <div className="col-lg-4">
               { 
                    this.state.dataSet && this.state.showTable && 
                    // <table className="table">
                    //     <tbody>
                    //     <tr>
                    //         <td>User Name</td>
                    //         <td>{ this.state.dataSet[0].owner.login}</td>
                    //     </tr>
                    //     </tbody>
                    // </table>
                    <h1>User Name :-<b>{ this.state.dataSet[0].owner.login}</b></h1>
                }
            </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                { this.state.imgError && this.errorimg() }
                    <table className="table table-striped table-bordered table-light">
                        <thead className="thead-dark">
                            { this.state.showTable && <TableHead/> }
                        </thead>        
                        <tbody>
                            {this.state.dataSet && this.state.dataSet.map((row) => <UserDetail  
                        key= {row.id} data = {row}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
}

export default App;