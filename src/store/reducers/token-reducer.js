const initialState = {
  isLoading: true,
  value: null,
  error: null
};

export default function token(state = initialState, action) {
  switch (action.type) {
    case 'TOKEN_FETCH':
      return {
        isLoading: true,
        value: null,
        error: null
      };
    case 'TOKEN_SUCCESS':
      return {
        isLoading: false,
        value: action.payload,
        error: null
      };
    case 'TOKEN_ERROR':
      return {
        isLoading: false,
        value: null,
        error: action.error
      };
    default:
      return state;
  }
}
