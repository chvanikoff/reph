import { Socket } from 'phoenix';


const setupHandlers = (name, channel, dispatch) => {
  switch (name) {
    case "visitors":
      channel.on("init", (msg) => {
        dispatch({
          type: "VISITORS_INIT",
          total: msg.total,
          online: msg.online,
          max_online: msg.max_online
        });
      });
      channel.on("add", () => {
        dispatch({
          type: "VISITORS_ADD"
        });
      });
      channel.on("remove", () => {
        dispatch({
          type: "VISITORS_REMOVE"
        });
      });
      break;
    default:
      break;
  }
}

export default {
  socket_connect: () => {
    return (dispatch) => {
      const socket = new Socket('/socket', {});
      socket.connect();
      dispatch({
        type: 'SOCKET_CONNECTED',
        socket: socket
      });
    }
  },
  channel_join: (name, alias = null) => {
    alias = alias === null ? name : alias;
    return (dispatch, getState) => {
      const { ws } = getState();
      if (ws.socket !== null) {
        const channel = ws.socket.channel(name);
        channel.join().receive('ok', () => {
          setupHandlers(alias, channel, dispatch);
          dispatch({
            type: 'CHANNEL_JOINED',
            name: alias,
            channel: channel
          });
        });
      }
    }
  }
};