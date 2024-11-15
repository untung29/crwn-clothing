import React from "react";
import "./App.css";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";

// Components
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./component/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CollectionsOverviewComponent from "./component/colletions-overview/collections-overview.component.jsx";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // Reducer Action
    const { setCurrentUser, collectionsArray } = this.props;

    // This will listen to any changes to sign in and sign out to the user.
    // If the is signed in, it will create a profile for the user set it into the state.
    // However, if the user is signout, userAuth -> null.

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // It will listen to any changes that will happen to the users.
        // get() -> Like take and forget
        // onSnapShot -> Listen to any changes that might happen
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />}>
            <Route
              exact
              path={`/`}
              element={<CollectionsOverviewComponent />}
            />
          </Route>
          <Route
            exact
            path="/signin"
            element={() => {
              return this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignUpPage />
              );
            }}
          ></Route>
          <Route exact path="/checkout" element={<CheckoutPage />}></Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
