import { InitPlugins } from "utools-helper"
import { SetWechatPath } from "./cmd/setWechatPath"
import { Wxdk } from "./cmd/wxdk"
import { Wxsk } from "./cmd/wxsk"

try {
  InitPlugins([new Wxdk(), new Wxsk(), new SetWechatPath()])
} catch (error) {
  alert(error.stack ? error.stack : error)
}
