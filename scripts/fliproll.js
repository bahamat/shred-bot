// Description:
//     Rolls dice and flips coins.
//
// Commands:
//     hubot roll <dice> - Rolls dice, like D&D.
//     hubot flip - Flips a coin.

'use strict'

function rollDice(notation) {
  const match = notation.trim().match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error(`Invalid dice notation: "${notation}"`);
  }

  const count = parseInt(match[1] || "1", 10);   // default 1 die
  const sides = parseInt(match[2], 10);
  const modifier = parseInt(match[3] || "0", 10);

  if (count <= 0 || sides <= 0) {
    throw new Error("Dice count and sides must be positive integers");
  }

  // Roll the dice
  const rolls = Array.from({ length: count }, () =>
    Math.floor(Math.random() * sides) + 1
  );

  const total = rolls.reduce((a, b) => a + b, 0) + modifier;

  return {
    input: notation,
    rolls,
    modifier,
    total,
    toString() {
      const modStr =
        modifier === 0 ? "" : modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`;
      return `${notation}: [${rolls.join(", ")}]${modStr} = **${total}**`;
    },
  };
}

module.exports = (robot) => {
    robot.respond(/roll (.+)/i, async (res) => {
        const notation = res.match[1];
        try {
            const result = rollDice(notation);
            await res.send('🎲 ' + result.toString());
        } catch (error) {
            await res.send(error.message);
        }
    });

    robot.respond(/flip a coin/i, async (res) => {
        const outcome = Math.random() < 0.5 ? "👩🏼‍💼" : "🦅";
        await res.send(`🪙👍🔄🟰${outcome}`);
    });

}
