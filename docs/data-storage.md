# Using Local Storage/Cookies

Saving data must go through the [GMI](gmi.md). This ensures all data access complies with BBC data policies.

## Cookies/Local Storage disabled

In the event a user has disabled cookies/local storage, any attempt to save data will be ignored, and any attempt to retrieve data will
return the global settings with default values.

Games also adhere to the BBC 'Functional' Cookie so a user can opt out of these features. Users can manage preferences here: [Manage Cookie Settings](http://www.bbc.co.uk/privacy/cookies/managing/cookie-settings).

*All games must be prepared to handle this scenario.*

## Saving data

```javascript
gmi.setGameData(key, value);
```

Stores a JSON key-value pair that can then be retrieved with `getAllSettings()`.

## Loading data

```javascript
gmi.getAllSettings();
```

Returns a JSON object with [global settings](settings.md#global-settings) and specific game data.

Specific game data is stored under `gameData`:

```javascript
gmi.getAllSettings().gameData;
```

This object will contain all of the properties set by this game using `setGameData`.

[Global settings](settings.md#global-settings) can be accessed like so:

```javascript
gmi.getAllSettings().audio;
gmi.getAllSettings().motion;
gmi.getAllSettings().subtitles;

```

## Testing

### CAGE

Once your game is built to CAGE, you can change your 'Functional' cookie preferences at [Manage Cookie Settings](http://www.bbc.co.uk/privacy/cookies/managing/cookie-settings) to see the game behave differently with different cookie settings.

### Local
Edit your index.html so that `gmi.areCookiesAllowed()` returns true/false to observe how your game behaves.

