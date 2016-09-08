module.exports = ({ heimdall, heimdallSessions }) => async ({ args, heimdallLoggedin, reply }) => {
  const { session } = await heimdallLoggedin();
  try {
    if (!Number.isInteger(args)) {
      const [asset] = await heimdall.getAssets(args);
      if (!asset) {
        reply.send(`no asset found with name "${args}"`);
        return;
      }
      args = asset.id;
    }
    await heimdall.post(`mxd/notepad/${session.customer.customerId}`, { contentId: args }, { 'mxd-session': session.sessionId });
    reply.send(`added asset with id "${args}" to the notepad`);
  } catch (e) {
    if (e.error) {
      reply.send(`notepad-add error "${e.error.message}"`);
    } else {
      reply.send(`notepad-add error "${e.message}"`);
    }
  }
};
