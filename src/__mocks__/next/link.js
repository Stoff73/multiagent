const React = require("react");

function Link(props) {
  return React.createElement("a", { href: props.href }, props.children);
}

module.exports = Link;