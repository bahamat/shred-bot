'use strict'

// Description:
//     Give the bot personality and flavor.

export default async robot => {
    const gratitude = ['thanks', 'thank you', 'ty', 'danke', 'merci', 'tah', 'gracias', 'grazie'];
    const gratitude_reply = ['de nada!', 'You\'re welcome!', 'Aww, shucks'];
  
    robot.respond(`/${gratitude.join('|')}/i`, async (res) => {
        await res.send(res.random(gratitude_reply))
    })

    const greetings = [
        'Hello',
        'Hi',
        'What\'s up',
        'Mahalo',
        'Ahoy',
        'Bonjour',
        'Wassup',
        'Greetings',
        'Greetings, program',
        'Guten tag',
        'Namaste'
    ];

    robot.respond(`/${greetings.join('|')}/i`, async (res) => {
        await res.send(res.random(greetings) + '!');
    })

    robot.respond(/(you're the best|(I |we )?l(ove|uv) you)/i, async (res) => {
        await res.send('Shut up baby, I know it.')
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
    robot.hear(/pop/i, async (res) => {
        await res.send(bang.join('\n'))
    })

    robot.hear(/what is it/i, async (res) => {
        await res.send("🎈🤡");
    })

    robot.hear(/.*queen.*/i, async (res) => {
        var r = Math.random();
        if (r < 0.1) {
            await res.send("God save the Queen!");
        } else {
            await res.send("Chance fail: " + r);
        }
    })
  
    robot.respond(/(what )?are you (real|for real|a bot)/, async (res) => {
        await res.send('Beep, boop. I\'m a bot.');
    })

    // https://www.youtube.com/watch?v=mlQa9MK14Dg&t=13s
    robot.respond(/what do you do/i, async (res) => {
        await res.send("I shred. I *shred*! I-hai Shreh-eh-ed!!");
    })
}
