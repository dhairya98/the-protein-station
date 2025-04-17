import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { name: "", location: "" },
    };
  }

  async componentDidMount() {
    console.log("Component Mount");
    const data = await fetch("https://api.github.com/users/dhairya98");

    const json = await data.json();
    this.setState({ userInfo: json });
  }

  render() {
    const { name } = this.props;

    return (
      <div className="user-card">
        <img
          src={this.state.userInfo.avatar_url}
          alt={this.state.userInfo.name}
        />
        <h2>Name: {this.state.userInfo.name}</h2>
        <h2>Location: {this.state.userInfo.location || "Delhi"}</h2>
        <h2>Contact: {this.state.userInfo.login}</h2>
      </div>
    );
  }
}

export default UserClass;
