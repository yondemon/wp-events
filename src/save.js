import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
  const { eventName, startDateTime, endDateTime, dateFormat, location, description } = attributes;
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

  /*
  <div itemprop="event" itemscope itemtype="https://schema.org/Event">
      <a href="foo-fighters-may20-fedexforum" itemprop="url"><span itemprop="name">FedExForum</span></a> <span itemprop="location">Memphis, TN, US</span>
      <meta itemprop="startDate" content="2011-05-20">May 20 <a href="ticketmaster.com/foofighters/may20-2011" itemprop="offers">Buy tickets</a>
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
    </div>
  );
}
