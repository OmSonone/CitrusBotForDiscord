const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Replies with a cat!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_API_KEY}`)
                .then(respone => respone.json())
                .then((data) => {
                    interaction.editReply({ content: `${data[0].url}` });
                });
        } catch (err) {
            console.log(err);
            await interaction.reply({ content: 'command failed', ephemeral: true });
        }
    },
};