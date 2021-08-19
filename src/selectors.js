export const selectChannels = (state) => state.channelsInfo.channels;
export const selectChannelIds = (state) => state.channelsInfo.channels.map(({ id }) => id);
export const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectChannel = (id) => (state) => state.channelsInfo.channels
  .find((channel) => channel.id === id);

export const selectChatPageError = (state) => state.channelsInfo.error;
export const selectChatPageStatus = (state) => state.channelsInfo.status;

export const selectModalInfo = (state) => state.modalInfo;

export const selectMessagesForActiveChannel = (id) => (state) => state.messagesInfo.messages
  .filter((message) => message.channelId === id);
