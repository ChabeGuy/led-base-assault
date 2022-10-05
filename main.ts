input.onButtonPressed(Button.AB, function () {
    if (inputAvailable == true) {
        inputAvailable = false
        shotRange = strip.range(playerPos, 3)
        shotPos = playerPos + 3
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 1589, 1, 255, 0, 317, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
        shotRange.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(250)
        shotRange.showColor(neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        for (let enemy of unmovedEnemies) {
            if (enemy < shotPos && enemy > playerPos) {
                unmovedEnemies.removeAt(unmovedEnemies.indexOf(enemy))
            }
        }
        inputAvailable = true
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (gameOver == true) {
        gameOver = false
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.spring), SoundExpressionPlayMode.InBackground)
        inputAvailable = true
        game.setScore(0)
    }
})
let shotPos = 0
let shotRange: neopixel.Strip = null
let gameOver = false
let unmovedEnemies: number[] = []
let playerPos = 0
let strip: neopixel.Strip = null
let inputAvailable = false
inputAvailable = false
strip = neopixel.create(DigitalPin.P0, 60, NeoPixelMode.RGB)
playerPos = 0
unmovedEnemies = []
let enemySpawnRate = 4000
gameOver = true
strip.clear()
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
strip.show()
while (gameOver == true) {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
loops.everyInterval(500, function () {
    if (gameOver == false) {
        for (let enemy of unmovedEnemies) {
            strip.setPixelColor(enemy, neopixel.colors(NeoPixelColors.Black))
            strip.setPixelColor(enemy - 1, neopixel.colors(NeoPixelColors.Violet))
            strip.show()
            unmovedEnemies[unmovedEnemies.indexOf(enemy)] = enemy - 1
        }
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (inputAvailable == true) {
            strip.setBrightness(50)
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.White))
            if (playerPos < strip.length() - 1) {
                playerPos += 1
            }
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.pause(25)
        }
    }
    if (input.buttonIsPressed(Button.B)) {
        if (inputAvailable == true) {
            strip.setBrightness(50)
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Black))
            if (playerPos > 0) {
                playerPos += -1
            }
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.pause(25)
        }
    }
})
basic.forever(function () {
    if (playerPos >= strip.length() - 1) {
        game.addScore(1)
        enemySpawnRate += -10
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.InBackground)
        inputAvailable = false
        while (playerPos != 0) {
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Black))
            playerPos += -1
            strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.pause(10)
        }
        strip.clear()
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        inputAvailable = true
    }
    if (playerPos == unmovedEnemies[unmovedEnemies.indexOf(playerPos)]) {
        gameOver = true
        inputAvailable = false
        strip.clear()
        strip.show()
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.InBackground)
        game.gameOver()
    }
})
loops.everyInterval(enemySpawnRate, function () {
    if (gameOver == false) {
        unmovedEnemies.push(59)
        strip.setPixelColor(unmovedEnemies[unmovedEnemies.length - 1], neopixel.colors(NeoPixelColors.Violet))
        strip.show()
    }
})
