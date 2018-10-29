const cleanUndefined = require('./cleanUndefined');

const getSelections = async (io, roomId) => {
  let selections;

  await io.in(`${roomId}`).clients((error, clients) => {
    if (error) throw error;
    
    selections = cleanUndefined(clients.map(client => {
      return io.sockets.connected[client].select
    }));
  });
  
  return selections;
};

module.exports = getSelections;