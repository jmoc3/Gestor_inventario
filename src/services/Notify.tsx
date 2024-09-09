import Toastify from 'toastify-js'

type NotifyProps = {
  message:string,
  backgroundColor:string,
  color:string,
  extraStyles?:Record<string,string>
}

export default function Notify({message,backgroundColor,color,extraStyles}:NotifyProps){
  return Toastify({
    text: message,
    duration: 2000,
    style:{position:'absolute', left:'1rem' , backgroundColor , color ,padding:'1rem', borderRadius:'1rem', ...extraStyles}  
    }).showToast();
}