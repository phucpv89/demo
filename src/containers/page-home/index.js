import Loadable from 'react-loadable';

import Loading from '../../components/loading';

/**
 * Case not show loading
 */
const preload = () => import('./page-home');

/**
 * Case show loading
 */
// const preload = () =>
//   new Promise((resolve) => {
//     Promise.all([
//       // list promise here, can be loading images
//     ])
//       .then(() => {
//         resolve(import('./index'));
//       })
//       .catch(() => {
//         resolve(import('../../Error'));
//       });
//   });

export default Loadable({
  loader: preload,
  loading: Loading
});
