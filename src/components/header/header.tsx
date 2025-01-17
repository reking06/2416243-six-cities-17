import {Link} from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {logoutAction} from '../../store/user-api-actions.ts';

interface HeaderProps {
  isNavHidden?: boolean;
}

export function Header({isNavHidden = false}: Readonly<HeaderProps>) {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;
  const userData = useAppSelector((state) => state.user);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {!isNavHidden &&
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                isAuthorized
                  ? (
                    <>
                      <li className="header__nav-item user">
                        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{userData?.email}</span>
                          <span className="header__favorite-count">{favoriteOffers.length}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={'#'}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(logoutAction());
                          }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>) : (
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Login}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )
              }
            </ul>
          </nav>}
        </div>
      </div>
    </header>
  );
}
