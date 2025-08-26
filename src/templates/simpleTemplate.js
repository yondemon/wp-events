import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

export default function SimpleTemplate({ attributes, baseClass }) {
  const { 
    eventName, description, location, 
    offers = [],
    startDateTime, endDateTime, dateFormat,
    showEventName, showDescription 
  } = attributes;

  const formattedStartDate = dateI18n(dateFormat, startDateTime);

  /*
  <div itemprop="event" itemscope itemtype="https://schema.org/Event">
      <a href="foo-fighters-may20-fedexforum" itemprop="url">
      <span itemprop="name">FedExForum</span></a> 
      <span itemprop="location">Memphis, TN, US</span>
      <meta itemprop="startDate" content="2011-05-20">May 20 
      <a href="ticketmaster.com/foofighters/may20-2011" itemprop="offers">Buy tickets</a>
  </div>
  */
  return (
    <div itemScope itemType="https://schema.org/Event">
      {showEventName && eventName &&  (
        <span className={`${baseClass}__name`} itemProp="name">{eventName}</span>
      )}
      {' '}
      <time className={`${baseClass}__date`} itemProp="startDate" dateTime={startDateTime}>
        {formattedStartDate}
      </time>
      {endDateTime && 
        <time itemProp="endDate" dateTime={endDateTime}></time>
      }
      {location && (
        <span className={`${baseClass}__location`} itemProp="location" itemScope itemType="https://schema.org/Place">
          <span itemProp="name">{location}</span>
        </span>
      )}
      {showDescription && description &&  (
        <p className={`${baseClass}__description`} itemProp="description">{description}</p>
      )}
      {offers.length > 0 && (
        <ul className={`${baseClass}__offers`}>
          {offers.map((url, i) => (
            <li key={i} itemScope itemType='https://schema.org/Offer'><a href={url} itemProp="url" target="_blank" rel="noopener noreferrer">{__('Comprar entradas', 'ao-events')}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}
