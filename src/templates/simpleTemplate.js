import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

export default function SimpleTemplate({ attributes, baseClass }) {
  const { 
    eventName, description,
    organizer, performer, 
    startDateTime, endDateTime, dateFormat,
    venue, address, city,
    offers = [],
    price, priceCurrency,
    showEventName, showAddress, showDescription, showOrganizer, showPerformer
  } = attributes;

  const formattedStartDate = dateI18n(dateFormat, startDateTime);

  return (
    <div>
      {showEventName && eventName &&  (
        <span className={`${baseClass}__name`}>{eventName}</span>
      )}
      {' '}
      <time className={`${baseClass}__date`} dateTime={startDateTime}>
        {formattedStartDate}
      </time>
      {endDateTime && 
        <time dateTime={endDateTime}></time>
      }
      {(venue || city || (showAddress && address)) && (
        <div className={`${baseClass}__location`}>
          {venue && <span className={`${baseClass}__venue`}>{venue}</span>}
          {(city || (showAddress && address)) && (
            <> (
              {(showAddress && address) && (
                <span className={`${baseClass}__address`}>{address}, </span>
              )}
              {city && <span className={`${baseClass}__city`}>{city}</span>}
            )</>
          )}
        </div>
      )}
      
      {showDescription && description &&  (
        <p className={`${baseClass}__description`}>{description}</p>
      )}
      {showOrganizer && organizer && (
        <div className={`${baseClass}__organizer`}>{organizer}</div>
      )}
      {showPerformer && performer && (
        <div className={`${baseClass}__performer`}>{performer}</div>
      )}

      {price && (
        <div className={`${baseClass}__price`}>
          {price} {priceCurrency}
        </div>
      )}

      {offers.length > 0 && (
        <ul className={`${baseClass}__offers`}>
          {offers.map((url, i) => (
            <li key={i}><a href={url} target="_blank" rel="noopener noreferrer">{__('Comprar entradas', 'ao-events')}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}
