import { useState } from "react"

export function useModal(){
    const [isOpen, setOpen] = useState(false)
    const handleModal= () => {
      setOpen(!isOpen)
  }

  return {isOpen, handleModal}
} 