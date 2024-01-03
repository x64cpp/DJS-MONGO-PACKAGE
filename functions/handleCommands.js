require("dotenv").config(); // Load environment variables from .env file
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

// Bot ID retrieved from .env file
const clientId = process.env.BOT_ID;

// Export of a function that manages commands for the Discord client
module.exports = (client) => {
  // Asynchronous function to handle commands from specific folders
  client.handleCommands = async (commandFolders, path) => {
    // Create an array to store commands
    client.commandArray = [];

    let totalCommands = 0; // Variable to store the total number of commands

    // Display a message indicating the start of command refresh in yellow color
    console.log(
      "\x1b[33m⏳ Started refreshing application (/) commands...\x1b[0m"
    );

    // Loop through all provided command folders
    for (folder of commandFolders) {
      // Get command files in the specified folder
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));

      // Loop through all command files
      for (const file of commandFiles) {
        // Import the command from the specified folder
        const command = require(`../commands/${folder}/${file}`);

        // Add the command to the client and command array
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());

        totalCommands++;
      }
    }

    // Create a REST instance to interact with the Discord API
    const rest = new REST({
      version: "10",
    }).setToken(process.env.TOKEN);

    // Update the application commands with Discord
    (async () => {
      try {
        // Display a success message with the total number of commands loaded in green color
        console.log(
          `\x1b[32m✅ Successfully reloaded ${totalCommands} application (/) commands!\x1b[0m`
        );
      } catch (error) {
        // Display an error message in red color if an error occurs
        console.error("\x1b[31mError:", error, "\x1b[0m");
      }
    })();
  };
};
