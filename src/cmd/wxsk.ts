import { Plugin } from "utools-helper"
import { TplFeatureMode } from "utools-helper/dist/template_plugin"
import { open } from "../util"
import { getWechatPath } from "../wechatPath"

export class Wxsk implements Plugin {
  code = "wxsk"
  mode: TplFeatureMode = "none"

  enter() {
    setTimeout(() => {
      try {
        open(getWechatPath(), 2)
      } catch (err) {
      } finally {
        utools.outPlugin()
      }
    })
    utools.hideMainWindow()
  }
}
