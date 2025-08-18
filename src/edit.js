import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
  PanelBody, 
  DateTimePicker, 
  SelectControl,
  TextControl, 
  TextareaControl
} from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { useMemo } from '@wordpress/element';

export default function edit({ attributes, setAttributes }) {
  const { eventName, startDateTime, endDateTime, dateFormat, location, description, offers } = attributes;
  const blockProps = useBlockProps();

  const formattedStartDate = useMemo(() => {
    if (!startDateTime) return null;

    const jsStartDate = new Date(startDateTime);
    return dateI18n(dateFormat, jsStartDate);
  }, [startDateTime, dateFormat]);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Evento', 'ao-events')} initialOpen={true}>
          <TextControl
            label={__('Nombre del evento', 'ao-events')}
            value={eventName}
            onChange={(val) => setAttributes({ eventName: val })}
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
          <TextControl
              label={__('URL de compra/entradas', 'ao-events')}
              value={offers}
              onChange={(val) => setAttributes({ offers: val })}
              placeholder="https://ejemplo.com/entradas"
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

      <p {...blockProps}>
        {formattedStartDate || __('Selecciona fecha y hora…', 'ao-events') } {eventName ? `- ${eventName}` : ''}
      </p>
    </>
  );
}
