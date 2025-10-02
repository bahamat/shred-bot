'use strict'

// Description:
//     Give the bot personality and flavor.

export default async robot => {
    const gratitude = ['thanks', 'thank you', 'ty', 'danke']
    const gratitude_reply = ['de nada!', 'You\'re welcome!', 'Aww, shucks']
  
    robot.respond(`/${gratitude.join('|')}/i`, async (res) => {
        await res.send(res.random(gratitude_reply))
    })

    robot.hear(/you're the best/i, async (res) => {
        await res.send('Shut up baby, I know it')
    })

    const bang = [
        '```',
        ' ____    _    _   _  ____ _',
        '| __ )  / \\  | \\ | |/ ___| |',
        '|  _ \\ / _ \\ |  \\| | |  _| |',
        '| |_) / ___ \\| |\\  | |_| |_|',
        '|____/_/   \\_\\_| \\_|\\____(_)',
        '```',
    ]
    robot.hear(/shoot/i, async (res) => {
        await res.send(bang.join('\n'))
    })

    robot.hear(/what is it/i, async (res) => {
        await res.send("🎈🤡");
    })
  
    robot.hear(/are you (real|for real)/, async (res) => {
        await res.send('Beep, boop. I\'m a bot.');
    })

    robot.respond(/what do you do/i, async (res) => {
        await res.send("I shred. I SHRED! I Shreh-eh-ed!!");
    })
}
