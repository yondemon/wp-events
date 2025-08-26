import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import SimpleTemplate from './templates/simpleTemplate';
import { BLOCK_NAMESPACE } from './constants';

export default function save({ attributes }) {
  const { 
    eventName, description,
    startDateTime, endDateTime, 
    venue, address, city,
    offers = [],
    eventStatus
   } = attributes;
  const blockProps = useBlockProps.save();

  if (!startDateTime) return null;

  /* @TODO
  - "organizer" (opt)
  - "performer" (opt)
  - "image" (opt)
  - offers
  -- "price" (opcional)
  -- "validFrom" (opcional)
  -- "priceCurrency" (opcional)
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
    offers: offers.map(url => ({
        "@type": "Offer",
        url,
        availability: "https://schema.org/InStock", // @TODO: Review
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