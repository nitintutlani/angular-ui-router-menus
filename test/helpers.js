'use strict';

function loadStates(states, stateProvider) {
  for(var state in states) {
    stateProvider.state(state, states[state]);
  }
}