import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import api from "../../services/api";
import { getToken } from "../../services/auth";
import { Redirect } from "react-router-dom";
import { CardMedia, Grid } from "@material-ui/core";
import { Row } from "reactstrap";

const styles = theme => ({
  systems: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    maxWidth: 400,
    minWidth: 250,
    margin: 10,
    borderRadius: 10
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

  componentDidMount() {}

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
        <Grid>
          <Row>
            <Card className={classes.card}>
              <CardActionArea>
                <CardActions
                  className={classes.actions}
                  onClick={() => {
                    this.setState({ link: "/acompanhamentos", redirect: true });
                  }}
                >
                  <CardContent>
                    <CardMedia
                      className={classes.media}
                      src="../assets/img/Clipboard.png"
                    ></CardMedia>
                    <Typography gutterBottom variant="h5" component="h2">
                      Acompanhamentos
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lista de Pacientes que possuem Acompanhamentos.
                    </Typography>
                  </CardContent>
                </CardActions>
              </CardActionArea>
            </Card>
            <Card className={classes.card}>
              <CardActionArea>
                <CardActions
                  className={classes.actions}
                  onClick={() => {
                    this.setState({ link: "/graficos", redirect: true });
                  }}
                >
                  <CardContent>
                    <CardMedia
                      className={classes.media}
                      image="../../assets/img/Clipboard.png"
                    ></CardMedia>
                    <Typography gutterBottom variant="h5" component="h2">
                      Gráficos
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Gráficos analíticos em cima dos dados de acompanhamentos.
                    </Typography>
                  </CardContent>
                </CardActions>
              </CardActionArea>
            </Card>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
