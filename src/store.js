import { createStore } from 'redux'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
// import { createTransform } from 'redux-persist';
import combineReducers from './reducers'
import storage from 'redux-persist/lib/storage'
import { compose } from 'redux'
import Flatted from 'flatted'


const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
)

const persistConfig = {
  key: 'root',
  storage: storage,
  transforms: [transformCircular]
};
const persistedReducer = persistReducer(persistConfig, combineReducers);



const store = createStore(persistedReducer, composeEnhancers())

const persistor = persistStore(store);

export { store, persistor };

