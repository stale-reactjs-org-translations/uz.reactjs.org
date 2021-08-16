class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Salom {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Alisher" />,
  document.getElementById('hello-example')
);