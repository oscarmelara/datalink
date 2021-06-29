import React, { useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { IoIosRocket } from "react-icons/io";
import { split, get, unescape } from "lodash/fp";
import {
  Link,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Button } from "react-bootstrap";
import Context from "../../Context";
import { setCurrentUser } from "../../actions";
import { ParticlesLayout } from "../Layout/ParticlesLayout";
import { CardPassword } from "./style";
import { loaderAlert, simpleAlert, useInputChange } from "../../utils";
import { IcurrentUser } from "../../TS";
import icPassword from "../../assets/images/icons/ic_password.svg";
import Logo from "../../assets/images/logo_datalink_white.svg";
import { setAxiosConfig } from "../../utils";

const NewPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, activateAuth } = useContext(Context.Consumer);
  const history = useHistory();
  const [input, handleInputChange] = useInputChange({ pass: "", pass2: "" });
  const { token } = useParams();
  const { search } = useLocation();
  const info = split("?", search);
  const path = get("path", useRouteMatch()) || "";

  useEffect(() => {
    if (!token || !search) {
      history.push("/");
    }
  }, [history, search, token]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (input.pass !== input.pass2) {
      simpleAlert({ html: "the password does not match" });
      return false;
    }
    loaderAlert({ html: "sending data..." });
    const type = info[1] === "company" ? "companies" : "customers";

    const formData = new FormData();
    formData.append("newPassword", input.pass);
    const config = {
      params: {
        access_token: token,
      },
    };

    axios
      .post(`${type}/reset-password`, { newPassword: input.pass }, config)
      .then(() => {
        debugger;
        Swal.close();
        if (!path.includes("welcome")) {
          activateAuth();
          simpleAlert({
            html: "Your password was updated successfully",
            icon: "success",
          }).then(() => {
            if (isAuth) {
              history.push("/profile");
            } else {
              history.push("/");
            }
          });
        }
        debugger;
        return axios.get("companies", config);
      })
      .then(({ data }) => {
        if (path.includes("welcome")) {
          localStorage.setItem("AT", token || "");
          localStorage.setItem("userId", info[3]);
          localStorage.setItem("principalType", info[1]);
          localStorage.setItem("infusionSoft", data.infusionSoft);
          localStorage.setItem(
            "companyManager",
            `${data.firstName} ${data.lastName}`
          );
          localStorage.setItem("companyManagerImage", data.image);
          setAxiosConfig();
          return axios.get(`${type}/${info[3]}`, config);
        }

        return data;
      })
      .then(({ data }: { data: IcurrentUser }) => {
        if (path.includes("welcome")) {
          dispatch(setCurrentUser(data));

          activateAuth();
          simpleAlert({
            html: "Your password was updated successfully",
            icon: "success",
          }).then(() => {
            history.push("/select-connections");
          });
        }
      })
      .catch(() => {
        Swal.close();
        if (!path.includes("welcome")) {
          debugger;
          simpleAlert({
            html: "There was an error updating your password",
            icon: "warning",
          });
        }
      });
  };

  return (
    <ParticlesLayout className="justify-content-center">
      <Link to="/">
        <img src={Logo} alt="DataLink" className="logo-white" />
      </Link>
      <CardPassword className="px-3 py-4 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          {path.includes("welcome") ? (
            <IoIosRocket color="#5d49c7" className="mb-4" size={65} />
          ) : (
            <img src={icPassword} alt="DataLink" className="mb-4" />
          )}

          {path.includes("welcome") ? (
            <h2 className="fwb fz-18 tc-gray">
              Hello {unescape(info[2]).replace(/%20/g, " ")}
            </h2>
          ) : (
            <h2 className="fwb fz-18 tc-gray">Reset Password</h2>
          )}
          {info[2] ? (
            <p className="fwb fz-12">
              Welcome to DataLink, set up your password here:
            </p>
          ) : (
            <p className="fwsb fz-13">Enter your new password</p>
          )}
          <input
            value={input.pass}
            name="pass"
            onChange={handleInputChange}
            required
            type="password"
            placeholder="New password"
          />
          <input
            value={input.pass2}
            name="pass2"
            onChange={handleInputChange}
            required
            type="password"
            placeholder="Confirm your password"
          />
          <Button type="submit" className="py-2 fwb bg-purple">
            Send
          </Button>
        </form>
      </CardPassword>
    </ParticlesLayout>
  );
};

export default NewPassword;
