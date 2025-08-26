import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import SimpleTemplate from './templates/simpleTemplate';
import { BLOCK_NAMESPACE } from './constants';

export default function save({ attributes }) {
  const { 
    eventName, description,
    organizer, performer,
    startDateTime, endDateTime, 
    venue, address, city,
    offers = [],
    price, priceCurrency,
    eventStatus
   } = attributes;
  const blockProps = useBlockProps.save();

  if (!startDateTime) return null;

  /* @TODO
  - "image" (opt)
  - Organizer
  -- "url" (opt)
  - Offers
  -- validFrom - improve
  */

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName || undefined,
    eventStatus: eventStatus ? `https://schema.org/${eventStatus}` : "https://schema.org/EventScheduled",
    startDate: startDateTime,
    endDate: endDateTime || (startDateTime)? addHours(startDateTime, 3) : undefined,
    location: location ? 
      {
        "@type": "Place",
        name: venue || "",
        address: {
          "@type": "PostalAddress",
          streetAddress: address || "",
          addressLocality: city || ""
        }
      }
      : undefined,
    description: description || undefined,
    organizer: organizer
      ? { "@type": "Organization", "name": organizer }
      : undefined,
    performer: performer
      ? { "@type": "PerformingGroup", "name": performer } // @TODO: Person o PerformingGroup
      : undefined,
    offers: offers.map(url => ({
        "@type": "Offer",
        url,
        availability: "https://schema.org/InStock", // @TODO: Review
        price: price || undefined,
        priceCurrency: priceCurrency || undefined,
        validFrom: startDateTime ? getValidFrom(startDateTime) : undefined
      }))
  };
  Object.keys(schemaData).forEach(
    (k) => schemaData[k] === undefined && delete schemaData[k]
  );

  return (
    <div {...blockProps}>
      <SimpleTemplate attributes={attributes} baseClass={BLOCK_NAMESPACE}/>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </div>
  );
}

const addHours = (isoString, hours) => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return undefined;

    date.setHours(date.getHours() + hours);

    return date.toISOString();
  } catch (e) {
    return undefined;
  }
};

const getValidFrom = (startDate) => {
  if (!startDate) return null;

  const eventDate = new Date(startDate);
  let validFrom = new Date(eventDate);
  validFrom.setMonth(validFrom.getMonth() - 2);

  return validFrom.toISOString();
};
