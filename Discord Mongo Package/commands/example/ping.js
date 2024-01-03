const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("To check if the bot is responding"),
  async execute(interaction, client) {
    await interaction.reply({
      content: `Pong!\n\`${client.ws.ping}ms\``,
    });
  },
};
