import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, AccountCircle  } from '@mui/icons-material';
import { ListGroup } from "react-bootstrap";
import { logout } from "../redux/slices/userSlice";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    minWidth: 180,
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [keyword, setKeyword] = React.useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
   
      navigate(`/?keyword=${keyword}&page=1`);
    
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log("hi");
    handleMenuClose();
    navigate('/')
    window.location.reload(); // Reload the page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleShow}
          >
            <MenuIcon />
          </IconButton>


          <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true} style={{backgroundColor:"#252525",color:"white",width:250}}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{backgroundColor:"#252525"}}>
              <ListGroup data-bs-theme="dark" variant="flush">
                <ListGroup.Item style={{backgroundColor:"#252525"}}>
                  <Link to='/?keyword=Furniture&page=1'>Furnitures</Link>
                </ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:"#252525"}}>
                  <Link to='/?keyword=weapon&page=1'>Weapons</Link>
                </ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:"#252525"}}>
                  <Link to='/?keyword=weapon&page=1'>Weapons</Link>
                </ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:"#252525"}}>
                  <Link to='/?keyword=weapon&page=1'>Weapons</Link>
                </ListGroup.Item>
              </ListGroup>
              
            </Offcanvas.Body>
          </Offcanvas>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              CreativeAayam
            </Link>
          </Typography>
          <StyledBox component="form" onSubmit={submitHandler}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
            <SearchIcon  />
            </IconButton>
          </StyledBox>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              aria-label="show cart items"
              color="inherit"
              component={Link}
              to="/cart"
              style={{ color: "white" }}
            >
              <ShoppingCart />
            </IconButton>
          </div>
          {/* {console.log(userDetails)} */}
          {userDetails ? (
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
              >
                <StyledMenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </StyledMenuItem>

                <StyledMenuItem onClick={handleLogout}>
                  Logout
                </StyledMenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <IconButton
                aria-label="login"
                color="inherit"
                component={Link}
                to="/login"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
