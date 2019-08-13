import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import auth from './auth';
import overview from './overview';
import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import customers from './customers';

const reducer = combineReducers ({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  auth,
  overview,
  customers,
});

export default reducer;
