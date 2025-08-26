import { EVENT_STATUS_OPTIONS } from './constants/eventStatus';

export const getEventStatusLabel = (value) => {
  const found = EVENT_STATUS_OPTIONS.find((opt) => opt.value === value);
  return found ? found.label : '';
};

