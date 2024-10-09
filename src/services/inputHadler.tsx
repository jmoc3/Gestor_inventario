import type { Credentials } from "@/src/types/types"

export const inputHandler = (e:React.ChangeEvent<HTMLInputElement>,credentials:Credentials, setter:(userCredentials:Credentials)=>void) => {
  const input = e.target as HTMLInputElement
  let text

  const typeInput = input.name
  if (isNaN(+input.value)) text = input.value
  else text = +input.value

  setter({...credentials,[typeInput] : text})
}