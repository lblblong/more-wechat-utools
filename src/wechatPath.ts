import * as path from "path"
import { canAccess } from "./util"

function darwinWeChatPath() {
  const wepath = "/Applications/WeChat.app/Contents/MacOS/WeChat"
  if (canAccess(wepath)) return wepath
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
}

function getStorageID() {
  return utools.getLocalId() + "wechat"
}

export function openSelectWechatPathDialog() {
  const paths = utools.showOpenDialog({
    title: "请选择微信启动文件",
    buttonLabel: "设置为微信多开启动文件",
    properties: ["openFile"],
  })
  if (!paths || paths.length === 0) throw Error("用户取消选择")
  return paths[0]
}

export function getWechatPath() {
  let wechatPath: string

  const it = utools.db.get<string>(getStorageID())
  if (it && it.data) {
    wechatPath = it.data
  } else if (process.platform === "win32") {
    wechatPath = win32WechatPath()
  } else if (process.platform === "darwin") {
    wechatPath = darwinWeChatPath()
  }

  if (!wechatPath) {
    const num = utools.showMessageBox({
      title: "提示",
      message:
        "系统未找到微信可执行文件，请手动进入微信安装目录设置微信启动文件。",
      type: "info",
      buttons: ["立即设置", "下次再说"],
    })
    if (num === 1) throw Error("用户取消选择")

    const p = openSelectWechatPathDialog()
    setWechatPath(p)
    wechatPath = p
  }

  return wechatPath
}

export function setWechatPath(path: string) {
  let it = utools.db.get<string>(getStorageID())
  if (!it) {
    it = {
      _id: getStorageID(),
      data: path,
    }
  } else {
    it.data = path
  }

  const { ok, error } = utools.db.put(it)
  if (ok) {
    utools.showNotification("设置成功")
  } else {
    utools.showNotification("设置失败")
    throw Error(error)
  }
}
