import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
  const { date, format } = attributes;
  const blockProps = useBlockProps.save();

  // Guardamos el texto ya formateado, así no hace falta JS en el frontend.
  const output = date
    ? dateI18n(format, new Date(`${date}T00:00:00`))
    : '';

  /*
  <div itemprop="event" itemscope itemtype="https://schema.org/Event">
      <a href="foo-fighters-may20-fedexforum" itemprop="url"><span itemprop="name">FedExForum</span></a> <span itemprop="location">Memphis, TN, US</span>
      <meta itemprop="startDate" content="2011-05-20">May 20 <a href="ticketmaster.com/foofighters/may20-2011" itemprop="offers">Buy tickets</a>
  </div>
  */
  return (
    <span {...blockProps}>{output}</span>
  );
}
