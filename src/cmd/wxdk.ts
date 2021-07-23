import { ListItem, Plugin } from "utools-helper"
import { TplFeatureMode } from "utools-helper/dist/template_plugin"
import { open } from "../util"
import { getWechatPath } from "../wechatPath"

const defaultMenus: ListItem<{ count: number }>[] = []
for (let i = 3; i <= 6; i++) {
  defaultMenus.push({
    title: `${i}个`,
    description: `打开 ${i} 个微信`,
    data: { count: i },
  })
}

export class Wxdk implements Plugin {
  code = "wxdk"
  mode: TplFeatureMode = "list"
  placeholder = "输入要打开微信的数量"

  enter() {
    return defaultMenus
  }

  search(keyword: string) {
    const count = Number(keyword)
    if (isNaN(count) || count === 0) {
      return defaultMenus
    } else {
      return [
        {
          title: `${count}个`,
          description: `打开 ${count} 个微信`,
          data: { count: count },
        },
      ]
    }
  }

  select(it: ListItem<{ count: number }>) {
    setTimeout(() => {
      try {
        open(getWechatPath(), it.data.count)
      } catch (err) {
      } finally {
        utools.outPlugin()
      }
    })
    utools.hideMainWindow()
  }
}
