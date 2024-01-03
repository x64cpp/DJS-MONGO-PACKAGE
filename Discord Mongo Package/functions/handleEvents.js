// Export of a function that manages events for the Discord client
module.exports = (client) => {
  // Function to handle events asynchronously
  client.handleEvents = async (eventFiles) => {
    let eventsCount = 0; // Initialize a counter for loaded events

    // Display a message indicating events loading in yellow color
    console.log("\x1b[33m⏳ Loading events...\x1b[0m");

    // Loop through all provided event files
    for (const file of eventFiles) {
      // Import the event from the specified folder
      const event = require(`../events/${file}`);

      // Increment the events count
      eventsCount++;

      // Check if the event should trigger only once
      if (event.once) {
        // If the event should trigger only once, use client.once to listen to it
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        // Otherwise, use client.on to listen to the event
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }

    // Display the count of loaded events in green color
    console.log(`\x1b[32m✅ Loaded ${eventsCount} events\x1b[0m`);
  };
};
