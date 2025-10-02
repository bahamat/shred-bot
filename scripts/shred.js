// Description:
//     Hubot script to persist JSON data with safe writes.
//
// Commands:
//     hubot data show - Shows the current data
//     hubot data set <key> <value> - Updates the data
//

const fs = require("fs");
const path = require("path");

function getShredWeekNumber(date = new Date()) {
    // Work in NY time
    const pacificOffset = -7 * 60; // PDT = UTC-7; use -8*60 for PST
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const pacific = new Date(utc + pacificOffset * 60000);
  
    // Adjust so the week rolls over at Sunday 11:00 AM
    let adjusted = new Date(pacific);
    if (pacific.getDay() === 0 && pacific.getHours() < 11) {
        // Before Sunday 11am → treat as Saturday
        adjusted.setDate(adjusted.getDate() - 1);
    }
  
    // Find Jan 1 of this year in Pacific time
    const start = new Date(adjusted.getFullYear(), 0, 1);
  
    // Calculate day difference
    const diffDays = Math.floor((adjusted - start) / 86400000);
  
    // Convert to week number
    return Math.floor(diffDays / 7) + 1;
}

// Robot activity
module.exports = (robot) => {
    const DATA_DIR = path.join(__dirname, "../data");
    const DATA_FILE = path.join(DATA_DIR, "data.json");

    // In-memory state
    let pledges = {};
    let dirty = false; // Tracks whether pledges have changed
    let writing = false; // Prevents simultaneous writes

    // --- Load existing data ---
    try {
        if (fs.existsSync(DATA_FILE)) {
            pledges = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        }
    } catch (err) {
        robot.logger.error("Failed to load JSON data: " + DATA_FILE, err);
    }

    let writeTimer = null;
    function savePledges() {
        if (!dirty) return;
        if (writing) {
                triggerWrite;
        }
        writing = true;
        fs.writeFile(DATA_FILE, JSON.stringify(pledges, null, 2), (err) => {
            writing = false;
            if (err) {
                robot.logger.error("Failed to write data.json:", err);
            } else {
                dirty = false;
                robot.logger.debug("Data persisted to data.json");
            }
        });
    }

    function setData(key, value) {
            pledges[key] = value;
            dirty = true;
            triggerWrite;
    }

    function triggerWrite() {
        if (writeTimer) clearTimeout(writeTimer);
        writeTimer = setTimeout(() => {
            writeTimer = null;
            savePledges();
        }, 100);
    }

    // --- Periodic flush ---
    setInterval(savePledges, 10_000); // every 10 seconds

    /////////////////////////////////////////////////////////////
    // --- bot commands ---
    robot.respond(/data show/i, (res) => {
        res.reply("Current data: " + JSON.stringify(pledges));
    });

    robot.respond(/data set (\S+) (.+)/i, (res) => {
        const key = res.match[1];
        const value = res.match[2];
        setData(key, value);
        res.reply(`Set ${key} = ${value}`);
    });

    robot.respond(/data delete (\S+)/i, (res) => {
        const key = res.match[1];
        setData(key, undefined);
        res.reply("Current data: " + JSON.stringify(pledges));
    })

    robot.respond(/what week is it/i, (res) => {
        res.reply(getShredWeekNumber());
    })

    // Persist on shutdown too
    process.on("exit", () => {
        if (dirty && !writing) {
            try {
                fs.writeFileSync(DATA_FILE, JSON.stringify(pledges, null, 2));
            } catch (err) {
                robot.logger.error("Final write failed:", err);
            }
        }
    });
};
