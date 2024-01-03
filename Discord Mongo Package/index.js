// Create an instance of Client with defined intents
const { Client, GatewayIntentBits, Collection } = require(`discord.js`);
const fs = require("fs");
const { Events } = require("discord.js");

// Create an instance of Client with defined intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

// Initialize a collection to store bot commands
client.commands = new Collection();

// Configure access to environment variables
require("dotenv").config();

// Handle unhandled rejections and exceptions
const process = require("node:process");
process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "\x1b[31mUnhandled Rejection at:",
    promise,
    "reason:",
    reason,
    "\x1b[0m"
  );
});

process.on("uncaughtException", (err) => {
  console.log("\x1b[31mUncaught Exception:", err, "\x1b[0m");
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log("\x1b[31mUncaught Exception Monitor:", err, origin, "\x1b[0m");
});

// Load functions from the "functions" folder
const functions = fs
  .readdirSync("./functions")
  .filter((file) => file.endsWith(".js"));
(async () => {
  for (const file of functions) {
    require(`./functions/${file}`)(client);
  }
})();

// Handle events from the "events" folder
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
client.handleEvents(eventFiles, "./events");

// Handle commands from the "commands" folder
const commandFolders = fs.readdirSync("./commands");
client.handleCommands(commandFolders, "./commands");

// Connect the client using the token retrieved from environment variables
client.login(process.env.TOKEN).then(() => {});
