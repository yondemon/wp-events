import { __ } from '@wordpress/i18n';

import metadata from '../block.json';

export const BLOCK_NAMESPACE = 'wp-block-' + metadata.name.replace('/', '-');
export const EVENT_STATUS_OPTIONS = [
  {
    value: 'EventScheduled',
    label: __('Programado', 'ao-events'),
  },
  {
    value: 'EventCancelled',
    label: __('Cancelado', 'ao-events'),
  },
  {
    value: 'EventMovedOnline',
    label: __('Movido a online', 'ao-events'),
  },
  {
    value: 'EventPostponed',
    label: __('Pospuesto', 'ao-events'),
  },
  {
    value: 'EventRescheduled',
    label: __('Reprogramado', 'ao-events'),
  },
];
