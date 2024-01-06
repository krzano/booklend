import Button, { ButtonProps } from "@/components/Button/Button"
import Box from "@mui/material/Box/Box"
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup"
import Tooltip from "@mui/material/Tooltip/Tooltip"
import { Link } from "react-router-dom"

type ActionButtonType =
  | {
      id: number
      icon: JSX.Element
      color?: ButtonProps["color"]
      label: string
      component: "button"
      onAsyncClick?: ButtonProps["onAsyncClick"]
      onClick?: ButtonProps["onClick"]
    }
  | {
      id: number
      icon: JSX.Element
      color?: ButtonProps["color"]
      label: string
      component: "link"
      to: string
    }

interface ActionButtonsProps {
  buttonList: ActionButtonType[]
  variant?: "outlined" | "contained" | "text"
}
const ActionButtons = ({
  buttonList,
  variant = "outlined",
}: ActionButtonsProps) => {
  return (
    <Box display={"inline-block"}>
      <ButtonGroup>
        {buttonList.map((item) => {
          const props =
            item.component === "link"
              ? {
                  component: Link,
                  to: item.to,
                }
              : {
                  onAsyncClick: item.onAsyncClick,
                  onClick: item.onClick,
                }
          return (
            <Tooltip arrow title={item.label} key={item.id}>
              <span>
                <Button color={item.color} variant={variant} {...props}>
                  {item.icon}
                </Button>
              </span>
            </Tooltip>
          )
        })}
      </ButtonGroup>
    </Box>
  )
}
export default ActionButtons
