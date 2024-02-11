const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomstarboard')
        .setDescription('Fetches a random message from the starboard channel'),
    async execute(interaction) {
        try {
            const botId = process.env.STARBOARD_BOT_ID;

            const starboardChannel = interaction.guild.channels.cache.find(channel => channel.name === 'starboard' || channel.id === process.env.STARBOARD_CHANNEL_ID);
            if (!starboardChannel || !starboardChannel.name) {
                return await interaction.reply({ content: 'Starboard channel not found.', ephemeral: true });
            }

            const messages = await starboardChannel.messages.fetch({ limit:  100 });
            const botMessages = messages.filter(msg => msg.author.id === botId);

            if (botMessages.size > 0) {
                const randomIndex = Math.floor(Math.random() * botMessages.size);
                const randomMessage = Array.from(botMessages.values())[randomIndex];

                await interaction.reply({
                    content: `Random starboard message: ${randomMessage}`,
                    embeds: randomMessage.embeds,
                });
            } else {
                await interaction.reply({ content: 'No starboard messages found.', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching starboard messages.', ephemeral: true });
        }
    },
};