import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, withRouter, RouteComponentProps, useLocation, useParams } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Logo from "../../assets/images/logo_datalink.svg";
import Context from "../../Context";
import { setCurrentUser } from "../../actions";
import { simpleAlert, useInputChange, token } from "../../utils";
import { Text, Social } from "./Components";
import { ParticlesLayout } from "../Layout/ParticlesLayout";
import { IloginData, IcurrentUser } from "../../TS";
import { Card } from "./style";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { email } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token()) {
      window.location.href = "/dashboard"; // to force a token validation utils/auth.ts
    }
  }, [email]);
  const [input, handleInputChange] = useInputChange({
    email: `${email}`,
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const { activateAuth } = useContext(Context.Consumer);


  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {


    ev.preventDefault();
          axios
            .post('logins', input)
            .then(({ data }: { data: IloginData }) => {              
              if (remember) {
                localStorage.setItem("AT", data.id);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("principalType", data.principalType);
                localStorage.setItem("infusionSoft", data.company.infusionSoft);
                localStorage.setItem("connectWise", data.company.connectWise);
                localStorage.setItem(
                  "dattoAutotask",
                  data.company.dattoAutotask
                );
                localStorage.setItem(
                  "companyManager",
                  `${data.company.firstName} ${data.company.lastName}`
                );
                localStorage.setItem("companyManagerImage", data.company.image);
                localStorage.setItem("companyId", data.company.companyId);
              } else {
                sessionStorage.setItem("AT", data.id);
                sessionStorage.setItem("userId", data.userId);
                sessionStorage.setItem("principalType", data.principalType);
                sessionStorage.setItem(
                  "infusionSoft",
                  data.company.infusionSoft
                );
                sessionStorage.setItem("connectWise", data.company.connectWise);
                sessionStorage.setItem(
                  "dattoAutotask",
                  data.company.dattoAutotask
                );
                sessionStorage.setItem(
                  "companyManager",
                  `${data.company.firstName} ${data.company.lastName}`
                );
                sessionStorage.setItem(
                  "companyManagerImage",
                  data.company.image
                );
                sessionStorage.setItem("companyId", data.company.companyId);
              }
              axios.defaults.params = { access_token: data.id };
              const { userId } = data;

              const type =
                data.principalType === "company" ? "companies" : "customers";
              return axios.get(`${type}/${userId}`);
            })
            .then(({ data }: { data: IcurrentUser }) => {            
              dispatch(setCurrentUser(data));
              activateAuth();
              // window.location.replace(`${url}/dashboard`);
              history.push('/dashboard')
            })
            .catch(() =>
              simpleAlert({
                icon: "warning",
                html: "Could not log in, try again",
              })
            );
  };

  return (
    <ParticlesLayout>
      <Card className="py-5 px-4 ml-130">
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <img src={Logo} alt="DataLink" className="mb-4" />
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            value={input.email}
            onChange={handleInputChange}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="mb-2"
            value={input.password}
            onChange={handleInputChange}
          />
          <Row className="w-100 mb-4">
            <Col className="p-1">
              <input
                className="help-checkbox"
                type="checkbox"
                id="remeber"
                name="remeber"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label className="tc-gray" htmlFor="remeber">
                Remember me
              </label>
            </Col>
            <Col className="p-1">
              <Link to="/reset-password">Forgot password</Link>
            </Col>
          </Row>
          <Button type="submit" className="dl-button fwb">
            Sign in
          </Button>
          <Social />
        </form>
      </Card>
      <Text extra="" />
    </ParticlesLayout>
  );
};

export default withRouter(Login);
