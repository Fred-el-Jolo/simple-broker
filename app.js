const EventBus = require('./src/event-bus');

const eventBus = new EventBus();

//----------------------------------
eventBus.on('one', function() {
    console.log('one');
});
eventBus.emit('one');

//-----------------------------------
eventBus.on('two', function() {
    console.log('two');
});
eventBus.emit('one');
eventBus.emit('two');
eventBus.emit('three');

//-----------------------------------
eventBus.on('echo', function(str) {
    console.log('echo:', str);
});
eventBus.emit('echo', 'hello world');

//-----------------------------------
eventBus.on('log', function() {
    console.log('log:', arguments);
});
eventBus.emit('log', 'hello', 'world', '!');

//-----------------------------------
eventBus.emit('one', 'two', 'log','hello', 'world', '!');
