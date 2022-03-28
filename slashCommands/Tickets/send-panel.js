module.exports = {
    name: "send-panel",
    usage: '/send-panel <channel>',
    options: [
        {
            name: 'channel',
            description: 'Channel to send ticket panel!',
            type: 'CHANNEL',
            channelTypes: ["GUILD_TEXT"],
            permission: false // Can not use the slash command
        }
    ],
    category: "Tickets",
    description: "Send ticket panel to specific channel!",
    permission: ["ADMINISTRATOR"],
    ownerOnly: true,
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        const row = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageButton()
            .setStyle("DANGER")
            .setLabel('Support')
            .setEmoji("952041245910396968")
            .setCustomId("create-ticket")
        );

        const embed = new client.discord.MessageEmbed()
        .setTitle("Open a Support Ticket!")
        .setDescription("<:channel:942191114935492619> If you are experiencing a bug and need assistance troubleshooting the issue, our team is dedicated to providing a solution. Simply click the button below.\n\n<:channel:942191114935492619> If you have witnessed someone covertly breaking our Server Rules, our team is dedicated to providing a safe environment. Simply click the button below.\n\n<:CircleRed:957390667573764206> Please understand that our staff is comprised of volunteers and that it could, in extreme cases, take up to 24-hours to respond. ")
        .setColor('#ED4245')
        .setThumbnail('https://cdn.discordapp.com/attachments/939720531492605963/958108053700493353/lofi-wumpus_copy.png')
        .setAuthor({ name: 'Wampas Support', iconURL: 'https://cdn.discordapp.com/attachments/939720531492605963/958108053700493353/lofi-wumpus_copy.png', url: 'https://discord.com/channels/93972055' })
        .setImage('https://cdn.discordapp.com/attachments/939720531492605963/957397966405140561/wampashelps.png')
        .setFooter({ text: 'Wampas™ • Ticket Tool', iconURL: 'https://cdn.discordapp.com/attachments/939720531492605963/958108053700493353/lofi-wumpus_copy.png' })

        interaction.reply({ content: `Ticket panel success send to ${channel}!`, ephemeral: true });
        return channel.send({ embeds: [embed], components: [row] });
    }
}