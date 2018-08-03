import React, { Component } from 'react';
import Moment from 'react-moment';


class UserDetail extends Component {

  downloadFile = () =>{
    setTimeout(() => {
      const response = {
        file: 'http://www.github.com/'+this.props.data.full_name+'/archive/master.zip',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
    });
  }

  render() {

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