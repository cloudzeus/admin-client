import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, auth } from '../../redux/reducers/index';
import thunk  from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  auth : auth
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
        thunk
    )
)
  
  );

export default store;
