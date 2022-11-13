import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useCookies } from "react-cookie";

const LazyAuth = lazy(() =>
  import("./components/AuthApp").then((module) => ({
    default: module.AuthApp,
  }))
);

// const LazyPatient = lazy(() =>
//   import("./components/PatientApp").then((module) => ({
//     default: module.PatientApp,
//   }))
// );

// const LazyProvider = lazy(() =>
//   import("./components/ProviderApp").then((module) => ({
//     default: module.ProviderApp,
//   }))
// );

// const LazyAdmin = lazy(() =>
//   import("./components/AdminApp").then((module) => ({
//     default: module.AdminApp,
//   }))
// );

const history = createBrowserHistory();

export const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  // const ComponentSwitch = (type) => {
  //   switch (type) {
  //     case "admin":
  //       return <LazyAdmin user={user} />;

  //     case "provider":
  //       return <LazyProvider user={user} />;

  //     default:
  //       return <LazyPatient user={user} />;
  //   }
  // };

  return (
    <Router history={history}>
      <div>
        <Header user={user} signOut={() => setUser(null)} />
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route path={"/auth"}>
              {user && <Redirect to={"/"} />}
              {/* <LazyPatient
                user={{
                  id: "adsfasdlfkjasdf",
                  email: "apple@hotmail.com",
                  role: "patient",
                }}
              /> */}
              <LazyAuth signOut={signOut} />
            </Route>
            <Route path={"/"}>
              {!user && <Redirect to={"/auth"} />}
              {/* {user && ComponentSwitch(user.type)} */}
              <div></div>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};
