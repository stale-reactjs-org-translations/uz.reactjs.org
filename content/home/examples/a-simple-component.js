class HelloMessage extends React.Component {
  render() {
    return <div>Salom {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Alisher" />);
