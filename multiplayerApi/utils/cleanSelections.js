const getSelections = async (io, roomId) => {
  await io.in(`${roomId}`).clients((error, clients) => {
    if (error) throw error;
    clients.map(client => {
      io.sockets.connected[client].select = null;
    })
  });
};

module.exports = getSelections;