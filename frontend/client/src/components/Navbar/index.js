import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

import mainLogo from '../../images/logo.png';


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
  // Upto here

  return (
    <nav className="h-[20vh] sticky top-0 shadow-md z-99990">
      <Layout className="">
        <Layout.Header className="h-30 bg-white pr-4 pl-5 flex">
          <div className="p-5">
            <a href="/" className="">
              <img src={mainLogo} className="h-20" alt="Logo" />
            </a>          
            </div>
          
          <div className="float-left w-[calc(100%-200px)] ">
            
            {/* <div className="float-left">
              <LeftMenu mode={"horizontal"} />
            </div> */}
            
            
            <Button className="float-right 
                              h-[32px] p-[6px]
                              mt-[14px] mr-[10px]" 
                              type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            
            <div className="float-right">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;