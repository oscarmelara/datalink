import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MdAdd, MdRemove } from "react-icons/md";
import autotask from "../../assets/images/autotask-white.png";
import info from "../../assets/images/info.png";
import pdf from "../../assets/images/icons/pdf.png";

import { setCurrentUser } from "../../actions";
import {
  simpleAlert,
  useInputChange,
  loaderAlert,
  getUserId,
} from "../../utils";
import { InfusionsoftCard, PrimaryCard } from "../../styles/style";
import { IcurrentUser } from "../../TS";
import { CircleIcon } from "./style";
import "../../styles/Connections.sass";
import ReactTooltip from "react-tooltip";

// export type Props = {
//   showConnectWiseTour: boolean
// }
export const Datto = () => {
  const dispatch = useDispatch();
  const [datos, handleInputChangeDatto] = useInputChange({
    apiUsername: "",
    apiPassword: "",
  });
  const [showConnectWise, setShowConnectWise] = useState(false);
  const history = useHistory();

  const toggleConnectWise = (): void => {
    setShowConnectWise(!showConnectWise);
  };
  const handleDatto = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    loaderAlert({ html: "wait a moment please..." });
    axios
      .post("autotasks", datos)
      .then(() => {
        return axios.get(`companies/${getUserId()}`);
      })
      .then((response) => {
        const data: IcurrentUser = response.data;
        dispatch(setCurrentUser(data));
        Swal.close();
        simpleAlert({
          title: "Connection completed!",
          icon: "success",
          html:
            "The connection was successful, you can add more connections on the dashboard.",
        }).then(() => history.push("/dashboard"));
      })
      .catch((error) => {
        Swal.close();
        simpleAlert({
          icon: "error",
          html: error.response.data.error.message,
        });
      });
  };

  return (
    <PrimaryCard className="p-2 mx-auto mb-4 mt-4">
      <InfusionsoftCard className="bg-datto m-auto">
        <img src={autotask} alt="ConnectWise" />
      </InfusionsoftCard>
      <div className="selection-expand">
        <p>
          Integrate your workflows with the industry leading PSA for IT industry
          professionals
        </p>
        <CircleIcon className="connect" onClick={toggleConnectWise}>
          {/* {showConnectWise || showConnectWiseTour ? <MdRemove size={16} /> : <MdAdd size={16} />} */}
          {showConnectWise ? <MdRemove size={16} /> : <MdAdd size={16} />}
        </CircleIcon>
      </div>
      {/* <form
      onSubmit={handleDatto}
      style={{ height: showConnectWise || showConnectWiseTour ? '300px' : '0px' }}
      className="px-3 transition overflow-hidden">
      <input type="text" onChange={handleInputChangeDatto} value={input.company} name="company" className="input one" placeholder="Company name" />
      <input type="text" onChange={handleInputChangeDatto} value={input.url} name="url" className="input two" placeholder="Connectwise url" />
      <input type="text" onChange={handleInputChangeDatto} value={input.publicKey} name="publicKey" className="input three" placeholder="Public key" />
      <input type="text" onChange={handleInputChangeDatto} value={input.privateKey} name="privateKey" className="input four" placeholder="Private key" />
      <Button
        type="submit"
        className="fwb dl-button"
        style={{ width: '100%' }}>
        Connect
      </Button>
    </form> */}

      <form
        onSubmit={handleDatto}
        style={{ height: showConnectWise ? "200px" : "0px" }}
        className="px-3 transition overflow-hidden"
      >
        <div className="input-container mb-3 d-flex align-items-center">
          <input
            type="text"
            onChange={handleInputChangeDatto}
            value={datos.apiUsername}
            name="apiUsername"
            className="input one"
            placeholder="Username"
          />
          <a
            className=" info-tooltip d-flex justify-content-center align-items-center"
            data-tip
            data-for="user"
          >
            <img className=" w-50" src={info} alt="" />{" "}
          </a>
          <ReactTooltip id="user" place="right" type="dark" effect="float" delayHide={100} className="tooltip-pdf">
            <div className=" p-1" style={{ maxWidth: "20rem" }}>
              <h5 className="tc-lgreen" style={{ fontWeight: "bold" }}>
                Username
              </h5>
              <p>
                This is the username of your API user, go to admin -> Resources
                (Users) and create a new API user to get this
              </p>
              <a
                href="https://storage.googleapis.com/dl-usr-data/DataLink_AutoTask_Setup.pdf"
                target="_blank"
                className="mx-auto block"
                style={{ display: "block" }}
              >
                <img className="block mr-1" src={pdf} alt="" /> Autotask Guide
              </a>
            </div>
          </ReactTooltip>
        </div>
        <div className="input-container mb-3 d-flex align-items-center">
          <input
            type="password"
            onChange={handleInputChangeDatto}
            value={datos.apiPassword}
            name="apiPassword"
            className="input two"
            placeholder="Password"
          />
          <a
            className=" info-tooltip d-flex justify-content-center align-items-center"
            data-tip
            data-for="passwd"
          >
            <img className=" w-50" src={info} alt="" />{" "}
          </a>
          <ReactTooltip id="passwd" place="right" type="dark" effect="float">
            <div className=" p-1" style={{ maxWidth: "20rem" }}>
              <h5 className="tc-lgreen" style={{ fontWeight: "bold" }}>
                Password
              </h5>
              <p>
                This is the API user's password, you will be prompted to create
                this when you are done creating the new API users
              </p>
            </div>
          </ReactTooltip>
        </div>
        <Button
          type="submit"
          className="fwb dl-button"
          style={{ width: "100%" }}
        >
          Connect
        </Button>
      </form>
    </PrimaryCard>
  );
};
