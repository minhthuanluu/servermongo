import { combineReducers } from "redux";
import { signinReducer, signupReducer } from "./authReducer";
import { brandReducer } from "./brandReducer";
import { categoryReducer } from "./categoryReducer";
import { filterReducer } from "./filterReducer";
import { priceReducer } from "./priceReducer";
import {
  deleteProductReducer,
  productAdminReducer,
  updateProductReducer,
} from "./productAdminReducer";
import { addProductReducer, productReducer } from "./productReducer";

const rootReducer = combineReducers({
  signinReducer: signinReducer,
  categoryReducer: categoryReducer,
  brandReducer: brandReducer,
  productReducer: productReducer,
  priceReducer: priceReducer,
  filterReducer: filterReducer,
  // profileReducer: profileReducer,
  signupReducer: signupReducer,
  productAdminReducer: productAdminReducer,
  addProductReducer: addProductReducer,
  deleteProductReducer: deleteProductReducer,
  updateProductReducer: updateProductReducer,
});

export default rootReducer;
