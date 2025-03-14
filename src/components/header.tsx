"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { formGroupClasses } from "@mui/material";

const pages = ["hotels", "aboutus", "contacts"];
const settings = ["", ""];
const langs = ["en", "ru", "kg", "kz"];
function ResponsiveAppBar() {
  const { t } = useTranslation();
  const lang = Cookies.get("i18next");
  const [, setLang] = React.useState(lang);
  const id = localStorage.getItem("id");
  function changeLnaguage(languageCode: string) {
    setLang(languageCode);
    Cookies.set("i18next", languageCode);
    setAnchorElLang(null);
    window.location.reload();
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar disableGutters className="container">
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: "medium",
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Link href={"/"} replace={false}>
            LOGO
          </Link>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              textTransform: "lowercase",
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ textTransform: "lowercase" }}
              >
                <Link
                  style={{
                    fontSize: "16px",
                    fontWeight: "medium",
                    textTransform: "capitalize",
                    textDecoration: "none",
                    color: "#262729",
                  }}
                  replace={false}
                  href={`/${page}`}
                >
                  {t(page)}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Link href={"/"} replace={false}>
            LOGO
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Link
              key={page}
              replace={false}
              onClick={handleCloseNavMenu}
              style={{
                marginLeft: 2,
                marginRight: 2,
                color: "black",
                display: "block",
                fontSize: "16px",
                fontWeight: "medium",
              }}
              href={`/${page}`}
            >
              {t(page)}
            </Link>
          ))}
        </Box>
        <Box sx={{ marginRight: "20px" }}>
          <Tooltip title="open Lang menu">
            <IconButton
              className="py-0.5 px-1.5 uppercase"
              onClick={handleOpenLangMenu}
            >
              {lang}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElang}
            open={Boolean(anchorElang)}
            onClose={handleCloseLangMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            id="menu-appbar"
          >
            {langs.map((lang) => (
              <MenuItem key={lang} onClick={() => changeLnaguage(lang)}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "medium",
                    textTransform: "uppercase",
                  }}
                >
                  {lang}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 0, gap: "20px", display: "flex" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <div className="flex flex-col gap-2 px-3">
              {id ? (
                <>
                  <Link
                    href={`/profile:id`}
                    replace={false}
                    style={{ fontSize: "16px", fontWeight: "medium" }}
                    onClick={handleCloseUserMenu}
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    href={`/account:1`}
                    replace={false}
                    style={{ fontSize: "16px", fontWeight: "medium" }}
                    onClick={handleCloseUserMenu}
                  >
                    {t("account")}
                  </Link>{" "}
                  <Link
                    href={"/dashboard"}
                    replace={false}
                    style={{ fontSize: "16px", fontWeight: "medium" }}
                    onClick={handleCloseUserMenu}
                  >
                    {t("dashboard")}
                  </Link>
                  <Button
                    style={{ fontSize: "16px", fontWeight: "medium" }}
                  >
                    {t("logout")}
                  </Button>{" "}
                </>
              ) : (
                <Button style={{ fontSize: "16px", fontWeight: "medium" }}>
                  {t("login")}
                </Button>
              )}
            </div>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
