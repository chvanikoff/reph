const initialState = {
  socket: null,
  channels: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SOCKET_CONNECTED":
      return {
        ...state,
        socket: action.socket
      };
    case "CHANNEL_JOINED":
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.name]: action.channel
        }
      }
    default:
      return state;
  }
}