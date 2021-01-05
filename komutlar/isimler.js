const { dc, MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

  if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.member.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  

  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("2d3436").setFooter("Vader")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!member) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let data = datab.get(`isimlergösterme.${member.id}.toplama`);
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
    if(data === null) return message.channel.send (new MessageEmbed().setDescription(`**Kişiye ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(data === undefined) return message.channel.send (new MessageEmbed().setDescription(`**Kişiye ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
    let listedData = data.length > 0 ? data.map((v, index) => `\`${index + 1}.\` \n • **İsim:**  (\`${v.İsim} | ${v.Yas}\`) + • **KayıtNo:** \`(${v.KayıtNO})\` \n • **Yetkili:**  (${message.guild.members.cache.has(v.Yetkili) ? message.guild.members.cache.get(v.Yetkili) : "Bulunamadı."}) \n • **Cinsiyet** **(${v.Cinsiyet ? v.Cinsiyet : "Belirleniyor.."})** \n • **Zaman:**  (${v.Zaman}) \n ================= ` ): "Vader" ;
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`))};
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["detay", "names"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
}

