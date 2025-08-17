import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, DatePicker } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { useMemo } from '@wordpress/element';

export default function edit({ attributes, setAttributes }) {
  const { date, format } = attributes;
  const blockProps = useBlockProps();

  // Si no hay fecha aún, mostramos un placeholder. Si la hay, la formateamos.
  const formatted = useMemo(() => {
    if (!date) return __('Selecciona una fecha…', 'ao-events');
    // Aseguramos medianoche para evitar desfases de zona horaria
    const jsDate = new Date(`${date}T00:00:00`);
    return dateI18n(format, jsDate);
  }, [date, format]);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Ajustes de fecha', 'bloque-fecha')} initialOpen={true}>
          <DatePicker
            currentDate={ date || new Date().toISOString().slice(0, 10) }
            onChange={ (newDate) => setAttributes({ date: newDate }) }
            __nextRemoveHelpButton
          />
        </PanelBody>
      </InspectorControls>

      <p {...blockProps}>
        {formatted}
      </p>
    </>
  );
}
