//Packages needed
const { Client } = require("discord.js");
const keepAlive = require('./server.js');
const client = new Client({
  disableEveryone: true
});

//Keep alive & Login into the bot
keepAlive();
client.login(process.env.TOKEN);

//Requirements
const discord = require("discord.js");
const { prefix, ServerID } = require("./config.json")
const config = require('./config.json');

//Client Ready
client.on("ready", () => {
  //Console config message
  console.log('\x1b[32m%s\x1b[0m', '[SERVER] Server.js is Ready!');
  console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
  console.log('\x1b[33m%s\x1b[0m', '[CLIENT] Connecting to the bot...');
  console.log('\x1b[32m%s\x1b[0m', '[CLIENT] Bot is Ready!');
  console.log('\x1b[32m%s\x1b[0m', `[CLIENT] Client Name: ${client.user.tag}`);
  console.log('\x1b[32m%s\x1b[0m', `[CLIENT] Client ID: ${client.user.id}`);
  console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
  console.log('\x1b[36m%s\x1b[0m', '[SERVER] NOTE: Your bot can shut down in any time if you close this replit project!');
  console.log('\x1b[36m%s\x1b[0m', '[SERVER] Make sure to host the bot on https://uptimerobot.com');
  console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
  console.log('\x1b[31m%s\x1b[0m','[HELP] Make sure to read the SETUP.md file for the complete bot setup, or ask help in T.F.A support server!')
  console.log('\x1b[32m%s\x1b[0m', '[MODMAIL] Client is online. Check your bot.');
  //Status bot  
  client.user.setActivity("Me mande, uma mensagem", { type: "PLAYING" })
})

//Console Design

//Code
client.on("channelDelete", (channel) => {
    if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if (!person) return;

        let yembed = new discord.MessageEmbed()
            .setAuthor("Conversa Fechada!", client.user.displayAvatarURL())
            .setColor('7800FF')
            .setDescription(":x: Por favor, não responda a esta mensagem até precisar de mais ajuda!")
        return person.send(yembed)

    }


})


client.on("message", async message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();


    if (message.guild) {

        if (command == "mod-mail") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(":x: Você precisa da permissão adminstrador para criar o setup")
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(":x: Bot precisa de permissões de administrador para configurar o sistema modmail!")
            }


            let role = message.guild.roles.cache.find((x) => x.name == "Bots Sales")
            let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

            if (!role) {
                role = await message.guild.roles.create({
                    data: {
                        name: "ModMail",
                        color: "7800FF"
                    },
                    reason: ":x: Role needed for ModMail System!"
                })
            }

            await message.guild.channels.create("MODMAIL", {
                type: "category",
                topic: "All the mail will be here",
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            })


            return message.channel.send("✅ Setup is Completed!")

        } else if (command == "close") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.roles.cache.find((x) => x.name == "・Donos")) {
                return message.channel.send(":x: You need Staff role to use this command!")
            }
            if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {

                const person = message.guild.members.cache.get(message.channel.name)

                if (!person) {
                    return message.channel.send(":x: Não consigo fechar o canal e este erro está ocorrendo porque provavelmente o nome do canal foi alterado.\n```Error: {}```")
                }

                await message.channel.delete()

                let yembed = new discord.MessageEmbed()
                    .setAuthor("Conversa finalizada com sucesso!", client.user.displayAvatarURL())
                    .setColor("7800FF")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter("Mail is closed by " + message.author.username)
                if (args[0]) yembed.setDescription(`Reason: ${args.join(" ")}`)

                return person.send(yembed)

            }
        } else if (command == "open") {
            if (!message.content.startsWith(prefix)) return;
            const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

            if (!category) {
                return message.channel.send(":x: Modmail system is not setuped in this server, use " + prefix + "setup")
            }

            if (!message.member.roles.cache.find((x) => x.name == "・Donos")) {
                return message.channel.send(":x: You need `Staff` role to use this command!")
            }

            if (isNaN(args[0]) || !args.length) {
                return message.channel.send(":x: Please Give the ID of the person!")
            }

            const target = message.guild.members.cache.find((x) => x.id === args[0])

            if (!target) {
                return message.channel.send(":x: Unable to find this person!")
            }


            const channel = await message.guild.channels.create(target.id, {
                type: "text",
                parent: category.id,
                topic: "Mail is Direct Opened by **" + message.author.username + "** to make contact with " + message.author.tag
            })

            let nembed = new discord.MessageEmbed()
                .setAuthor("DETAILS", target.user.displayAvatarURL({ dynamic: true }))
                .setColor("7800FF")
                .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("Name", target.user.username)
                .addField("Account Creation Date", target.user.createdAt)
                .addField("Direct Contact", "Yes (it means this mail is opened by a Staff)");

            channel.send(nembed)

            let uembed = new discord.MessageEmbed()
                .setAuthor("DIRECT MAIL OPENED")
                .setColor("7800FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("You have been contacted by Staff of **" + message.guild.name + "**, Please wait until he send another message to you!");


            target.send(uembed);

            let newEmbed = new discord.MessageEmbed()
                .setDescription("Opened The Mail: <#" + channel + ">")
                .setColor("7800FF");

            return message.channel.send(newEmbed);
        } else if (command == "help") {
            if (!message.content.startsWith(prefix)) return;
            let embed = new discord.MessageEmbed()
              .setColor("7800FF")
                .setAuthor('Skyline Modmail!') 
                .addField("Setup", "``[Crie o canal de atendimento do bot]``", true)

                .addField("Open", '``[Permitir que você abra o e-mail para entrar em contato com qualquer pessoa com seu ID]``', true)
                .setThumbnail(client.user.displayAvatarURL())
                .addField("Close", "``[Feche o ticket em que voce esta conversando]``", true);

            return message.channel.send(embed)

        }
    }







    if (message.channel.parentID) {

        const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

        if (message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)

            if (!member) return message.channel.send('Não foi possível enviar mensagem!')

            let lembed = new discord.MessageEmbed()
                .setColor("7800FF")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)

            return member.send(lembed)
        }


    }

    if (!message.guild) {
        const guild = await client.guilds.cache.get(ServerID) || await client.guilds.fetch(ServerID).catch(m => { })
        if (!guild) return;
        const category = guild.channels.cache.find((x) => x.name == "MODMAIL")
        if (!category) return;
        const main = guild.channels.cache.find((x) => x.name == message.author.id)


        if (!main) {
            let mx = await guild.channels.create(message.author.id, {
                type: "text",
                parent: category.id,
                topic: "This mail is created for helping  **" + message.author.tag + " **"
            })

            let sembed = new discord.MessageEmbed()
                .setAuthor("Conversa inciada!")
                .setColor("7800FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("Você acaba de abrir um ticket via privado aguarde algum staff do servidor aparecer no seu ticket para te atender! Lembre-se continue aqui pois no servidor nada foi criado a conversa sera pelo privado.")

            message.author.send(sembed)


            let eembed = new discord.MessageEmbed()
                .setAuthor("DETAILS", message.author.displayAvatarURL({ dynamic: true }))
                .setColor("7800FF")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("Name", message.author.username)
                .addField("Data de criação da conta", message.author.createdAt)
                .addField("Criado Por kaz#2448", "[Entre no servidor de suporte!](https://discord.gg/MmKDNtHK)")


            return mx.send(eembed)
        }

        let xembed = new discord.MessageEmbed()
            .setColor("7800FF")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)


        main.send(xembed)

    }




})

//Make sure to login to the bot:
client.login(process.env.TOKEN)
