/*╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺
    ⭐ＰＲＯＪＥＣＴ ＮＡＭＥ:
    ＳＵＢＺＥＲＯ ＷＨＡＴＳＡＰＰ ＭＤ ＢＯＴ
    
    ⭐ＤＥＶＥＬＯＰＥＲ
     ＭＲ ＦＲＡＮＫ 
     
    ⭐ ＭＹ ＴＥＡＭ
     ＸＥＲＯ ＣＯＤＥＲＳ
     
    ⭐ ＯＵＲ ＷＥＢＳＩＴＥ
     https://github.com/ZwSyntax/SUBZERO-MD

© ＴＲＹ ＤＥＣＲＹＰＴＩＮＧ ＩＦ ＹＯＵ ＣＡＮ⚠

╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺*/



const {
  cmd,
  commands
} = require('../command');
const axios = require('axios');

cmd({
  pattern: 'imgsearch2',
  alias: ['img2','pin2','image2'],
  react: '🔍',
  desc: 'Search for images on Google',
  category: 'image',
  filename: __filename
}, async (conn, mek, m, {
  body,
  from,
  quoted,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
    const text = body.trim().replace(command, '').trim();
    if (!text) {
        return reply(`*Usage:* ${command} <query>\n\n*Example:* ${command} cat`);
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiResponse = await axios.get(`https://apis.davidcyriltech.my.id/googleimage`, {
            params: { query: text }
        });

        const { success, results } = apiResponse.data;

        if (!success || !results || results.length === 0) {
            return reply(`❌ No images found for "${text}". Try another search.`);
        }

        const maxImages = Math.min(results.length, 5);
        for (let i = 0; i < maxImages; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: results[i] },
                caption: `📷 *Image Search*\n\n🔎 *Query:* "${text}"\n📄 *Result:* ${i + 1}/${maxImages}\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ 𝗠𝗥_𝗛𝗨𝗦𝗦𝗔𝗜𝗡 *`,
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        console.error("Error in Image Search:", error);
        reply(`❌ *Error fetching images. Try again later.*`);
    }
});


//########
cmd({
  'pattern': "img",
  'alias': ["image", "pinterest", "pinimg"],
  'react': '🖼️',
  'desc': "Search and download images from Pinterest using keywords.",
  'category': "image",
  'use': ".img <keywords>",
  'filename': __filename
}, async (_0x1a9409, _0x59fdb9, _0x3f150e, {
  from: _0x163393,
  args: _0x12b1f7,
  reply: _0x2ac5cb
}) => {
  try {
    const _0x3207b0 = _0x12b1f7.join(" ");
    if (!_0x3207b0) {
      return _0x2ac5cb("*Please provide search keywords for the image. Eg Subzero*");
    }
    _0x2ac5cb("*🔍 Showing Results For - " + _0x3207b0 + "...*");
    const _0x2f5556 = 'https://rubenbot-subzero-api.hf.space/download/piniimg?text=' + encodeURIComponent(_0x3207b0);
    const _0x530cac = await axios.get(_0x2f5556);
    if (!_0x530cac.data || !_0x530cac.data.result || _0x530cac.data.result.length === 0x0) {
      return _0x2ac5cb("❌ No images found for \"" + _0x3207b0 + "\".");
    }
    const _0x82a454 = _0x530cac.data.result;
    for (let _0xecb4cf = 0x0; _0xecb4cf < Math.min(_0x82a454.length, 0x5); _0xecb4cf++) {
      const _0x58b5b7 = _0x82a454[_0xecb4cf];
      if (_0x58b5b7.images_url) {
        await _0x1a9409.sendMessage(_0x163393, {
          'image': {
            'url': _0x58b5b7.images_url
          },
          'caption': "*© Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ SᴜʙZᴇʀᴏ*" 
        }, {
          'quoted': _0x59fdb9
        });
      }
    }
    if (_0x82a454.every(_0x45deb7 => !_0x45deb7.images_url)) {
      _0x2ac5cb("❌ No valid image URLs found in the results.");
    }
  } catch (_0x422b47) {
    console.error(_0x422b47);
    _0x2ac5cb("❌ An error occurred while processing your request.");
  }
});

/*const { cmd } = require('../command');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI'; // Replace with your Google API key
const GOOGLE_CX = 'baf9bdb0c631236e5'; // Replace with your Google Custom Search Engine ID
//const apiKey = "AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI"; // Votre clé API Google
// const cx = "baf9bdb0c631236e5"; /
cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "media",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
*💗 Image ${i + 1} from your search! 💗*

 *©  ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ! 👾*

> ❄️ SUBZERO BOT ❄️`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
*/
