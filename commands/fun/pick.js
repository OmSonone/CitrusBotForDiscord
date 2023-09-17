const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick')
        .setDescription('Let me pick for you')
        .addStringOption(option =>
            option.setName('choices')
                  .setDescription('Enter the choices')
                  .setRequired(true)),
    async execute(interaction) {
        // Extract the sentence
        const choices = interaction.options.getString('choices');

        // Split the sentence into an array of words
        const words = choices.split(' ');

        // Choose a random word
        const chosenWord = words[Math.floor(Math.random() * words.length)];

        await interaction.reply(chosenWord);
    },
};