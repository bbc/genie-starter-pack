# Results Countup

## Usage

Set the objects type to "countup" to create a results countup object.

| Name | Type | Default | Description |
|------|------|----------|-------------|
| startCount | integer \| template | | The number to start counting from. |
| endCount | integer \| template | | The number to count to. |
| startDelay | integer | | The delay (in ms) before the counter starts. |
| countupDuration | integer | | The duration (in ms) of the countup. |
| audio.key | string | | The asset key of the audio file to play each count. |
| audio.fireRate | integer | | Play the audio file every x counts. |
| audio.startPlayRate | integer | | The initial playrate of the count audio - used for pitch shifting. |
| audio.endPlayRate | integer | | The final playrate of the count audio - used for pitch shifting. |
| offsetX | integer | 0 | The x offset for this object. |
| offsetY | integer | 0 | The y offset for this object. |
| textStyle | [Phaser TextStyle](https://photonstorm.github.io/phaser3-docs/Phaser.Types.GameObjects.Text.html#.TextStyle) | optional | The text style config object. |

This object supports [templates](https://lodash.com/docs/4.17.15#template).

## Example config

You may set data in your game component, that can be accessed on the results screen.  

For example:  
`this.transientData.results = { score: 20 };`

```json5
{
    type: 'countup',
    startCount: 0,
    endCount: '<%= score %>',
    startDelay: 1000,
    countupDuration: 1000,
    audio: {
        key: 'results.coin-sfx',
        fireRate: 1,
        startPlayRate: 0.8,
        endPlayRate: 1.2,
    },
    offsetX: 15,
    offsetY: -20,
    textStyle: {
        fontFamily: 'ReithSans',
        fontSize: '24px',
        color: '#FFFF00',
        align: 'center',
    },
},
```