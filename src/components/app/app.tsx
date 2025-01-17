import {MainPage} from '../../pages/main-page/main-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {NotFoundPage} from '../../pages/not-found-page/not-found-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {OfferPage} from '../../pages/offer-page/offer-page.tsx';
import {OfferType} from '../../types/offer.ts';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';

export function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [currentOffer, setCurrentOffer] = useState({id: '0'});
  const [activeCard, setActiveCard] = useState<OfferType | undefined>(undefined);

  const offers = useAppSelector((state) => state.offers);

  const handleOfferClick = (offer: OfferType) => {
    setCurrentOffer({
      ...currentOffer,
      id: offer.id
    });
  };

  const handleOfferHover = (offerItem?: OfferType) => {
    const currentPoint = offers.find((offer) =>
      offer.id === offerItem?.id
    );
    setActiveCard(currentPoint);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              onOfferClick={handleOfferClick}
              onOfferHover={handleOfferHover}
              activeCard={activeCard}
            />
          }
        />

        <Route
          path={AppRoute.Offer}
        >
          <Route
            path={AppRoute.OfferId}
            element={
              <OfferPage
                onOfferClick={handleOfferClick}
                onOfferHover={handleOfferHover}
                activeCard={activeCard}
              />
            }
          />
        </Route>

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              divertToElement={AppRoute.Login}
            >
              <FavoritesPage
                onOfferClick={handleOfferClick}
                onOfferHover={handleOfferHover}
              />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              divertToElement={AppRoute.Main}
            >
              <LoginPage/>
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
