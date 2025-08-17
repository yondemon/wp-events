import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
  PanelBody, 
  DatePicker, 
  SelectControl,
  TextControl, 
  TextareaControl
} from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { useMemo } from '@wordpress/element';

export default function edit({ attributes, setAttributes }) {
  const { eventName, startDateTime, endDateTime, dateFormat, location, description } = attributes;
  const blockProps = useBlockProps();

  const formattedStartDate = useMemo(() => {
    if (!startDateTime) return __('Selecciona una fecha…', 'ao-events');

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
          <SelectControl
            label={__('Formato de fecha', 'ao-events')}
            value={dateFormat}
            options={[
              { label: 'dd-mm-yyyy (16-Ago-2025)', value: 'd-M-Y' },
              { label: 'hh:mm (12:30)', value: 'H:i' }
            ]}
            onChange={(val) => setAttributes({ dateFormat: val })}
          />
          <DatePicker
            label={__('Fecha inicio', 'ao-events')}
            currentDate={ (startDateTime || new Date().toISOString()).slice(0, 10) }
            onChange={ (newDate) => setAttributes({ startDateTime: newDate }) }
            __nextRemoveHelpButton
          />
          <DatePicker
            label={__('Fecha fin', 'ao-events')}
            currentDate={ (endDateTime || new Date().toISOString()).slice(0, 10) }
            onChange={ (newDate) => setAttributes({ endDateTime: newDate }) }
            __nextRemoveHelpButton
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
        </PanelBody>
      </InspectorControls>

      <p {...blockProps}>
        {formattedStartDate} {eventName ? `- ${eventName}` : ''}
      </p>
    </>
  );
}
