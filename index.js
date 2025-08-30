import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  message.reply(
    "Sorry, I didn't understand that. I am still under development."
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else {
    await interaction.reply("Sorry, I didn't understand that.");
  }
});

client.login(process.env.BOT_TOKEN);
