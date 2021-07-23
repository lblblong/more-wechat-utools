import { Plugin } from "utools-helper"
import { Action, TplFeatureMode } from "utools-helper/dist/template_plugin"
import { openSelectWechatPathDialog, setWechatPath } from "../wechatPath"

export class SetWechatPath implements Plugin {
  code = "setWechatPath"
  mode: TplFeatureMode = "none"

  enter(action: Action) {
    setTimeout(() => {
      try {
        const payload = action.payload

        let filePath: string

        if (Array.isArray(payload) && payload.length > 0 && payload[0].isFile) {
          filePath = payload[0].path
        } else if (typeof payload === "string") {
          filePath = openSelectWechatPathDialog()
        }

        setWechatPath(filePath)
      } catch (err) {
      } finally {
        utools.outPlugin()
      }
    })
    utools.hideMainWindow()
  }
}
