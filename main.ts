input.onButtonPressed(Button.A, function () {
    strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.White))
    if (playerPos < strip.length() - 1) {
        playerPos += 1
    }
    strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
})
input.onButtonPressed(Button.B, function () {
    strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.White))
    if (playerPos > 0) {
        playerPos += -1
    }
    strip.setPixelColor(playerPos, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
})
let playerPos = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
playerPos = 0
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.White))
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.show()
strip.setBrightness(100)
basic.forever(function () {
	
})
