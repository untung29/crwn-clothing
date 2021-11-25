// takeEvery -> Listens to the action types, doesn't pause the sagas if we have multiple
import { takeEvery, call, put } from "redux-saga/effects";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
  yield console.log("I am fired!");

  try {
    const collectionRef = firestore.collection("collection");

    // collectionRef
    //   .get()
    //   .then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    //   })
    //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));

    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync);
}
