module.exports = {
    config: {
        name: "createcollab",
        description: "Creates a new role and text channel group for a collaboration",
        usage: "<name>",
        category: "collaboration",
        accessableby: "Members",
        aliases: ["collab", "newcollab", "project"]
    },
    run: async (bot, message, args) => {
        message.delete();
        let name = args.slice(0).join("-").toLowerCase();
        let parent = message.channel.parent;

        message.channel.send(`Creating a collaboration channel with name: \`${name}\``).then(m => m.delete(5000));

        message.guild.createRole({
            name: name,
            permissions: []
        }).then(role => message.member.addRole(role));
        
        message.guild.createChannel(name, { type: 'text' }).then(chan => {
            chan.setParent(parent).then(chan2 => {
                chan2.overwritePermissions(message.guild.roles.find(role => role.name === "@everyone"), { 'READ_MESSAGES': false });
                chan2.overwritePermissions(message.guild.roles.find(role => role.name === name), {
                    'CREATE_INSTANT_INVITE': false, 'ADD_REACTIONS': true,
                    'READ_MESSAGES': true, 'SEND_MESSAGES': true,
                    'EMBED_LINKS': true, 'ATTACH_FILES': true,
                    'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true,
                    'EXTERNAL_EMOJIS': true,
                });
            });
        });

        message.channel.send("Created a new collaboration channel!").then(m => m.delete(5000));
    }
}