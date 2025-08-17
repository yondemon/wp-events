import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, DatePicker, TextControl, SelectControl } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { useMemo } from '@wordpress/element';

export default function edit({ attributes, setAttributes }) {
  const { eventName, startDateTime, dateFormat } = attributes;
  const blockProps = useBlockProps();

  // Si no hay fecha aún, mostramos un placeholder. Si la hay, la formateamos.
  const formattedStartDate = useMemo(() => {
    if (!startDateTime) return __('Selecciona una fecha…', 'ao-events');

    console.log(startDateTime);
    const jsStartDate = new Date(startDateTime);
    return dateI18n(dateFormat, jsStartDate);
  }, [startDateTime, dateFormat]);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Evento', 'ao-events')} initialOpen={true}>
          <TextControl
            label={__('Nombre del evento', 'bloque-fecha')}
            value={eventName}
            onChange={(val) => setAttributes({ eventName: val })}
          />
          <SelectControl
            label={__('Formato de fecha', 'bloque-fecha')}
            value={dateFormat}
            options={[
              { label: 'dd-mm-yyyy (16-Ago-2025)', value: 'd-M-Y' },
              { label: 'hh:mm (12:30)', value: 'H:i' }
            ]}
            onChange={(val) => setAttributes({ dateFormat: val })}
          />
          <DatePicker
            currentDate={ (startDateTime || new Date().toISOString()).slice(0, 10) }
            onChange={ (newDate) => setAttributes({ startDateTime: newDate }) }
            __nextRemoveHelpButton
          />
        </PanelBody>
      </InspectorControls>

      <p {...blockProps}>
        {formattedStartDate} {eventName ? `- ${eventName}` : ''}
      </p>
    </>
  );
}
