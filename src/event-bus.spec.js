const EventBus = require('./event-bus');

test('EventBus contains "on" function', () => {
    const broker = new EventBus();

    expect(broker.on).toBeDefined();
    expect(typeof broker.on).toBe('function');
});

test('EventBus contains "emit" function', () => {
    const broker = new EventBus();

    expect(broker.emit).toBeDefined();
    expect(typeof broker.emit).toBe('function');
});

test('EventBus can subscribe and trigger a handler when an action is fired', () => {
    const broker = new EventBus();
    const mockCallback = jest.fn();

    broker.on('action', mockCallback);
    broker.emit('action');

    expect(mockCallback.mock.calls.length).toBe(1);
});

test('EventBus can fire a non-existing action without throwing an error', () => {
    const broker = new EventBus();

    expect(() => {
        broker.emit('action');
        broker.emit();
    }).not.toThrow();
});

test('EventBus can subscribe multiple handlers', () => {
    const broker = new EventBus();
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    const mockCallback3 = jest.fn();

    broker.on('action', mockCallback1);
    broker.on('action', mockCallback2);
    broker.on('action', mockCallback3);
    broker.emit('action', 'param1');

    expect(mockCallback1.mock.calls.length).toBe(1);
    expect(mockCallback2.mock.calls.length).toBe(1);
    expect(mockCallback3.mock.calls.length).toBe(1);
});

test('EventBus can subscribe and trigger a handler with one parameter', () => {
    const broker = new EventBus();
    const mockCallback = jest.fn();

    broker.on('action', mockCallback);
    broker.emit('action', 'param1');

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('param1');
});

test('EventBus can subscribe and trigger a handler with multiple parameters', () => {
    const broker = new EventBus();
    const mockCallback = jest.fn();

    broker.on('action', mockCallback);
    broker.emit('action', 'param1', 'param2');
    broker.emit('action', 'param1', 'param2', 'param3', 'param4');

    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[0]).toEqual(['param1', 'param2']);
    expect(mockCallback.mock.calls[1]).toEqual(['param1', 'param2', 'param3', 'param4']);
});

test('EventBus can fire multiple actions with multiple parameters', () => {
    const broker = new EventBus();
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    const mockCallback3 = jest.fn();

    broker.on('action1', mockCallback1);
    broker.on('action2', mockCallback2);
    broker.on('action3', mockCallback3);
    broker.emit('action1', 'action2', 'action3', 'param1', 'param2');

    expect(mockCallback1.mock.calls.length).toBe(1);
    expect(mockCallback1.mock.calls[0]).toEqual(['param1', 'param2']);

    expect(mockCallback2.mock.calls.length).toBe(1);
    expect(mockCallback2.mock.calls[0]).toEqual(['param1', 'param2']);

    expect(mockCallback3.mock.calls.length).toBe(1);
    expect(mockCallback3.mock.calls[0]).toEqual(['param1', 'param2']);
});

test('EventBus allow chaining', () => {
    const broker = new EventBus();
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    const mockCallback3 = jest.fn();

    broker.on('action', mockCallback1)
        .on('action', mockCallback2)
        .on('action', mockCallback3)
        .emit('action', 'param1')
        .emit('action', 'param2');

    expect(mockCallback1.mock.calls.length).toBe(2);
    expect(mockCallback2.mock.calls.length).toBe(2);
    expect(mockCallback3.mock.calls.length).toBe(2);
});


test('EventBus should not expose internal functions or variables', () => {
    const broker = new EventBus();

    expect(broker._emitSingleAction).not.toBeDefined();
    expect(broker._splitEmitParams).not.toBeDefined();
    expect(broker.handlers).not.toBeDefined();
});
