import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import api from "../../../services/api";
import { login, isAuthenticated } from "../../../services/auth";
import { withSnackbar } from "notistack";
import CardMedia from "@material-ui/core/CardMedia";
import Hmaislogo from "../Login/Hmaislogo.jpg";

class Login extends Component {
  state = {
    login: "",
    password: "",
    redirect: false
  };

  handleSignIn = e => {
    // e.preventDefault();
    // // console.log(this.state);
    // api
    //   .autenticate(this.state.email, this.state.password)
    //   .then(result => {
    //     // console.log(result);
    //     login(result.data.token);
    //     this.props.enqueueSnackbar("Seja bem vindo", { variant: "success" });
    //     // console.log(this.props);
    //     this.setState({ redirect: true });
    //   })
    //   .catch(e => console.error(e));
    login("token");
    this.props.enqueueSnackbar("Seja bem vindo", { variant: "success" });
    this.setState({ redirect: true });
  };

  renderRedirect() {
    if (this.state.redirect) return <Redirect to="/" />;
  }

  componentDidMount() {
    this.setState({ redirect: isAuthenticated() });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          {this.renderRedirect()}
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardMedia
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <img
                      src={Hmaislogo}
                      alt=""
                      style={{
                        width: 370,
                        height: 195,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    />
                  </CardMedia>
                  <CardBody>
                    <Form onSubmit={this.handleSignIn}>
                      <h1>Login</h1>
                      {/* <p className="text-muted">Sign In to your account</p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Login"
                          autoComplete="login"
                          onChange={e =>
                            this.setState({ login: e.target.value })
                          }
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Senha"
                          autoComplete="current-password"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </InputGroup>
                      <Row>
                        <Col></Col>
                        <Col
                          xs="2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Button
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col></Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withSnackbar(Login);
