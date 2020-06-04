import Immutable from 'immutable';

import getLogger from '../getLogger';

/**
 *  This is the non-persistent (in-memory) roomsStore implementation.
 *  Switch between persistent / non-persistent store is done in settings.js
 */

let rooms = new Immutable.Map();

const LOGGER = getLogger('inMemoryRoomsStore');

export default {
  init,
  close,
  getRoomById,
  getRoomByAlias,
  saveRoom,
  getAllRooms,
  housekeeping
};

async function init() {
  // nothing to do here
  LOGGER.info('using in memory storage');
}

async function close() {
  // nothing to do here
}

async function housekeeping() {
  // nothing to do here so far. currently we assume that since this is in memory, storage gets erased regularly on application restart.
  // since this currently happens at least once a day (since current deployment kills app if not used), no action needed here
  return {
    markedForDeletion: [],
    deleted: []
  };
}

async function getRoomById(roomId) {
  if (!roomId) {
    return undefined;
  }

  return rooms.get(roomId);
}

async function getRoomByAlias(alias) {
  if (!alias) {
    return undefined;
  }

  return rooms.find((room) => room.get('alias') === alias);
}

async function saveRoom(room) {
  rooms = rooms.set(room.get('id'), room);
}

async function getAllRooms() {
  return rooms;
}
