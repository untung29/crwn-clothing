import React from "react";
import CollectionsOverview from "../../component/colletions-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils.js";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../component/with-spinner/with-spinner.component";

import { createStructuredSelector } from "reselect";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching, selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();

    // const collectionRef = firestore.collection("collection");
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ isLoading: false });
    // });
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  // return {
  //   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
  // };
  return {
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
  };
};
// const mapStateToProps = state => {
//   return { collections: state.shop.collections };
// };

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
