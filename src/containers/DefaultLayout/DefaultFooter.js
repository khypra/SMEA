import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="https://coreui.io">CoreUI</a> &copy; 2019 creativeLabs.
        </span>
        <span className="ml-auto">
          Powered by <a href="https://coreui.io/react">CoreUI for React</a>
        </span>
        <span className="ml-auto">
          Desenvolvido pela{" "}
          <a
            href="https://www.setc.se.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secretaria de Estado de Transparência e Controle
          </a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
