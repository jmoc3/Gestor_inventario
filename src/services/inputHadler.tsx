import type { Credentials } from "@/src/types/types"

export const inputHandler = (e:React.ChangeEvent<HTMLInputElement>,credentials:Credentials, setter:(userCredentials:Credentials)=>void) => {
  const input = e.target as HTMLInputElement

  const typeInput = input.name
  const textInput = input.value

  setter({...credentials,[typeInput] : textInput})
}