const fs = require("fs")
const path = require("path")

function canAccess(file) {
  if (!file) return false
  try {
    fs.accessSync(file)
    return true
  } catch (e) {
    return false
  }
}

function win32WechatPath() {
  const suffix = `${path.sep}Tencent${path.sep}WeChat${path.sep}WeChat.exe`
  const prefixes = [
    process.env.LOCALAPPDATA,
    process.env.PROGRAMFILES,
    process.env["PROGRAMFILES(X86)"],
  ].filter(Boolean)
  for (const prefix of prefixes) {
    const wepath = path.join(prefix, suffix)
    if (canAccess(wepath)) return wepath
  }
  window.utools.showNotification("未找到微信启动文件")
  throw Error("未找到微信启动文件")
}

let wechatPath = win32WechatPath()

function openWechat(count) {
  for (let i = 0; i < count; i++) {
    window.utools.shellOpenItem(wechatPath)
  }
}

window.exports = {
  wxsk: {
    mode: "none",
    args: {
      enter: (action) => {
        openWechat(2)
      },
    },
  },
  wxdk: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        const result = []
        for (let i = 3; i <= 6; i++) {
          result.push({
            title: `${i}个`,
            description: `打开 ${i} 个微信`,
            count: i,
          })
        }
        callbackSetList(result)
      },
      search: (action, searchWord, callbackSetList) => {
        const count = Number(searchWord)
        if (isNaN(count) || count === 0) return

        callbackSetList([
          {
            title: `${count}个`,
            description: `打开 ${count} 个微信`,
            count: count,
          },
        ])
      },
      select: (action, it, callbackSetList) => {
        openWechat(it.count)
        window.utools.outPlugin()
      },
      placeholder: "输入要打开微信的数量",
    },
  },
}
