import React, { useEffect, useState } from "react";
import moment from "moment";
import { get } from "lodash/fp";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Dropdown, Nav } from "react-bootstrap";
import {
  DashboardIcon,
  ProfileIcon,
  PaymentIcon,
  SupportIcon
} from "../CustomIcons";
import { UserInfo, NavContainer, Trial, End } from "./style";
import { IgeneralState } from "../../TS";
import { logout, getUserType, expireDate } from "../../utils";
import Logo from "../../assets/images/logo_datalink.svg";
import bkperson from "../../assets/images/bkperson.png";
import { intercom } from '../../utils/chatUser';

export const NavBar: React.FC = () => {
  const [trial, setTrial] = useState({ msg: "", n: 0 });
  const [time, setTime] = useState("");
  const { currentUser, updatingImage } = useSelector(
    ({ userControlReducer }: IgeneralState) => userControlReducer
  );

  const exit = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    logout();
  };

  const external = get("status.payment.processor", currentUser);

  useEffect(() => {
    let name = get('firstName', currentUser)
    let email = get('email', currentUser)
    let id = get('id', currentUser)
    let company = get('companyName', currentUser)
    intercom(name, email, id, company)
    setTrial(expireDate());
    if (!updatingImage) {
      setTime(moment().toISOString());
    }
  }, [updatingImage, currentUser]);

  return (
    <>
      <NavContainer className="bg-blue-dl">
        <Navbar expand="lg" fixed="top" className="shadow bg-blue-dl">
          <Navbar.Brand as={Link} to="/dashboard">
            <img src={Logo} alt="Datalink" className="ml-3" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="bg-primary"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-5" style={{ alignItems: "center" }}>
              <Dropdown className="mr-2 dashboard-options">
                <Dropdown.Toggle
                  variant="primary"
                  className="dropdown-dashboard"
                  id="dropdown-dashboard"
                />
                <Dropdown.Menu className="bg-blue white-dropdown px-3 pb-3">
                  <Dropdown.Item as={NavLink} to="/dashboard">
                    <DashboardIcon />
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/profile">
                    <ProfileIcon />
                    My Profile & Team
                  </Dropdown.Item>
                  {getUserType() === "company" || external !== 'external' && (
                    <Dropdown.Item
                      className="position-relative"
                      as={NavLink}
                      to="/payment"
                    >
                      <PaymentIcon />
                      Payment Plans{" "}
                      {get("status.trial", currentUser) === true && (
                        <Trial>trial</Trial>
                      )}
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item as={NavLink} to="/my-activity">
                    <SupportIcon />
                    My activity
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={exit}
                    className="logout"
                    as="a"
                    href="/logout"
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <UserInfo>
                <p
                  id={`navbar-image-${time || "init"}`}
                  className="photo profile-photo"
                  style={{
                    backgroundImage: `url('${get("image", currentUser) ||
                      bkperson}')`
                  }}
                />
                {currentUser && (
                  <p className="mb-0 ml-2 fz-12 info">
                    <span className="fwb fz-15">
                      {get("firstName", currentUser) || ""}{" "}
                      {get("lastName", currentUser) || ""}
                    </span>
                    {get("type", currentUser) === 'viewer' ? "Viewer" : "Admin"}
                  </p>
                )}
              </UserInfo>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </NavContainer>
      {/* {get("status.trial", currentUser) === true && trial.n <= 5 && (
        <End>{trial.msg}</End>
      )} */}
    </>
  );
};
