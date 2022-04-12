import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import user1 from "../assets/images/users/user4.jpg";
import "../css/local.css"
import { logout, SHOW_LOGIN_MENU } from "../actions/usersActions";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };




  const logOut = () => {
    // dispatch(logout());
    localStorage.clear()
    navigate("/");
    window.location.reload();
  }

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      {/* <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="ps-2 d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div> */}

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => navigate("/editprofile")}>Edit Profile</DropdownItem>
            <DropdownItem onClick={() => logOut()}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
