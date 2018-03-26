/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
export default function (url) {
    return new Promise((resolve, reject) => {    
        if(!document) {
            reject(new Error("loadScript function cannot be used on server side!"));
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.onload = () => {
            resolve(script);
        };
        script.onerror = (msg) => {
            reject(new Error(msg));
        }
        document.head.appendChild(script);        
    });
}