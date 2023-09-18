const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('howgay')
        .setDescription('How gay are you?'),
    async execute(interaction) {
        const percentage = Math.floor(Math.random() * 101);
        await interaction.reply(`You are ${percentage}% gay!`);
    },
};