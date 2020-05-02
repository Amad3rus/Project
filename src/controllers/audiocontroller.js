import Snackbar from "./snackbarcontroller";
import CreateEvent from "../utils/createEvents";

export default class AudioController extends CreateEvent{
    constructor(snackbarConfig){
        super();
        this.snackbarService = new Snackbar(snackbarConfig);
        this.activeAudio();
    }

    async activeAudio(){
        try{
            this.streaming = await navigator.mediaDevices.getUserMedia({audio:true});
            let audio = new Audio();
            audio.srcObject = new MediaStream(this.streaming);
            audio.play();
            this.trigger('play', audio);
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