radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        moveRight = false
        moveLeft = false
    } else if (receivedNumber == 1) {
        moveLeft = true
    } else if (receivedNumber == 2) {
        moveRight = true
    } else if (receivedNumber == 3) {
        if (inputAvailable == true) {
            inputAvailable = false
            shotRange = strip.range(playerPos, 3)
            shotPos = playerPos + 3
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 1589, 1, 255, 0, 317, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
            shotRange.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause(250)
            shotRange.showColor(neopixel.colors(NeoPixelColors.Black))
            for (let enemy of unmovedEnemies) {
                if (enemy < shotPos && enemy > playerPos) {
                    unmovedEnemies.removeAt(unmovedEnemies.indexOf(enemy))
                }
            }
            if (gameOver == false) {
                strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
                strip.show()
                inputAvailable = true
            }
        }
    } else if (receivedNumber == 4) {
        if (ableToStart == true) {
            ableToStart = false
            gameOver = false
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.spring), SoundExpressionPlayMode.InBackground)
            inputAvailable = true
            game.setScore(0)
        }
    }
})
input.onButtonPressed(Button.AB, function () {
	
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
let shotPos = 0
let shotRange: neopixel.Strip = null
let moveLeft = false
let moveRight = false
let ableToStart = false
let gameOver = false
let unmovedEnemies: number[] = []
let playerPos = 0
let strip: neopixel.Strip = null
let inputAvailable = false
radio.setGroup(1)
inputAvailable = false
strip = neopixel.create(DigitalPin.P0, 60, NeoPixelMode.RGB)
playerPos = 0
unmovedEnemies = []
let enemySpawnRate = 4000
gameOver = true
ableToStart = true
strip.clear()
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
strip.show()
while (ableToStart == true) {
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
    if (moveRight == true) {
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
    if (moveLeft == true) {
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
    if (gameOver == false) {
        basic.showNumber(game.score())
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
        inputAvailable = false
        gameOver = true
        strip.clear()
        strip.show()
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.InBackground)
        radio.sendNumber(game.score())
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
