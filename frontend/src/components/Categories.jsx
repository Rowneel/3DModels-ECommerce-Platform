import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBBadge,
} from "cdbreact";

import "../App.css";
import { NavLink } from "react-router-dom";

export default function Categories() {
  return (
    <div style={{ position: "sticky", top: 64, zIndex: "100" }}>
      <div className="sidebar">
        <CDBSidebar textColor="#f8f8f8" backgroundColor="#151515">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Navigation
          </CDBSidebarHeader>
          <CDBSidebarContent textColor="#f8f8f8">
            <CDBSidebarMenu>
              <NavLink
                end={true}
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              
              <NavLink
                end={true}
                to='/?keyword=Furniture&page=1'
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <CDBSidebarMenuItem icon="list">
                  Furnitures
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                end={true}
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                
                <CDBSidebarMenuItem>
                  Manage Students
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: "20px 5px" }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
}
