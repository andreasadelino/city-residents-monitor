// prettier-ignore
import residence, {
  ResidenceState
} from 'app/entities/residence/residence.reducer';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { combineReducers } from 'redux';


/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly residence: ResidenceState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  residence,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
