// import EventEmitter from "events";

// const _emitter = new EventEmitter();
// _emitter.setMaxListerners(0); // unlimit listener

// export const emitter = _emitter;

// src/utils/emitter.js

const _emitter = {
  events: {},

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  },

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((fn) => fn(data));
  },

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((fn) => fn !== listener);
  },
};

export const emitter = _emitter;
