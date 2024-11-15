import React, { useEffect } from "react";
import CollectionPageContainer from "../collection/collection.container";
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import WithSpinner from "../../component/with-spinner/with-spinner.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../component/colletions-overview/collections-overview.container.jsx";

const ShopPage = (props) => {
  const unsubscribeFromSnapshot = null;
  const location = useLocation();

  useEffect(() => {
    const { fetchCollectionsStart } = props;
    fetchCollectionsStart();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${location.pathname}`}
        element={<CollectionsOverviewContainer />}
      />
      <Route
        path={`${location.pathname}/:collectionId`}
        // render={props => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
        element={<CollectionPageContainer />}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  };
};

// const mapStateToProps = createStructuredSelector({
//   isCollectionLoaded: selectIsCollectionLoaded,
// });

export default connect(null, mapDispatchToProps)(ShopPage);
