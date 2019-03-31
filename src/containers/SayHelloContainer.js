import React from "react";
import { connect } from "react-redux";
import { sayHello } from "../modules/helloWorld";

class SayHelloContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch(sayHello("Jing"));
  }

  render() {
    const { user, content } = this.props;
    return (
      <div>
        {user}, {JSON.stringify(content)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.sayHello.user,
  content: state.sayHello.content,
});

export default connect(mapStateToProps)(SayHelloContainer);
