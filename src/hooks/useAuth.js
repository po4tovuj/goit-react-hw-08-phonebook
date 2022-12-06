import { useSelector } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing, getUser } from 'redux/auth/selectors';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(getIsLoggedIn),
    isRefreshing: useSelector(getIsRefreshing),
    user: useSelector(getUser),
  };
};
