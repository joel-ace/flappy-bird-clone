export const ALLOWED_UPDATE_FIELDS_ARRAY = [
  'positionX',
  'positionY',
  'velocityX',
  'velocityY',
  'width',
  'height',
];

// For faster lookup
export const ALLOWED_UPDATE_FIELDS = ALLOWED_UPDATE_FIELDS_ARRAY.reduce((acc, val) => ({ ...acc, [val]: true}), {})
