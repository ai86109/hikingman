import { SystemCSSProperties, Td } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function TdContainer({ 
  children,
  style
} : { 
  children: ReactNode,
  style?: SystemCSSProperties
}) {
  return (
    <Td sx={{...style}}>{children}</Td>
  )
}