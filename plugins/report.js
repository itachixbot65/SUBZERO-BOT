// TO ALL SUBZERO BOT CLONERS
// THATS WHY I ADD HARD ENC BECOZ YOU DONT ASK FOR PERMISSION 
// F*CK YOU IF YOU ARE THAT KIND, MR FRANK

const { cmd } = require('../command');
const config = require('../config');

// Developer's WhatsApp number
const MRFRANK = ''; // Replace with your number

cmd({
    pattern: 'report',
    alias: ['bug', 'feedback'],
    react: '📬',
    desc: 'Send a report to the developer.',
    category: 'misc',
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
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
    try {
        // Extract the report message (everything after ".report")
        const reportMessage = body.replace('.report', '').trim();

        if (!reportMessage) {
            return reply('Please provide a report message.\n\n Example: `.report` My bot is not downloading Songs');
        }

        // Format the report
        const formattedReport = `🚨 *New Hussain Report* 🚨\n\n` +
                               `*👤 From:* ${sender.split('@')[0]}\n` +
                               `*👥 Group:* ${isGroup ? 'Yes' : 'No'}\n` +
                               `*📩 Message:* ${reportMessage}`;

        // Send the report to the developer with an image
        await conn.sendMessage(MRFRANK, {
            image: { url: 'https://i.imgur.com/XejU7Lq.jpeg' }, // Image URL
            caption: formattedReport,
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
        });

        // Notify the user with an image
        await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/0Rkto3u.jpeg' }, // Image URL
            caption: 'Your report has been sent to the developer. Thank you!✅',
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

    } catch (error) {
        console.error('Error in report command:', error);
        reply('An error occurred while sending your report. Please try again later.');
    }
});
