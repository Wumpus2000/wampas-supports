const {CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Generate a custom embed!",
    options: [
        {
            name: "generate",
            description: "Generate a custom embed!.",
            type: "SUB_COMMAND",
            options: [
                { name: "colour", description: "Provide a colour for the embed.", type: "STRING"},
                { name: "title", description: "Provide a title for the embed.", type: "STRING"},
                { name: "url", description: "Provide a url for the embed.", type: "STRING"},
                { name: "description", description: "Provide a description for the embed.", type: "STRING"},
                { name: "thumbnail", description: "Provide a thumbnail for the embed.", type: "STRING"},
                { name: "image", description: "Provide an image for the embed.", type: "STRING"},
                { name: "timestamp", description: "Enable timestamp?", type: "BOOLEAN"},
                { name: "fields", description: "name^value^inline (true or false)^^", type: "STRING" }
            ]
        },
        {
            name: "help",
            description: "Tutorial on how to use /embed generate.",
            type: "SUB_COMMAND"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
     run: async (client, interaction) => {
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
                const eFields     = [[], [], []];
                const splitFields = [];

                
                const colour      = options.getString("colour");
                const title       = options.getString("title");
                const url         = options.getString("url");
                const description = options.getString("description");
                const thumbnail   = options.getString("thumbnail");
                const image       = options.getString("image");
                const timestamp   = options.getBoolean("timestamp");
                let   fields      = options.getString("fields");

                const embed       = new MessageEmbed();

                if(url && url.includes("http"))             embed.setURL(url);
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(thumbnail);
                if(image && image.includes("http"))         embed.setImage(image);
                if(colour)                                  embed.setColor(colour.toUpperCase());
                if(title)                                   embed.setTitle(title);
                if(description)                             embed.setDescription(description);
                if(timestamp)                               embed.setTimestamp();
                if(fields) {
                    fields = fields.split("^");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        
                    for (let i = 0; i < eFields[0].length; i++) {
                        embed.addField(`${eFields[0][i]}`, `${eFields[1][i]}`, JSON.parse(eFields[2][i].toLowerCase()));
                    }
                }

                if(!embed.title && !embed.description && !embed.fields[0]) {
                    embed.setDescription("You have not provided valid options!")
                }
                interaction.reply({embeds: [embed]});
            break;
            case "help":
                const help = new MessageEmbed()
                    .setTitle("/Embed Help")
                    .setColor("GREEN")
                    .setDescription("To send an embed you must provide at least a title, a description or a field.\n\nMost of the commands are fairly self explanitory except the fields command.\nIn order to send fields you must follow the following format:\n\n`name^value^inline^^`\n\nFor example, sending `Name^Wumpus^True^^ Age^17^True^^ Interests^Airsoft, Gaming and Coding^False^^` would send:")
                    .addFields(
                        {name: "Name", value: "Wumpus", inline: true},
                        {name: "Age", value: "17", inline: true},
                        {name: "Interests", value: "designing, Gaming, Coding, 3d editor, montages editor, thumbnail editor, etc lol ", inline: false}
                    )    
                interaction.reply({embeds: [help]})
            break;
        }
    }
}