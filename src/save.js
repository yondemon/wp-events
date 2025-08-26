import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import SimpleTemplate from './templates/simpleTemplate';

import metadata from '../block.json';
const BLOCK_NAMESPACE = 'wp-block-' + metadata.name.replace('/', '-');

export default function save({ attributes }) {
  const { 
    eventName, description, location, 
    offers = [],
    startDateTime, endDateTime, dateFormat, 
   } = attributes;
  const blockProps = useBlockProps.save();

  if (!startDateTime) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName || undefined,
    startDate: startDateTime,
    endDate: endDateTime || undefined,
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
