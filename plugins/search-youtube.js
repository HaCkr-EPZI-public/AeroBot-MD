import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, {conn, text }) => {
  if (!text) throw 'مثال: \n.yts lferda'
  //await conn.reply(m.chat, global.wait, m)
    await m.react(rwait)
  let results = await yts(text)
  let res = []
  for (let pus of results.all) {
  res.push({
        title: pus.title,
        rows: [{
                title: "Download video",
                description: pus.title,
                id: ".play " + pus.url,
            },
        ],
    })
  }
  const list = {
    title: "اضغط هنا !",
    sections: [...res],
};

 return conn.sendListButton(m.chat, '乂  *Y T  Search*\n\nChoose from this list', list, wm, '[]', m)
 
}

handler.help = ['yts', 'ytsearch']
handler.tags = ['search']
handler.command = /^yts(earch)?$/i

export default handler