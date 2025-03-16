const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "mediafire",
  alias: ["mfire", "mfdownload"],
  react: '📥',
  desc: "Download files from MediaFire.",
  category: "download",
  use: ".mediafire <MediaFire URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided a MediaFire URL
    const mediafireUrl = args[0];
    if (!mediafireUrl || !mediafireUrl.includes("mediafire.com")) {
      return reply('Please provide a valid MediaFire URL. Example: `.mediafire https://mediafire.com/...`');
    }

    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the Velyn API URL
    const apiUrl = `https://velyn.vercel.app/api/downloader/mediafire?url=${encodeURIComponent(mediafireUrl)}`;

    // Call the Velyn API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.data) {
      return reply('❌ Unable to fetch the file. Please check the URL and try again.');
    }

    // Extract the file details
    const { filename, size, mimetype, link } = response.data.data;

    // Inform the user that the file is being downloaded
    await reply(`📥 *Downloading ${filename} (${size})... Please wait.*`);

    // Download the file
    const fileResponse = await axios.get(link, { responseType: 'arraybuffer' });
    if (!fileResponse.data) {
      return reply('❌ Failed to download the file. Please try again later.');
    }

    // Prepare the file buffer
    const fileBuffer = Buffer.from(fileResponse.data, 'binary');

    // Send the file based on its MIME type
    if (mimetype.startsWith('image')) {
      // Send as image
      await conn.sendMessage(from, {
        image: fileBuffer,
        caption: `📥 *File Details*\n\n` +
          `🔖 *Name*: ${filename}\n` +
          `📏 *Size*: ${size}\n\n` +
          `> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '',
            newsletterName: '『 𝗠𝗥_𝗛𝗨𝗦𝗦𝗔𝗜𝗡 』',
            serverMessageId: 143
          }
        }
      }, { quoted: mek });
    } else if (mimetype.startsWith('video')) {
      // Send as video
      await conn.sendMessage(from, {
        video: fileBuffer,
        caption: `📥 *File Details*\n\n` +
          `🔖 *Name*: ${filename}\n` +
          `📏 *Size*: ${size}\n\n` +
          `> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ Hᴜssᴀɪɴ`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '',
            newsletterName: '『 𝗠𝗥_𝗛𝗨𝗦𝗦𝗔𝗜𝗡 』',
            serverMessageId: 143
          }
        }
      }, { quoted: mek });
    } else {
      // Send as document
      await conn.sendMessage(from, {
        document: fileBuffer,
        mimetype: mimetype,
        fileName: filename,
        caption: `📥 *File Details*\n\n` +
          `🔖 *Name*: ${filename}\n` +
          `📏 *Size*: ${size}\n\n` +
          `> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363304325601080@newsletter',
            newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
            serverMessageId: 143
          }
        }
      }, { quoted: mek });
    }

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading file:', error);
    reply('❌ Unable to download the file. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
