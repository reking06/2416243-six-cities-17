import {CitiesCard} from '../cities-card/cities-card.tsx';
import {CityType, OfferType} from '../../types/offer.ts';
import {PlaceCardType} from '../../const.ts';

interface CitiesPlacesListProps {
  offers: OfferType[];
  cardType: PlaceCardType;
  onOfferClick: ((id: string) => void);
  onOfferHover: (offerItem?: OfferType) => void;
  city: CityType;
}

export function CitiesPlacesList({
  offers,
  cardType,
  onOfferClick,
  onOfferHover,
  city
}: Readonly<CitiesPlacesListProps>) {

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city.name}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
                  Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content" onMouseLeave={() => onOfferHover()}>
        {offers.map((offer) => (
          <CitiesCard
            key={offer.id}
            offer={offer}
            cardType={cardType}
            onOfferClick={onOfferClick}
            onOfferHover={onOfferHover}
          />)
        )}
      </div>
    </section>
  );
}
