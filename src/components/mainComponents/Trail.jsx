import { useEffect } from "react"
import { AdvancedImage } from '@cloudinary/react';
import {Cloudinary} from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';


export const cloud = new Cloudinary({cloud: {cloudName: 'dlxyklog8'}});

export function Trial(){
    const [image, setImage] = useState()
    useEffect(()=>{
           
            const img = cloud.image('cld-sample-5')
            .format('auto') 
            .quality('auto')
            .resize(auto().gravity(autoGravity()).width(500).height(500)); 
            setImage(img)
        },[])
    
  
        return (<AdvancedImage cldImg={image}/>);
}