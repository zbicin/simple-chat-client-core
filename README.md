# Simple Chat Client Core

Core of a client application for the [Simple Chat Server](https://github.com/zbicin/simple-chat-server).

## How to use?

The following code assumes that the [Simple Chat Server](https://github.com/zbicin/simple-chat-server) is running on `localhost:3001`.

```html
<!-- load the client-core from CDN -->
<script src="//gitcdn.xyz/repo/zbicin/simple-chat-client-core/master/dist/index.js"></script>
<!-- instanitiate it -->
<script type="text/javascript">
var core = new SimpleChatClientCore('localhost:3001');

core.login('Dummy user');

core.on('chat message', function(message) {
    console.log('New message', message);
});

core.sendText('Hello');
</script>
```

For a detailed example, see [Simple Chat Client](https://github.com/zbicin/simple-chat-client).

## API Reference

TODO. See [Core.ts](src/Core.ts) for now.