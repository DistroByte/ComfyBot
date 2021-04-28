module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(oldMessage, newMessage) {
    if (!newMessage.editedAt) return;
    this.client.emit("message", newMessage); // reruns new message as potential command
  }
};
