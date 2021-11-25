import React from "react";
import CollectionPageContainer from "../collection/collection.container";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import WithSpinner from "../../component/with-spinner/with-spinner.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../component/colletions-overview/collections-overview.container.jsx";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route
          path={`${match.path}/:collectionId`}
          // render={props => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  };
};

// const mapStateToProps = createStructuredSelector({
//   isCollectionLoaded: selectIsCollectionLoaded,
// });

export default connect(null, mapDispatchToProps)(ShopPage);
