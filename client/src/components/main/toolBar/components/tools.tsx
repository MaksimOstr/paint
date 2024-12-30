import BrushIcon from "@mui/icons-material/Brush";
import { EraserIcon } from "./EraserIcon";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import ChangeHistorySharpIcon from "@mui/icons-material/ChangeHistorySharp";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import { DiagonalLineIcon } from "./DiagonalLineIcon";


export const tools = [
    { id: "brush", icon: <BrushIcon fontSize="large" />, tooltip: "Brush" },
    { id: "eraser", icon: <EraserIcon />, tooltip: "Eraser" },
    { id: "square", icon: <CheckBoxOutlineBlankSharpIcon fontSize="medium" />, tooltip: "Square" },
    { id: "rect", icon: <RectangleOutlinedIcon fontSize="medium" />, tooltip: "Rectangle" },
    { id: "circle", icon: <RadioButtonUncheckedSharpIcon fontSize="medium" />, tooltip: "Circle" },
    { id: "triangle", icon: <ChangeHistorySharpIcon fontSize="medium" />, tooltip: "Triangle" },
    { id: "line", icon: <DiagonalLineIcon/>, tooltip: "Line" }
  ];

