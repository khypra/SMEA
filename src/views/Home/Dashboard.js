import React, {
  Component
  // lazy, Suspense
} from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Badge,
//   Col,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Progress,
//   Row,
//   Table
// } from "reactstrap";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import api from "../../services/api";
import { getToken } from "../../services/auth";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  systems: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    maxWidth: 400,
    minWidth: 250,
    margin: 10
  },
  media: {
    height: 140
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      userCurrent: {},
      dropdownOpen: false,
      radioSelected: 2,
      userToken: "",
      link: "",
      redirect: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  componentDidMount() {
    
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const classes = this.props.classes;
    return (
      <div className="animated fadeIn">
        {this.renderRedirect()}

      </div>
    );
  }
}

export default withStyles(styles)(Home);
