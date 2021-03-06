import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
//import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
//import themeDark from "assets/theme-dark";
//import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
//import rtlPlugin from "stylis-plugin-rtl";
//import { CacheProvider } from "@emotion/react";
//import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "./routes/patientRoutes";
import authRoutes from "./routes/authRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import adminRoutes from "./routes/adminRoutes";
import homeRoutes from "./routes/homeRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import useLogin from "./logic/useLogin";

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        direction,
        layout,
        //openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        //darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();
    const {isLoggedIn} = useLogin();


    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };


    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    const printableRoutes = () =>
    {
        const curPath = window.location.pathname.split('/')[1];
        if (curPath === "patient") return routes;
        if (curPath === "doctor") return doctorRoutes;
        if (curPath === "admin") return adminRoutes;
        if (curPath === "home") return homeRoutes;
        return [];
    }

    const mainRoute = () =>
    {
        if (isLoggedIn("/admin") !== null) return "/admin/doctorList";
        if (isLoggedIn("/doctor") !== null) return "/doctor";
        if (isLoggedIn("/patient") !== null) return "/patient";
        return "/login";
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={(transparentSidenav) || whiteSidenav ? brandDark : brandWhite}
                        brandName="MiNI szczepienia"
                        routes={printableRoutes()}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
                {isLoggedIn("/admin") ? getRoutes(adminRoutes) : []}
                {isLoggedIn("/doctor") ? getRoutes(doctorRoutes) : []}
                {isLoggedIn("/patient") ? getRoutes(routes) : []}
                {getRoutes(authRoutes)}
                {getRoutes(homeRoutes)}
                {<Route path="*" element={<Navigate to={mainRoute()} />} />}
            </Routes>
        </ThemeProvider>
    );
}