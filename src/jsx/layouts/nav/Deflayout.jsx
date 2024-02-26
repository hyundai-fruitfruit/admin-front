/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 13:53:10
 * @modify date 2024-02-21 13:53:10
 * @desc 메뉴바 숨김
 */
import React, { Fragment, useState,useReducer } from "react";
import {Tab, Nav, Collapse} from 'react-bootstrap';
import {Link} from 'react-router-dom';

// import SideBar from "./SideBar";
import NavHeader2 from "./NavHeader2";
import Header from "./Header";
import ChatBox from "../ChatBox";

//Menus
import {MenuList2} from './Menus2'

//Images
import icon1 from './../../../images/browser/icon1.png';
import icon2 from './../../../images/browser/icon2.png';

import ShareProfitCanvas from './FixedData/ShareProfitCanvas';
import DailySalesCanvas from './FixedData/DailySalesCanvas';
//Icons
import { SVGICON } from "../../constant/theme";
import LogoutMini from "./LogoutMini";


const browserList = [
    {image: icon1, title:'Chrome', color:'warning', percent:'90%'},
    {image: icon2, title:'Firefox', color:'success', percent:'80%'},
    {image: icon1, title:'Chrome', color:'danger', percent:'70%'},
];

const sidebarMenu = [
    {mainicon: SVGICON.HomeIcon, menuKey:"Dashboard"},
    {mainicon: SVGICON.HomeIcon2, menuKey:"Dashboard1"},
    {mainicon: SVGICON.SettingIcon, menuKey:"Cms"},
    // {mainicon: SVGICON.AppsIcon, menuKey:"Apps"},
    // {mainicon: SVGICON.BootstrapIcon, menuKey:"Bootstrap"},
    // {mainicon: SVGICON.FormIcon, menuKey:"Form"},
    // {mainicon: SVGICON.TableIcon, menuKey:"Table"},
    // {mainicon: SVGICON.PageIcon, menuKey:"Page"},
    // {mainicon: SVGICON.ShoppingIocn, menuKey:"Shopping"},    
];


const initialState = false;
const reducer = (state, action) =>{
    switch (action.type){
        case 'collpase0':
            return { ...state, collpase0: !state.collpase0 }
        case 'collpase1':
            return { ...state, collpase1: !state.collpase1 }
        case 'collpase2':
            return { ...state, collpase2: !state.collpase2 }
        case 'collpase3':
            return { ...state, collpase3: !state.collpase3 }
        default:
            return state;
    }
}

const updateReducer = (previousState, updatedState) => ({
    ...previousState,
    ...updatedState,
  });

const menuInitial = {
    active : "",
    activeSubmenu : "",
}

const Deflayout = ({ title, onClick: ClickToAddEvent }) => {
    const [toggle, setToggle] = useState("");
    const onClick = (name) => setToggle(toggle === name ? "" : name);

    const [activeMenu, setActiveMenu] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState);

    const [menustate, setMenustate] = useReducer(updateReducer, menuInitial);
    const handleMenuActive = status => {		
        setMenustate({active : status});			
        if(menustate.active === status){				
            setMenustate({active : ""});
        }   
    }
    const handleSubmenuActive = (status) => {		
        setMenustate({activeSubmenu : status})
        if(menustate.activeSubmenu === status){
            setMenustate({activeSubmenu : ""})			
        }    
    }


    const [openSidebar, setOpenSidebar] = useState(false);
    const [closeSidebar, setCloseSidebar] = useState(0);
        function handleMenuOpen(ind){
            if(ind=== closeSidebar){
                setOpenSidebar(!openSidebar);
            }
        }

  return (
    <Fragment>
      <NavHeader2 openSidebar={openSidebar} />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Tab.Container defaultActiveKey={"Dashboard"}>
        <div className= {`fixed-content-box ${openSidebar ? "active" : ""}`}>
            <div className="head-name">
                Admin
                <span className="close-fixed-content fa-left d-lg-none"
                    onClick={()=>setOpenSidebar(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24"/>
                        <rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1"/><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/></g>
                    </svg>
                </span>
            </div>
            <div className="fixed-content-body dz-scroll" id="DZ_W_Fixed_Contant">                
                <Tab.Content>    
                    {
                        MenuList2[activeMenu].classStyle !=="blank" ?        
                            <div className="tab-pane show active">
                                <ul className="metismenu tab-nav-menu">		                               
                                    <>                                        
                                        {
                                            MenuList2[activeMenu].name === "doubleArray" ? 
                                            <>
                                                <li className="nav-label">{MenuList2[activeMenu].title}</li>
                                                {MenuList2[activeMenu].mainArray.map((item, ind)=>(
                                                    <li key={ind} className={`${item.title === menustate.active ? "mm-active" : ""}`}>
                                                        <Link to={"#"} className="has-arrow"
                                                            onClick={() => {handleMenuActive(item.title)}}
                                                        >
                                                            {item.iconStyle}                                                            
                                                            <span className="nav-text">{item.title}</span>                                                            
                                                        </Link>
                                                        <Collapse in={menustate.active === item.title ? true :false}>
                                                            <ul>
                                                                {item?.content?.map((data, ind)=>{
                                                                    if(data.metisMenu==="has-menu"){
                                                                        return(                                                                        
                                                                            <li key={ind}>
                                                                                <Link to={"#"} className="has-arrow"
                                                                                    onClick={() => { handleSubmenuActive(data.title)}}
                                                                                >{data.title}</Link>
                                                                                <Collapse  in={menustate.activeSubmenu === data.title ? true :false}>
                                                                                    <ul>
                                                                                        {data?.content?.map((data, ind)=>(
                                                                                            <li key={ind}><Link to={data.to}>{data.title}</Link></li>  
                                                                                        ))}
                                                                                    </ul>
                                                                                </Collapse>
                                                                            </li>
                                                                        )
                                                                    }else{
                                                                        return(                                                                           
                                                                            <li key={ind}><Link to={data.to}>{data.title}</Link></li>                                                                              
                                                                        )
                                                                    }
                                                                })}                                                                
                                                            </ul>
                                                        </Collapse>
                                                    </li>
                                                ))}
                                                
                                            </>
                                            :
                                            <>
                                                <li className="nav-label">{MenuList2[activeMenu].title}</li> 
                                                <li className={`${state.collpase1 ? "mm-active" : ""}`}>
                                                    <Link to={"#"} className="has-arrow" 
                                                        onClick={() => dispatch({type:'collpase1'})}
                                                    >   
                                                        {MenuList2[activeMenu]?.iconStyle}{" "}
                                                        <span className="nav-text">{MenuList2[activeMenu]?.title}</span>
                                                        {/* <span className="badge badge-xs badge-light">10</span> */}
                                                    </Link>
                                                    <Collapse in={state.collpase1}>
                                                        <ul>                                            
                                                            {MenuList2[activeMenu]?.content.map((data, ind)=>(                                                               
                                                                <li key={ind}>
                                                                    <Link to={data?.to}>{data?.title}</Link>                                                            
                                                                    <ul>
                                                                        {data?.content?.map((item,i) => (
                                                                            <li key={i}><Link to={item.to}>{item.title}</Link></li>
                                                                        ))}                                                                
                                                                    </ul>
                                                                </li> 
                                                            ))}
                                                        </ul>   
                                                    </Collapse>                                          
                                                </li>
                                            </>                                                                            
                                        }
                                    </>    
                                </ul>
                            </div>    
                            :
                            ""
                    }
                </Tab.Content>
                
            </div>
        </div>
        <Header
            onNote={() => onClick("chatbox")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
            onBox={() => onClick("box")}
            onClick={() => ClickToAddEvent()}
        />
        {/* <SideBar /> */}
            <div className="deznav">
                <div className="deznav-scroll">
                    <Nav as="ul" className="nav menu-tabs"  >
                        {sidebarMenu.map((item, index)=>(
                            <Nav.Item as="li" key={index}                                
                                onClick={()=>{
                                    setOpenSidebar(true)
                                    handleMenuOpen(index)
                                    setCloseSidebar(index)
                                }}
                                
                            >
                                <Nav.Link className="ai-icon" eventKey={item.menuKey}
                                    onClick={()=>{
                                        setActiveMenu(index)                                                                            
                                    }}
                                >
                                    {item.mainicon}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
                <LogoutMini />
            </div>
        </Tab.Container>
    </Fragment>
  );
};

export default Deflayout;
