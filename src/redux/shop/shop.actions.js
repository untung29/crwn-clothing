import ShopActionTypes from "./shop.types";

// export const updateCollections = collectionsMap => {
//   return { type: ShopActionTypes.UPDATE_COLLECTION, payload: collectionsMap };
// };

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
  return { type: ShopActionTypes.FETCH_COLLECTIONS_START };
};

export const fetchCollectionsSuccess = collectionsMap => {
  return { type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS, payload: collectionsMap };
};

export const fetchCollectionsFailure = errorMessage => {
  return { type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE, payload: errorMessage };
};

export const fetchCollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collection");
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
