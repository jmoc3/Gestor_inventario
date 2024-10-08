  import Toastify from 'toastify-js'

  type NotifyProps = {
    message:string,
    backgroundColor:string,
    color:string,
    extraStyles?:Record<string,string>,
    duration?:number
  }

  export default function Notify({message,backgroundColor,color,extraStyles,duration=2000}:NotifyProps){
    return Toastify({
      text: message,
      duration,
      style:{position:'absolute', left:'1rem' , backgroundColor , color ,padding:'1rem', borderRadius:'1rem', ...extraStyles}  
      }).showToast();
}