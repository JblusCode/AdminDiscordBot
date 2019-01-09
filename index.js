const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "YOUR_PREFIX";

client.login('YOUR_TOKEN');

client.on("ready", () => {
	console.log("[JblusCode] -> You have Enable");
	client.user.setGame("YOUR_SETGAME");
});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You do not have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("I can not exclude this user :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** was excluded :white_check_mark:')
    }
});
 
/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You do not have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("I can not ban this user :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** was ban :white_check_mark:')
    }
});

/*mute*/
client.on('message',message =>{
     if (!message.guild) return
        let args = message.content.trim().split(/ +/g)

        if (message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission to use this command");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Please mention a user !");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            message.channel.send("No users find on themselves !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I'm not allowed :(");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} is mute`);
        })
    }
});

/*clear*/
client.on('message',message => {
    if (!message.guild) return
        let args = message.content.trim().split(/ +/g)

    if (message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have permission to use this command");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("You must specify the message !")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} we were deleted !`);
            })
    }
});

