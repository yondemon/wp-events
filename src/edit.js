import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
  PanelBody, 
  Button,
  CheckboxControl,
  DateTimePicker, 
  SelectControl,
  TextControl, 
  TextareaControl
} from '@wordpress/components';
import { dateI18n } from '@wordpress/date';

import SimpleTemplate from './templates/simpleTemplate';

import metadata from '../block.json';
const BLOCK_NAMESPACE = 'wp-block-' + metadata.name.replace('/', '-');

export default function edit({ attributes, setAttributes }) {
  const { eventName, 
    startDateTime, endDateTime, dateFormat, 
    location, description, offers,
    showEventName, showDescription
   } = attributes;

  const blockProps = useBlockProps();

  const formattedStartDate = dateI18n(dateFormat, startDateTime);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Evento', 'ao-events')} initialOpen={true}>
          <TextControl
            label={__('Nombre del evento', 'ao-events')}
            value={eventName}
            onChange={(val) => setAttributes({ eventName: val })}
          />
          <CheckboxControl
            label={__('Mostrar nombre del evento', 'ao-events')}
            checked={!!showEventName}
            onChange={(val) => setAttributes({ showEventName: val })}
          />
          <TextControl
            label={__('Ubicación', 'ao-events')}
            value={location}
            onChange={(val) => setAttributes({ location: val })}
          />     
          <TextareaControl
            label={__('Descripción', 'ao-events')}
            value={description}
            onChange={(val) => setAttributes({ description: val })}
          />
          <CheckboxControl
            label={__('Mostrar descripción', 'ao-events')}
            checked={!!showDescription}
            onChange={(val) => setAttributes({ showDescription: val })}
          />
        </PanelBody>
        <PanelBody title={__('Entradas', 'ao-events')} initialOpen={true}>
          <OffersFields 
            offers={ offers }
            setAttributes={setAttributes}
          />
        </PanelBody>
        <PanelBody title={ `${__('Fechas', 'ao-events')} ${startDateTime ? formattedStartDate : ''}`} initialOpen={false}>
          <SelectControl
            label={__('Formato de fecha', 'ao-events')}
            value={dateFormat}
            options={[
              { label: 'dd-mm-yyyy (16-Ago-2025)', value: 'd-M-Y' },
              { label: 'l j F – H.i\h. (Sábado 16 Agosto - 20.30h.)', value: 'l j F – H.i\\h.' },
              { label: 'hh:mm (12:30)', value: 'H:i' }
            ]}
            onChange={(val) => setAttributes({ dateFormat: val })}
          />
          <DateTimePicker
            label={__('Fecha inicio', 'ao-events')}
            currentDate={ (startDateTime || new Date().toISOString()) }
            is12hour={false}
            onChange={ (newDate) => setAttributes({ startDateTime: newDate }) }
            __nextRemoveHelpButton
          />
          <DateTimePicker
            label={__('Fecha fin', 'ao-events')}
            currentDate={ (endDateTime || new Date().toISOString()) }
            is12hour={false}
            onChange={ (newDate) => setAttributes({ endDateTime: newDate }) }
            __nextRemoveHelpButton
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        { startDateTime ?
            (
              <SimpleTemplate attributes={attributes} baseClass={BLOCK_NAMESPACE} />
            )
            : __('Selecciona fecha y hora…', 'ao-events') 
        }
      </div>
    </>
  );
}

function OffersFields({ offers, setAttributes }) {
  const updateOffer = (value, index) => {
    const newOffers = [...offers];
    newOffers[index] = value;
    setAttributes({ offers: newOffers });
  };

  const addOffer = () => {
    setAttributes({ offers: [...offers, ''] });
  };

  const removeOffer = (index) => {
    const newOffers = offers.filter((_, i) => i !== index);
    setAttributes({ offers: newOffers });
  };

  return (
    <div className="offers-fields">
      {offers.map((offer, index) => (
        <div key={index} className="offers-item">
          <TextControl
            value={offer}
            onChange={(val) => updateOffer(val, index)}
            placeholder="https://ejemplo.com/entradas"
          />
          <Button
            variant="secondary"
            isDestructive
            onClick={() => removeOffer(index)}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button variant="primary" onClick={addOffer}>{__('+ Añadir enlace','ao-events')}</Button>
    </div>
  );
}
