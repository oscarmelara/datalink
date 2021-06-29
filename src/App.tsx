import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import CustomTour from "./pages/Example";
import MainLayout from "../src/pages/Layout/Main";
import Reset from "../src/pages/auth/ResetPassword";
import NewPass from "../src/pages/auth/CompleteResetPassword";
import { Connections } from "../src/pages/Connections";
import { Dashboard } from "../src/pages/Dashboard";
import { ProfileAndTeam } from "../src/pages/ProfileAndTeam";
import { Logs, MyActivity } from "../src/pages/Logs";
import { Plans, PaymentMethod } from "../src/pages/Payment";
import { Error404 } from "../src/pages/Errors";
import { PrivateRoute } from "./components/PrivateRoute";
import { setAxiosConfig } from "./utils";
import { NotFound } from "./pages/Dashboard/NotFound";
import FirstStep from "./pages/auth/FirstStep";
import { db } from './utils/Database'


const App: React.FC = () => {
  setAxiosConfig();
  var IDLE_TIMEOUT = 30 * 60 * 1000; //seconds
  var _idleSecondsCounter = 0;
  document.onclick = function () {
    _idleSecondsCounter = 0;
  };
  document.onmousemove = function () {
    _idleSecondsCounter = 0;
  };
  document.onkeypress = function () {
    _idleSecondsCounter = 0;
  };
  window.setInterval(CheckIdleTime, 1000);

  function CheckIdleTime() {
    _idleSecondsCounter++;
    var oPanel = document.getElementById("SecondsUntilExpire");
    if (oPanel) oPanel.innerHTML = IDLE_TIMEOUT - _idleSecondsCounter + "";
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
      localStorage.clear()
      sessionStorage.clear()
      db.delete()
      window.location.href = '/'
    }
  }
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <Route exact path="/" component={FirstStep} />
            <Route exact path="/login/:email" component={Login} />
            <Route exact path="/reset-password" component={Reset} />
            <Route exact path="/new-password/:token" component={NewPass} />
            <Route exact path="/welcome/:token" component={NewPass} />

            <PrivateRoute
              exact
              path="/select-connections"
              component={Connections}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/not-found" component={NotFound} />
            <PrivateRoute exact path="/profile" component={ProfileAndTeam} />
            <PrivateRoute exact path="/support" component={Logs} />
            <PrivateRoute exact path="/my-activity" component={MyActivity}></PrivateRoute>
            <PrivateRoute exact path="/payment" component={Plans} />
            <PrivateRoute
              exact
              path="/payment-method"
              component={PaymentMethod}
            />

            <Route component={Error404} />
          </Switch>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
