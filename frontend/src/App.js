import React, { Fragment, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, storeData } from "./utils/localstorage";
import API from './services/api';

import Login from "./views/login";
import Register from "./views/register";
import Landing from "./views/landing";
import Profile from "./views/profile";
import Profiles from "./views/profiles";
import Posts from "./views/posts";
import AddPost from "./views/create-post";
import MyPosts from "./views/myposts";
import Settings from "./views/settings";
import Sidebar from "./views/sidebar";

toast.configure();

function App() {
  const isAuth = () => getData("isAuthenticated") || null;
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);
  const [loading, setLoading] = useState(false);

  const checkAuthenticated = async () => {
    setLoading(true);

    try {
      const res = API.auth.verify();
      const parseRes = await res.json();
      parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);
      parseRes ? storeData("isAuthenticated", true) : storeData("isAuthenticated", false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-md-2 d-none d-md-block">
              <Sidebar
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
                loading={loading}
              />
            </div>
            <div className="col-md-10 col-sm-12">
              <div className="viewcontainer">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) =>
                      !isAuthenticated ? (
                        <Landing {...props} />
                      ) : (
                        <Redirect to="/profiles" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    render={(props) =>
                      !isAuthenticated ? (
                        <Login {...props} setAuth={setAuth} />
                      ) : (
                        <Redirect to="/profiles" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/register"
                    render={(props) =>
                      !isAuthenticated ? (
                        <Register {...props} />
                      ) : (
                        <Redirect to="/profiles" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/profiles"
                    render={(props) => <Profiles {...props} />}
                  />
                  <Route
                    exact
                    path="/posts"
                    render={(props) => <Posts {...props} />}
                  />
                  <Route
                    exact
                    path="/addpost"
                    render={(props) =>
                      isAuthenticated ? (
                        <AddPost {...props} setAuth={setAuth} />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/myposts"
                    render={(props) =>
                      isAuthenticated ? (
                        <MyPosts {...props} setAuth={setAuth} />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/profiles/:id"
                    render={(props) => <Profile {...props} />}
                  />
                  <Route
                    exact
                    path="/settings"
                    render={(props) =>
                      isAuthenticated ? (
                        <Settings {...props} setAuth={setAuth} />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
