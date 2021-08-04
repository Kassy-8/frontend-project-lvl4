export const selectChannels = (state) => state.channelsInfo.channels;
export const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectChannel = (id) => (state) => state.channelsInfo.channels[id];

export const selectModalInfo = (state) => state.modalInfo;

export const selectMessagesForActiveChannel = (id) => (state) => state.messagesInfo.messages
  .filter((message) => message.channelId === id);
