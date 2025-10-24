// Description:
//     REST access to the bot.

export default async robot => {
    robot.router.post('/hubot/chatsecrets/:room', async (req, res) => {
        const room = req.params.room
        const data = JSON.parse(req.body.payload)
        const secret = data.secret

        await robot.messageRoom(room, `I have a secret: ${secret}`)

        await res.send('OK')
    });

    robot.router.get('/hubot/ping', async (req, res) => {
        var pong = { ping: "pong"}

        await res.send(JSON.stringify(pong))
    });
}