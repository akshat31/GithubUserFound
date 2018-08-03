import React, { Component } from 'react';


class UserImage extends Component {

  render() {
    return (
        <div>
            <img src={this.props.userIMG} width="70%" className='img-thumbnail float-right' alt="profile pic"/>
        </div>
    );
  }
}

export default UserImage;