import { FC, useState } from "react"
import { Search } from "@illa-design/input"
import { componentContainerCss, sessionListContainerCss } from "./style"
import { SearchIcon } from "@illa-design/icon"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import { ComponentSession } from "./ComponentSession"
import { getMatchComponent } from "./utils"
import { Empty } from "./Empty"
import ColorPicker from "../ColorPicker"

const defaultList: ComponentSessionProps[] = [
  {
    title: "global",
    children: [
      { name: "container", icon: <SearchIcon />, itemType: 'container', },
      { name: "text", icon: <SearchIcon />, itemType: 'text', },
      { name: "frame", icon: <SearchIcon />, itemType: 'frame', },
      { name: "component 01 ", icon: <SearchIcon />, itemType: 'frame', },
      { name: "component 02", icon: <SearchIcon />, itemType: 'frame', },
      { name: "component 03", icon: <SearchIcon />, itemType: 'frame', },
    ],
  },
  {
    title: "Common",
    children: [
      { name: "component 01component 01component 01 ", icon: <SearchIcon />, itemType: 'frame', },
      { name: "component 02", icon: <SearchIcon />, itemType: 'frame', },
      { name: "component 03", icon: <SearchIcon />, itemType: 'frame', },
    ],
  },
  {
    title: "session3",
    children: [{ name: "aoao ", icon: <SearchIcon />, itemType: 'frame', }],
  },
]

export const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const { className, componentList = defaultList } = props

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  return (
    <div className={className} css={componentContainerCss}>
      <Search
        borderColor={"purple"}
        variant={"fill"}
        placeholder={"search"}
        radius={`20px`}
        onChange={(e) => {
          const res = getMatchComponent(e.target.value, componentList)
          setSearchRes(res)
        }}
        onSearch={(value) => {
          const res = getMatchComponent(value, componentList)
          setSearchRes(res)
        }}
      />
      <div css={sessionListContainerCss}>
        {searchRes && searchRes.length ? (
          searchRes.map((session) => <ComponentSession {...session} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
