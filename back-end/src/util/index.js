const SIZE_MIN_NAME = 8;
const SIZE_PASSWORD = 6;
const ZERO = 0;
const STATUS_200_OK = 200;
const STATUS_201_CREATED = 201;
const STATUS_204_NO_CONTENT = 204;
const STATUS_400_BAD_REQUEST = 400;
const STATUS_401_UNAUTHORIZED = 401;
const STATUS_404_NOT_FOUND = 404;
const STATUS_409_CONFLICT = 409;
const STATUS_422_UNPROCESSABLE_ENTITY = 422;
const CODE_ERROR = 'invalid_data';
const NOT_FOUND = 'not_found';
const SECRET = 'tokensecreto';

const checkedPassword = (password) => {
  if (password.length < SIZE_PASSWORD) {
    return { invalid: true, message: '"password" length must be 6 characters long' };
  }
  return { invalid: false };
};

const checkedName = (name) => {
  if (name.length < SIZE_MIN_NAME) {
    return { invalid: true, message: '"displayName" length must be at least 8 characters long' };
  }
  return { invalid: false };
};

module.exports = {
  SIZE_MIN_NAME,
  SIZE_PASSWORD,
  ZERO,
  STATUS_200_OK,
  STATUS_201_CREATED,
  STATUS_204_NO_CONTENT,
  STATUS_400_BAD_REQUEST,
  STATUS_401_UNAUTHORIZED,
  STATUS_404_NOT_FOUND,
  STATUS_409_CONFLICT,
  STATUS_422_UNPROCESSABLE_ENTITY,
  CODE_ERROR,
  NOT_FOUND,
  checkedPassword,
  checkedName,
  SECRET,
};
