# Signal Bus
The signal bus provides a lightweight wrapper to [Phaser signals](https://phaser.io/docs/2.6.2/Phaser.Signal.html).

Rather than passing around the individual signals we can just import the message bus and listen for a named signal.
By importing the bus any signal can be subscribed to or published.
A signal is automatically created when the publish or subscribe methods are called if the signal doesn't exist.

## Examples

Import to your module with the following code:
```javascript
import bus from "./signal-bus.js";
```

### Subscription example

The subscribe method takes a single a parameter - an object which describes the message subscription.

It has 3 required properties
***channel***: Channel names are a way to partition messages and namespace them from other messages.
***name***: subscriptions will be fired based on a combination of **channel** and **name**.
***callback***: The function to be called when a message is published to this channel / name combination.

Subscribe also returns an object with unsubscribe method.

```javascript
const myCallback = data => console.log(data);
bus.subscribe({ callback: myCallback, channel: "channelName", name: "signalName" });
```

### Publishing example

The publish method takes a single a parameter - an object which describes a message packet.
The message packet has two required properties:

***channel***: Channel names are a way to partition messages and namespace them from other messages.
***name***: subscriptions will be fired based on a combination of **channel** and **name**.

it also takes a third optional property called **data** which can be any arbitrary value or object.
This is passed to the subscriber callbacks functions.

```javascript
bus.publish({channel: "channelName", name: "signalName", data: [1,2,3] });
```

## Built in Genie signals

### gel-buttons
Genie both uses and exposes some built in signals. The channel ***gel-buttons*** is used by all elements to publish messages when any button is clicked.

Gel signals automatically add the property *game* to their message's data packet. This is a reference to the current Phaser game object.

**Example of subscribing to a gel ui continue button:**
```javascript
signal.bus.subscribe({channel: "gel-buttons", name: "continue", callback: () => {/*function to call*/}})
```

### genie-settings

When settings are changed a message is published to the *genie-settings* channel.
The name will be that of the setting (e.g: *audio*) and the data will be the new settings value.

An additional signal with no message data is published with the name *settingsClosed* when the settings page is closed.

### scaler
When the game's viewport is resized a message of the format is published:

```javascript
{
	"channel" : "scaler",
	"name" : "sizeChange"
}
```

## Clearing up Genie signals between Screens

On navigating to a new screen, any subscriptions to the `gel-buttons` channel are automatically removed.

Any subscriptions to the `scaler` channel, or any other custom channels, are not automatically cleared up. These should be tidied up by calling `unsubscribe()` on a reference to the signal.

This can be done in a `shutdown()` method, which is called when a Phaser State is being navigated away from (see [Phaser CE docs](https://photonstorm.github.io/phaser-ce/Phaser.State.html#shutdown)).

**Example of clearing up a scaler subscription:**
```javascript
create() {
	this.signal = signal.bus.subscribe({channel: "scaler", name: "sizeChange", callback: () => {/*function to call*/}})
}

shutdown() {
	this.signal.unsubscribe();
}
```