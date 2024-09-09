import type { Credentials } from "@/src/types/types"

export const inputHandler = (e:React.ChangeEvent<HTMLInputElement>,credentials:Credentials, setCredentials:(userCredentials:Credentials)=>void) => {
  const input = e.target as HTMLInputElement

  const typeInput = input.name
  const textInput = input.value

  setCredentials({...credentials,[typeInput] : textInput})
}