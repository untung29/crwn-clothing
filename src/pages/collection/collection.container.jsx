import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import CollectionPage from "./collection.component";
import WithSpinner from "../../component/with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionLoaded(state),
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;
