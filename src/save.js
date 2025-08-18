import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
  const { eventName, startDateTime, endDateTime, dateFormat, location, description, offers } = attributes;
  const blockProps = useBlockProps.save();

  if (!startDateTime) return null;

  const jsStartDate = new Date(startDateTime);
  const formattedStartDate = dateI18n(dateFormat, jsStartDate);
  const isoStartDate = jsStartDate.toISOString();

  let isoEndDate = null;
  if (endDateTime) {
    const jsEndDate = new Date(endDateTime);
    isoEndDate = jsEndDate.toISOString();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName || undefined,
    startDate: isoStartDate,
    endDate: isoEndDate || undefined,
    location: location ? 
      {
        "@type": "Place",
        name: location,
      }
      : undefined,
    description: description || undefined,
    offers: offers.map(url => ({
        "@type": "Offer",
        url,
        availability: "https://schema.org/InStock", // TODO: Review
      }))
  };
  Object.keys(schemaData).forEach(
    (k) => schemaData[k] === undefined && delete schemaData[k]
  );

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
    <div {...blockProps} itemScope itemType="https://schema.org/Event">
      {eventName && (
        <span itemProp="name">{eventName}</span>
      )}
      {' '}
      <time itemProp="startDate" dateTime={isoStartDate}>
        {formattedStartDate}
      </time>
      {isoEndDate && 
        <time itemProp="endDate" dateTime={isoEndDate}></time>
      }
      {location && (
        <div itemProp="location" itemScope itemType="https://schema.org/Place">
          <span itemProp="name">{location}</span>
        </div>
      )}
      {description && (
        <p itemProp="description">{description}</p>
      )}
      {offers.length > 0 && (
        <ul>
          {offers.map((url, i) => (
            <li key={i} itemScope itemType='https://schema.org/Offer'><a href={url} itemProp="url" target="_blank" rel="noopener noreferrer">{__('Comprar entradas', 'ao-events')}</a></li>
          ))}
        </ul>
      )}

      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </div>
  );
}
