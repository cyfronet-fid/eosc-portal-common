// Polyfills dla TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill dla ReadableStream i innych Web Streams API
if (!global.ReadableStream) {
    global.ReadableStream = class ReadableStream {
        constructor() {}
        getReader() {
            return {
                read: () => Promise.resolve({ done: true, value: undefined }),
                cancel: () => Promise.resolve(),
                closed: Promise.resolve()
            };
        }
    };
}

if (!global.WritableStream) {
    global.WritableStream = class WritableStream {
        constructor() {}
        getWriter() {
            return {
                write: () => Promise.resolve(),
                close: () => Promise.resolve(),
                abort: () => Promise.resolve()
            };
        }
    };
}

if (!global.TransformStream) {
    global.TransformStream = class TransformStream {
        constructor() {
            this.readable = new global.ReadableStream();
            this.writable = new global.WritableStream();
        }
    };
}

// Polyfill dla MessagePort i MessageChannel
if (!global.MessagePort) {
    global.MessagePort = class MessagePort {
        constructor() {
            this.onmessage = null;
            this.onmessageerror = null;
        }

        postMessage(data) {
            if (this.onmessage) {
                setTimeout(() => this.onmessage({ data }), 0);
            }
        }

        start() {}
        close() {}

        addEventListener(type, listener) {
            if (type === 'message') {
                this.onmessage = listener;
            }
        }

        removeEventListener(type, listener) {
            if (type === 'message') {
                this.onmessage = null;
            }
        }
    };
}

if (!global.MessageChannel) {
    global.MessageChannel = class MessageChannel {
        constructor() {
            this.port1 = new global.MessagePort();
            this.port2 = new global.MessagePort();

            this.port1.postMessage = (data) => {
                if (this.port2.onmessage) {
                    setTimeout(() => this.port2.onmessage({ data }), 0);
                }
            };

            this.port2.postMessage = (data) => {
                if (this.port1.onmessage) {
                    setTimeout(() => this.port1.onmessage({ data }), 0);
                }
            };
        }
    };
}

// Polyfill dla AbortController i AbortSignal
if (!global.AbortController) {
    global.AbortSignal = class AbortSignal {
        constructor() {
            this.aborted = false;
            this.reason = undefined;
            this.onabort = null;
        }

        addEventListener(type, listener) {
            if (type === 'abort') {
                this.onabort = listener;
            }
        }

        removeEventListener(type, listener) {
            if (type === 'abort') {
                this.onabort = null;
            }
        }

        static abort(reason) {
            const signal = new AbortSignal();
            signal.aborted = true;
            signal.reason = reason;
            return signal;
        }
    };

    global.AbortController = class AbortController {
        constructor() {
            this.signal = new global.AbortSignal();
        }

        abort(reason) {
            this.signal.aborted = true;
            this.signal.reason = reason;
            if (this.signal.onabort) {
                this.signal.onabort({ type: 'abort' });
            }
        }
    };
}

// Mock dla fetch API
if (!global.fetch) {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
            text: () => Promise.resolve(''),
            blob: () => Promise.resolve(new Blob()),
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        })
    );
}

// Mock dla Headers
if (!global.Headers) {
    global.Headers = class Headers {
        constructor(init = {}) {
            this.headers = new Map();
            if (init) {
                if (init instanceof Headers) {
                    init.forEach((value, key) => this.headers.set(key, value));
                } else if (Array.isArray(init)) {
                    init.forEach(([key, value]) => this.headers.set(key, value));
                } else if (typeof init === 'object') {
                    Object.entries(init).forEach(([key, value]) => this.headers.set(key, value));
                }
            }
        }

        append(name, value) { this.headers.set(name, value); }
        delete(name) { this.headers.delete(name); }
        get(name) { return this.headers.get(name); }
        has(name) { return this.headers.has(name); }
        set(name, value) { this.headers.set(name, value); }
        forEach(callback) { this.headers.forEach(callback); }
        keys() { return this.headers.keys(); }
        values() { return this.headers.values(); }
        entries() { return this.headers.entries(); }
    };
}

// Mock dla FormData
if (!global.FormData) {
    global.FormData = class FormData {
        constructor() {
            this.data = new Map();
        }

        append(name, value) { this.data.set(name, value); }
        delete(name) { this.data.delete(name); }
        get(name) { return this.data.get(name); }
        has(name) { return this.data.has(name); }
        set(name, value) { this.data.set(name, value); }
        forEach(callback) { this.data.forEach(callback); }
    };
}

// Mock dla window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock dla ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Mock dla URL jeśli nie istnieje
if (!global.URL) {
    global.URL = class URL {
        constructor(url, base) {
            this.href = url;
            this.protocol = 'http:';
            this.hostname = 'localhost';
            this.pathname = '/';
            this.search = '';
            this.hash = '';
        }
    };
}
