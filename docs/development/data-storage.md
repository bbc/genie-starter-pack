# Using Local Storage and Cookies

Ideally, data should not be stored. If it is stored, data must not be personal. If the game contains sign in, it must respect the privacy settings on the user's account.

Data must be saved through the [GMI](gmi.md). This ensures all data access complies with BBC data policies.

## Cookies/Local Storage disabled

Games adhere to the BBC 'Functional' Cookie so a user can opt out of these features. Users can manage preferences here: [Manage Cookie Settings](http://www.bbc.co.uk/privacy/cookies/managing/cookie-settings).

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