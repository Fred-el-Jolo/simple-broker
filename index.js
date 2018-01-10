const EventBus = require('./src/event-bus');

const eventBus = new EventBus();
const eventBus2 = new EventBus();

//----------------------------------
eventBus.on('one', function() {
    console.log('one');
});
eventBus.emit('one');

//-----------------------------------
eventBus2.on('two', function() {
    console.log('two');
});
eventBus2.emit('one');
eventBus.emit('two');
eventBus2.emit('three');

//-----------------------------------
eventBus.on('echo', function(str) {
    console.log('echo:', str);
});
eventBus2.emit('echo', 'hello world');

//-----------------------------------
eventBus.on('log', function() {
    console.log('log:', arguments);
});
eventBus2.emit('log', 'hello', 'world', '!');

//-----------------------------------
eventBus2.emit('one', 'two', 'log','hello', 'world', '!');
