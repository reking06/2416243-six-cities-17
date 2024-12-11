import {RatingType} from './types/rating.ts';
import {MapIconsType} from './types/map.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer',
  OfferId = ':id',
  Favorites = '/favorites'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PlaceCardType {
  Main = 'MAIN',
  Favorites = 'FAVORITES',
  Near = 'NEAR'
}

export const starLength = 20;

export const ReviewCommentLengthLimit = {
  Min: 50,
  Max: 300
};

export const Rating: RatingType = {
  'perfect': 5,
  'good': 4,
  'not bad': 3,
  'badly': 2,
  'terribly': 1
};

export const MapIcon: MapIconsType = {
  Default: {
    iconUrl: 'img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  },
  Active: {
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39]
  },
};