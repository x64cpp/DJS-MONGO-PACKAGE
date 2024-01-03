// Import Discord.js and Mongoose modules and retrieve the database URL from environment variables
const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODBURL;

// Export a module to handle the "ready" event of the Discord client
module.exports = {
  name: "ready",
  once: true,
  // Asynchronous function executed when the client is ready
  async execute(client) {
    // Display in the console that the bot is online in green color
    console.log("\x1b[32m✅", `${client.user.tag} is now online!\x1b[0m`);
    console.log("\x1b[33m⏳", "Enabling status...\x1b[0m");

    // Set an interval to change the bot's status randomly
    setInterval(async () => {
      // Get the number of servers and users
      const servers = client.guilds.cache.size;
      const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

      // Array of different statuses to display
      let status = [
        {
          name: "hi",
          type: ActivityType.Playing,
        },
        {
          name: `${servers} servers`,
          type: ActivityType.Watching,
        },
        {
          name: `${users} users`,
          type: ActivityType.Listening,
        },
      ];

      // Randomly select a status
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, 5000);

    // Message indicating successful status update in yellow color
    console.log("\x1b[33m✅", "Successfully enabled status!\x1b[0m");

    // Check the availability of the MongoDB database URL
    if (!mongodbURL) return;

    // Configure Mongoose and connect to the MongoDB database
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongodbURL || "", {});

    // Check the connection to the database and display in green color if successful
    if (mongoose.connection) {
      console.log("\x1b[32m✅", "The database is up and running!\x1b[0m");
    }

    // Function to set the bot's presence (may be incomplete or missing in this code)
    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
            },
          ],
          status: statusArray[option].status,
        });
      } catch (error) {
        // Display error messages in red color if an error occurs
        console.error("\x1b[31mError:", error, "\x1b[0m");
      }
    }
  },
};
