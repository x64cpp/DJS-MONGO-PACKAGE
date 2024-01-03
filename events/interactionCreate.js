// Export of an object representing the handling of the "interactionCreate" event
module.exports = {
  name: "interactionCreate",
  // Asynchronous function to perform actions when an interaction occurs
  async execute(interaction, client, err) {
    // Check if the interaction is a command
    if (!interaction.isCommand()) return;

    // Retrieve the command associated with the interaction
    const command = client.commands.get(interaction.commandName);

    // If the command is not found, stop execution
    if (!command) return;

    try {
      // Execute the command with the interaction
      await command.execute(interaction, client).catch(err);
    } catch (error) {
      // Get the current timestamp
      const timestamp = new Date().toLocaleString();
      try {
        // Respond to the interaction with an error message including the timestamp
        await interaction.reply({
          content: `An error occurred at ${timestamp} while trying to execute this command!`,
          ephemeral: true, // Visible only to the user who triggered the command
        });
      } catch (err) {
        // In case of an error while sending the error response, no additional action is taken
      }
    }
  },
};
