import React, { useEffect, useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { createBrowserHistory } from "history";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// Global Style
import "./App.scss";
import "moment/locale/ne";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import PostalRates from "./pages/PostalRates/PostalRates";
import Activities from "./pages/Activities/Activities";
import Notice from "./pages/Notice/Notice";
import RightToInformation from "./pages/RightToInformation/RightToInformation";
import PressRelease from "./pages/PressRelease/PressRelease";
import News from "./pages/News/News";
import Tender from "./pages/Tender/Tender";
import Circular from "./pages/Circular/Circular";
import ActRegulation from "./pages/ActRegulation/ActRegulation";
import PolicyProgram from "./pages/PolicyProgram/PolicyProgram";
import AboutUs from "./pages/AboutUs/AboutUs";
import UnderneathOrg from "./pages/UnderneathOrg/UnderneathOrg";
import StaffDetails from "./pages/StaffDetails/StaffDetails";
import CitizenCharter from "./pages/CitizenCharter/CitizenCharter";
import EachService from "./pages/Services/EachService";
import AllServices from "./pages/Services/AllServices";
import Publication from "./pages/Publication/Publication";
import Gallery from "./pages/Gallery/Gallery";
import ScrollToTop from "./utils/ScrollToTop";
import keys from "./keys";
import messages from "./i18n/index";
import AdminRedirection from "./components/AdminRedirection/AdminRedirection";
import EachNews from "./pages/News/EachNews";
import EachCircular from "./pages/Circular/EachCircular";
import EachTender from "./pages/Tender/EachTender";

import "./lib/nepconverter";
import SearchPage from "./pages/SearchPage/SearchPage";
import ErrorBoundary from "./components/Error/ErrorBoundary";

// Appollo client helps to
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

const history = createBrowserHistory();
const App = () => {
  const [engLang, setEngLang] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
  useEffect(() => {
    toggleEye
      ? (document.getElementById("body-baby").className = "eye-theme")
      : (document.getElementById("body-baby").className = "");
  }, [toggleEye]);

  return (
    <ApolloProvider client={client}>
      <IntlProvider
        locale={engLang ? "en" : "ne"}
        messages={messages[engLang ? "en" : "ne"]}
      >
        <ErrorBoundary
          history={history}
          setEngLangUI={setEngLang}
          engLangUI={engLang}
          toggleEye={toggleEye}
          setToggleEye={setToggleEye}
        >
          <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
            <Header
              history={history}
              setEngLangUI={setEngLang}
              engLangUI={engLang}
              toggleEye={toggleEye}
              setToggleEye={setToggleEye}
            />
            <ScrollToTop>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={(props) => <Home engLang={engLang} {...props} />}
                />
                {/**  Basic Routes */}
                <Route
                  exact
                  path="/home"
                  component={(props) => <Home engLang={engLang} {...props} />}
                />
                <Route
                  exact
                  path="/department/aboutus"
                  component={() => <AboutUs engLang={engLang} />}
                />
                <Route
                  exact
                  path="/department/underneath-org"
                  component={() => <UnderneathOrg engLang={engLang} />}
                />
                <Route
                  exact
                  path="/department/staffs"
                  component={StaffDetails}
                />
                <Route
                  exact
                  path="/department/citizen-charter"
                  component={() => <CitizenCharter engLang={engLang} />}
                />
                <Route
                  exact
                  path="/act-regulations"
                  component={() => <ActRegulation engLang={engLang} />}
                />
                <Route
                  exact
                  path="/policy-program"
                  component={() => <PolicyProgram engLang={engLang} />}
                />
                <Route
                  exact
                  path="/media/notice"
                  component={(props) => <Notice {...props} engLang={engLang} />}
                />
                <Route
                  exact
                  path="/media/right-to-information"
                  component={(props) => (
                    <RightToInformation {...props} engLang={engLang} />
                  )}
                />
                <Route
                  exact
                  path="/media/press-release"
                  component={PressRelease}
                />
                <Route
                  exact
                  path="/media/news"
                  component={(props) => <News engLang={engLang} {...props} />}
                />
                <Route
                  exact
                  path="/media/tender"
                  component={(props) => <Tender {...props} engLang={engLang} />}
                />
                <Route
                  exact
                  path="/media/circular"
                  component={(props) => (
                    <Circular {...props} engLang={engLang} />
                  )}
                />
                <Route
                  exact
                  path="/activities"
                  component={(props) => (
                    <Activities engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/postal-rates"
                  component={(props) => (
                    <PostalRates engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/contact-us"
                  component={() => <ContactUs engLang={engLang} />}
                />
                {/**  Service Routes */}
                <Route
                  exact
                  path="/services/:slug"
                  component={(props) => (
                    <EachService engLang={engLang} {...props} />
                  )}
                />

                <Route
                  exact
                  path="/services"
                  component={(props) => (
                    <AllServices engLang={engLang} {...props} />
                  )}
                />

                <Route exact path="/gallery" component={Gallery} />

                <Route exact path="/publications" component={Publication} />
                <Route
                  exact
                  path={`/${keys.adminPanel}`}
                  component={AdminRedirection}
                />

                <Route
                  exact
                  path="/media/news/:slug"
                  component={(props) => (
                    <EachNews engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/media/circular/:slug"
                  component={(props) => (
                    <EachCircular engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/media/tender/:slug"
                  component={(props) => (
                    <EachTender engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/search/:search"
                  component={(props) => (
                    <SearchPage engLang={engLang} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/error"
                  component={(props) => (
                    <ErrorBoundary
                      history={history}
                      setEngLangUI={setEngLang}
                      engLangUI={engLang}
                      toggleEye={toggleEye}
                      setToggleEye={setToggleEye}
                      {...props}
                    />
                  )}
                />

                <Route
                  path="*"
                  component={(props) => <Home engLang={engLang} {...props} />}
                />
              </Switch>
            </ScrollToTop>
            <Footer engLang={engLang} />
          </Router>
        </ErrorBoundary>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default App;
