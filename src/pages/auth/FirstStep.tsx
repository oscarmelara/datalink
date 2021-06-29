import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "../../assets/images/logo_datalink.svg";

import { useInputChange, simpleAlert } from "../../utils";
import { Text } from "./Components";
import { ParticlesLayout } from "../Layout/ParticlesLayout";
import { Card } from "./style";
import Swal from "sweetalert2";

const FirstStep: React.FC<RouteComponentProps> = ({ history }) => {
  const [directory, setDirectory] = useState();
  const url = process.env.REACT_APP_LOGIN_DIRECTORY
  const username = process.env.REACT_APP_USER_DIRECTORY
  const password = process.env.REACT_APP_PASSWORD_DIRECTORY

  useEffect(() => {
    axios.get(`${url}`, {
      auth: {
        username: `${username}`,
        password: `${password}`
      }
    }).then(({ data }) => {
      setDirectory(data);
    });
  }, [url, username, password]);
  const [input, handleInputChange] = useInputChange({
    email: "",
  });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const email = input.email.toLowerCase();
    let response = false;
    let url = '' 
 
    for (let i = 0; i < directory.length; i++) {
      for (let j = 0; j < directory[i].emails.length; j++) {
        if (email === directory[i].emails[j]) {
          response = true;
          url = directory[i].instance;
        }
      }
    }
    if (response) {
      window.location.replace(`${url}/login/${email}`);
    } else {
      Swal.close();
      simpleAlert({
        icon: 'error',
        html: 'Your email could not be found'
      })
    }
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
            value={input.email.toLowerCase()}
            onChange={handleInputChange}
          />
          <Button type="submit" className="dl-button fwb">
            Next
          </Button>
        </form>
      </Card>
      <Text extra="" />
    </ParticlesLayout>
  );
};

export default withRouter(FirstStep);
