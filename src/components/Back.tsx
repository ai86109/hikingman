import { Flex } from "@chakra-ui/react";
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate()

  return (
    <Flex bg="green" h="32px" justifyContent="flex-start" position="absolute" top="5px">
      <ChevronLeftIcon w={30} h={30} ml={2} onClick={() => navigate('/')} cursor="pointer" />
    </Flex>
  )
}