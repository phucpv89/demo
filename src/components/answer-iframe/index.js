import Loadable from 'react-loadable';
import Loading from '../loading';

export default Loadable({
  loader: () => import('./answer-iframe'),
  loading: Loading,
});