// Description:
//     Give the bot a personality.

'use strict'

export default async robot => {
    const gratitude = ['thanks', 'thank you', 'ty', 'danke', 'merci', 'tah', 'gracias', 'grazie'];
    const gratitude_reply = ['de nada!', 'You\'re welcome!', 'Aww, shucks'];
  
    robot.respond(/DebugDump/, async (res) => {
        // This dump the raw message only if  requested it.
        if (res.message.user.id == 1031037811643650140) {
            console.log("Debug info:\n" + JSON.stringify(res.message, null, 2));
            return;
        }
    });

    robot.respond(/say (.*)/i, async (res) => {
        const phrase = res.match[1];
        if (res.message.user.id == 1031037811643650140) {
            await res.send(phrase);
            return;
        }
    });

    robot.respond(/open the (.*) doors?/i, async (res) => {
        const doorType = res.match[1]
  
        if (doorType === 'pod bay') {
            await res.reply('I\'m afraid I can\'t let you do that.')
            return
        }
  
        await res.reply('Opening ' + doorType + ' doors')
    });

    const lulz = ['lol', 'rofl', 'lmao', 'lulz']
    robot.respond(`/${lulz.join('|')}/i`, async (res) => {
        await res.send(res.random(lulz))
    });

    const answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
    robot.respond(/what is the answer to the ultimate question of life/, async (res) => {
        if (answer) {
            await res.send(`${answer}, but what is the question?`)
            return
        }
    
        await res.send('Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again')
    })

    robot.respond(`/${gratitude.join('|')}/i`, async (res) => {
        await res.send(res.random(gratitude_reply))
    });

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
    });

    robot.respond(/(you're the best|(I |we )?l(ove|uv) you)/i, async (res) => {
        await res.send('Shut up baby, I know it.')
    });

    robot.hear(/what is it/i, async (res) => {
        await res.send("🎈🤡");
    });

    const queen_lyrics = [
        "Oh mamma mia, mamma mia\nMamma mia, let me go",
        "God save the Queen\nShe ain't no human being",
        "We will rock you",
    ];

    robot.hear(/.*queen.*/i, async (res) => {
        var r = Math.random();
        if (r < 0.1) {
            await res.send(res.random(queen_lyrics));
        }
    });

    robot.hear(/\bblue\b/i, async (res) => {
        var r = Math.random();
        if (r < 0.01) {
            await res.send("Literally the *warmest* color.");
        }
    });
  
    robot.respond(/(what )?are you (real|for real|a bot)/, async (res) => {
        await res.send('Beep, boop. I\'m a bot.');
    });

    // https://www.youtube.com/watch?v=mlQa9MK14Dg&t=13s
    robot.respond(/what do you do/i, async (res) => {
        await res.send("I shred. I *shred*! I-hai Shreh-eh-ed!!");
    });

    robot.respond(/(.* )(\w+) (major )?chord/i, async (res) => {
        const chord = res.match[2];
        await res.send('🎸 [' + chord + ' chord](https://www.oolimo.com/en/guitar-chords/chart#name=' + chord + ')');
    });
}
