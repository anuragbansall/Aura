import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { generateContent } from "./ai.js";

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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const response = await generateContent(message.content);

    if (response.length > 2000) {
      throw new Error("Response exceeds Discord's message limit.");
    }

    message.reply(response);
  } catch (error) {
    console.error("Error generating content:", error);
    message.reply(error.message || "Sorry, something went wrong.");
  }
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
