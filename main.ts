input.onButtonPressed(Button.AB, function () {
    shotRange = strip.range(playerPos - 2, 5)
    shotRange.showColor(neopixel.colors(NeoPixelColors.Blue))
    basic.pause(250)
    shotRange.showColor(neopixel.colors(NeoPixelColors.White))
    strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
})
let shotRange: neopixel.Strip = null
let playerPos = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 60, NeoPixelMode.RGB)
playerPos = 0
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.White))
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.show()
strip.setBrightness(100)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.White))
        if (playerPos < strip.length() - 1) {
            playerPos += 1
        }
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Blue))
        strip.show()
    }
    if (input.buttonIsPressed(Button.B)) {
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.White))
        if (playerPos > 0) {
            playerPos += -1
        }
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Blue))
        strip.show()
    }
})
basic.forever(function () {
    if (playerPos >= strip.length() - 1) {
        game.addScore(1)
    }
})
