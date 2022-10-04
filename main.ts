input.onButtonPressed(Button.AB, function () {
    if (inputAvailable == true) {
        inputAvailable = false
        shotRange = strip.range(playerPos - 2, 5)
        shotRange.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(250)
        shotRange.showColor(neopixel.colors(NeoPixelColors.White))
        strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        inputAvailable = true
    }
})
let shotRange: neopixel.Strip = null
let playerPos = 0
let strip: neopixel.Strip = null
let inputAvailable = false
inputAvailable = false
strip = neopixel.create(DigitalPin.P0, 60, NeoPixelMode.RGB)
playerPos = 0
strip.clear()
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
strip.show()
inputAvailable = true
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
})
