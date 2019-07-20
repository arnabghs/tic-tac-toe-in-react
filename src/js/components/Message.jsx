import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    extraMessage: state.extraMessage
  };
};

const Message = function({ extraMessage }) {
  return <div>{extraMessage}</div>;
};

const ExtraMessage = connect(mapStateToProps)(Message);

export { ExtraMessage };
