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
        currentPage: 1,
        reposPerPage: 5
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

    handleClick = (event) =>{
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    render() {

        const { dataSet , currentPage, reposPerPage } = this.state;
        // Logic for displaying current repos
        const indexOfLastTodo = currentPage * reposPerPage;
        const indexOfFirstTodo = indexOfLastTodo - reposPerPage;
        const currentTodos = dataSet.slice(indexOfFirstTodo, indexOfLastTodo);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataSet.length / reposPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                className="page-item"
                key={number}
                >
                <a className="page-link" onClick={this.handleClick} id={number}>
                {number}
                </a>
                </li>
            );
            });

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
                        {this.state.dataSet && currentTodos.map((row) => <UserDetail  
                    key= {row.id} data = {row}/>)}
                    </tbody>
                </table>
            </div>       
        </div>
            { this.state.dataSet.length > 10 && 
                <ul className="pagination" style={{float:'right'}}>
                    {renderPageNumbers}
                </ul>
            }
        </div>
    );
  }
}

export default App;