import React, { Component } from 'react';
import Moment from 'react-moment';
//import FileDownload from 'js-file-download';
//import $ from "jquery";
import download from 'downloadjs';


class UserDetail extends Component {

    downloadFile = () =>{

      // $.ajax({
      //   url:'http://github.com/'+this.props.data.full_name+'/archive/master.zip', 
      //   success: download.bind(true, "application/zip", this.props.data.name+".zip")
      // })
      
      // download('http://www.github.com/'+this.props.data.full_name+'/archive/master.zip');
  
      var x=new XMLHttpRequest();
      x.open( "GET",'http://www.github.com/'+this.props.data.full_name+'/archive/master.zip', true);
      x.responseType="blob";
      console.log(this.props.data.name)
      x.onload= function(e){download(e.target.response,"master.zip", "application/octet-stream");};
      x.send();
    }

  

  render() {
    //let downloadUrl = 'http://github.com/'+this.props.data.full_name+'/archive/master.zip';
    let htmlDownload = this.props.data.html_url;
    return (
        <tr>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.description}</td>
            <td>
              <Moment format="DD/MM/YYYY">
                { 
                  this.props.data.created_at
                }
              </Moment>
            </td>
            <td>
              <Moment format="DD/MM/YYYY">
                { 
                  this.props.data.updated_at
                }
              </Moment>
            </td>
            <td>
              <Moment format="DD/MM/YYYY">
                { 
                  this.props.data.pushed_at
                }
              </Moment>
            </td>
            <td className="text-center">
            <a href={htmlDownload} target="_blank">
            <button className="btn btn-info">
              Preview
            </button>
            </a>
            </td>
            <td className="text-center">
              <button onClick={this.downloadFile} className="btn btn-success">Download</button>
            </td>
        </tr>
    );
  }
}

export default UserDetail;