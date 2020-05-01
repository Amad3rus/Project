import Snackbar from "./snackbarcontroller";

export default class AudioController {
    constructor(snackbarConfig){
        this.audio = new Audio();
        this.streaming;
        this.snackbarService = new Snackbar(snackbarConfig);
    }

    async activeAudio(){
        try{
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});
            this.streaming = stream;
            this.audio.srcObject = new MediaStream(stream);
            this.audio.play();
        }catch(e){
            console.error(e);
            this.snackbarService.callNotification('offline', 'Não foi possível gravar seu audio', '&times;');
        }
    }

    stopAudio(){
        this.streaming.getTracks()
            .forEach(track => track.stop());
    }
}   