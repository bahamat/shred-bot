// Description:
//     Give the bot a personality.
//
// Commands:
//      hubot ping - Verify the bot is alive.

module.exports = (robot) => {
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

    robot.respond(/ping/i, async (res) => {
        await res.send("PONG");
    });
}