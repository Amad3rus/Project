import { ReaderDom } from '../../app';
import ChatComponent from './chat-component.html';
import AudioService from '../../services/audio-service';
import Format from '../../utils/format';
import { Emojis } from '../../utils/emoji';
import SnackbarService from '../../services/snackbar-service';
import CameraService from '../../services/camera-service';
import CarouselService from '../../services/carousel-service';
import DocumentService from '../../services/document-service';
import RenderView from '../../services/renderView';
import Messages from '../../services/messages';
import Validation from '../../services/validations';


export default class Chat extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(ChatComponent));
        this.rs = new RenderView();
        this.ms = new Messages();
        this.vs = new Validation();

        this.el = {};
        this.backgroundDoodles = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150' viewBox='0 0 1600 800'%3E%3Cpath fill='%23FF7' d='M1102.5 734.8c2.5-1.2 24.8-8.6 25.6-7.5.5.7-3.9 23.8-4.6 24.5C1123.3 752.1 1107.5 739.5 1102.5 734.8zM1226.3 229.1c0-.1-4.9-9.4-7-14.2-.1-.3-.3-1.1-.4-1.6-.1-.4-.3-.7-.6-.9-.3-.2-.6-.1-.8.1l-13.1 12.3c0 0 0 0 0 0-.2.2-.3.5-.4.8 0 .3 0 .7.2 1 .1.1 1.4 2.5 2.1 3.6 2.4 3.7 6.5 12.1 6.5 12.2.2.3.4.5.7.6.3 0 .5-.1.7-.3 0 0 1.8-2.5 2.7-3.6 1.5-1.6 3-3.2 4.6-4.7 1.2-1.2 1.6-1.4 2.1-1.6.5-.3 1.1-.5 2.5-1.9C1226.5 230.4 1226.6 229.6 1226.3 229.1zM33 770.3C33 770.3 33 770.3 33 770.3c0-.7-.5-1.2-1.2-1.2-.1 0-.3 0-.4.1-1.6.2-14.3.1-22.2 0-.3 0-.6.1-.9.4-.2.2-.4.5-.4.9 0 .2 0 4.9.1 5.9l.4 13.6c0 .3.2.6.4.9.2.2.5.3.8.3 0 0 .1 0 .1 0 7.3-.7 14.7-.9 22-.6.3 0 .7-.1.9-.3.2-.2.4-.6.4-.9C32.9 783.3 32.9 776.2 33 770.3z'/%3E%3Cpath fill='%235ff' d='M171.1 383.4c1.3-2.5 14.3-22 15.6-21.6.8.3 11.5 21.2 11.5 22.1C198.1 384.2 177.9 384 171.1 383.4zM596.4 711.8c-.1-.1-6.7-8.2-9.7-12.5-.2-.3-.5-1-.7-1.5-.2-.4-.4-.7-.7-.8-.3-.1-.6 0-.8.3L574 712c0 0 0 0 0 0-.2.2-.2.5-.2.9 0 .3.2.7.4.9.1.1 1.8 2.2 2.8 3.1 3.1 3.1 8.8 10.5 8.9 10.6.2.3.5.4.8.4.3 0 .5-.2.6-.5 0 0 1.2-2.8 2-4.1 1.1-1.9 2.3-3.7 3.5-5.5.9-1.4 1.3-1.7 1.7-2 .5-.4 1-.7 2.1-2.4C596.9 713.1 596.8 712.3 596.4 711.8zM727.5 179.9C727.5 179.9 727.5 179.9 727.5 179.9c.6.2 1.3-.2 1.4-.8 0-.1 0-.2 0-.4.2-1.4 2.8-12.6 4.5-19.5.1-.3 0-.6-.2-.8-.2-.3-.5-.4-.8-.5-.2 0-4.7-1.1-5.7-1.3l-13.4-2.7c-.3-.1-.7 0-.9.2-.2.2-.4.4-.5.6 0 0 0 .1 0 .1-.8 6.5-2.2 13.1-3.9 19.4-.1.3 0 .6.2.9.2.3.5.4.8.5C714.8 176.9 721.7 178.5 727.5 179.9zM728.5 178.1c-.1-.1-.2-.2-.4-.2C728.3 177.9 728.4 178 728.5 178.1z'/%3E%3Cg fill-opacity='0.62' fill='%23FFF'%3E%3Cpath d='M699.6 472.7c-1.5 0-2.8-.8-3.5-2.3-.8-1.9 0-4.2 1.9-5 3.7-1.6 6.8-4.7 8.4-8.5 1.6-3.8 1.7-8.1.2-11.9-.3-.9-.8-1.8-1.2-2.8-.8-1.7-1.8-3.7-2.3-5.9-.9-4.1-.2-8.6 2-12.8 1.7-3.1 4.1-6.1 7.6-9.1 1.6-1.4 4-1.2 5.3.4 1.4 1.6 1.2 4-.4 5.3-2.8 2.5-4.7 4.7-5.9 7-1.4 2.6-1.9 5.3-1.3 7.6.3 1.4 1 2.8 1.7 4.3.5 1.1 1 2.2 1.5 3.3 2.1 5.6 2 12-.3 17.6-2.3 5.5-6.8 10.1-12.3 12.5C700.6 472.6 700.1 472.7 699.6 472.7zM740.4 421.4c1.5-.2 3 .5 3.8 1.9 1.1 1.8.4 4.2-1.4 5.3-3.7 2.1-6.4 5.6-7.6 9.5-1.2 4-.8 8.4 1.1 12.1.4.9 1 1.7 1.6 2.7 1 1.7 2.2 3.5 3 5.7 1.4 4 1.2 8.7-.6 13.2-1.4 3.4-3.5 6.6-6.8 10.1-1.5 1.6-3.9 1.7-5.5.2-1.6-1.4-1.7-3.9-.2-5.4 2.6-2.8 4.3-5.3 5.3-7.7 1.1-2.8 1.3-5.6.5-7.9-.5-1.3-1.3-2.7-2.2-4.1-.6-1-1.3-2.1-1.9-3.2-2.8-5.4-3.4-11.9-1.7-17.8 1.8-5.9 5.8-11 11.2-14C739.4 421.6 739.9 421.4 740.4 421.4zM261.3 590.9c5.7 6.8 9 15.7 9.4 22.4.5 7.3-2.4 16.4-10.2 20.4-3 1.5-6.7 2.2-11.2 2.2-7.9-.1-12.9-2.9-15.4-8.4-2.1-4.7-2.3-11.4 1.8-15.9 3.2-3.5 7.8-4.1 11.2-1.6 1.2.9 1.5 2.7.6 3.9-.9 1.2-2.7 1.5-3.9.6-1.8-1.3-3.6.6-3.8.8-2.4 2.6-2.1 7-.8 9.9 1.5 3.4 4.7 5 10.4 5.1 3.6 0 6.4-.5 8.6-1.6 4.7-2.4 7.7-8.6 7.2-15-.5-7.3-5.3-18.2-13-23.9-4.2-3.1-8.5-4.1-12.9-3.1-3.1.7-6.2 2.4-9.7 5-6.6 5.1-11.7 11.8-14.2 19-2.7 7.7-2.1 15.8 1.9 23.9.7 1.4.1 3.1-1.3 3.7-1.4.7-3.1.1-3.7-1.3-4.6-9.4-5.4-19.2-2.2-28.2 2.9-8.2 8.6-15.9 16.1-21.6 4.1-3.1 8-5.1 11.8-6 6-1.4 12 0 17.5 4C257.6 586.9 259.6 588.8 261.3 590.9z'/%3E%3Ccircle cx='1013.7' cy='153.9' r='7.1'/%3E%3Ccircle cx='1024.3' cy='132.1' r='7.1'/%3E%3Ccircle cx='1037.3' cy='148.9' r='7.1'/%3E%3Cpath d='M1508.7 297.2c-4.8-5.4-9.7-10.8-14.8-16.2 5.6-5.6 11.1-11.5 15.6-18.2 1.2-1.7.7-4.1-1-5.2-1.7-1.2-4.1-.7-5.2 1-4.2 6.2-9.1 11.6-14.5 16.9-4.8-5-9.7-10-14.7-14.9-1.5-1.5-3.9-1.5-5.3 0-1.5 1.5-1.5 3.9 0 5.3 4.9 4.8 9.7 9.8 14.5 14.8-1.1 1.1-2.3 2.2-3.5 3.2-4.1 3.8-8.4 7.8-12.4 12-1.4 1.5-1.4 3.8 0 5.3 0 0 0 0 0 0 1.5 1.4 3.9 1.4 5.3-.1 3.9-4 8.1-7.9 12.1-11.7 1.2-1.1 2.3-2.2 3.5-3.3 4.9 5.3 9.8 10.6 14.6 15.9.1.1.1.1.2.2 1.4 1.4 3.7 1.5 5.2.2C1510 301.2 1510.1 298.8 1508.7 297.2zM327.6 248.6l-.4-2.6c-1.5-11.1-2.2-23.2-2.3-37 0-5.5 0-11.5.2-18.5 0-.7 0-1.5 0-2.3 0-5 0-11.2 3.9-13.5 2.2-1.3 5.1-1 8.5.9 5.7 3.1 13.2 8.7 17.5 14.9 5.5 7.8 7.3 16.9 5 25.7-3.2 12.3-15 31-30 32.1L327.6 248.6zM332.1 179.2c-.2 0-.3 0-.4.1-.1.1-.7.5-1.1 2.7-.3 1.9-.3 4.2-.3 6.3 0 .8 0 1.7 0 2.4-.2 6.9-.2 12.8-.2 18.3.1 12.5.7 23.5 2 33.7 11-2.7 20.4-18.1 23-27.8 1.9-7.2.4-14.8-4.2-21.3l0 0C347 188.1 340 183 335 180.3 333.6 179.5 332.6 179.2 332.1 179.2zM516.3 60.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C517.3 60.4 516.8 60.8 516.3 60.8zM506.1 70.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C506.4 70.5 506.2 70.5 506.1 70.5zM494.1 64.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C494.7 64.3 494.4 64.4 494.1 64.4zM500.5 55.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C500.9 55.3 500.7 55.3 500.5 55.3zM506.7 55c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C507.4 54.8 507.1 55 506.7 55zM1029.3 382.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C1030.3 382.4 1029.8 382.8 1029.3 382.8zM1019.1 392.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C1019.4 392.5 1019.2 392.5 1019.1 392.5zM1007.1 386.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C1007.7 386.3 1007.4 386.4 1007.1 386.4zM1013.5 377.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C1013.9 377.3 1013.7 377.3 1013.5 377.3zM1019.7 377c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C1020.4 376.8 1020.1 377 1019.7 377zM1329.7 573.4c-1.4 0-2.9-.2-4.5-.7-8.4-2.7-16.6-12.7-18.7-20-.4-1.4-.7-2.9-.9-4.4-8.1 3.3-15.5 10.6-15.4 21 0 1.5-1.2 2.7-2.7 2.8 0 0 0 0 0 0-1.5 0-2.7-1.2-2.7-2.7-.1-6.7 2.4-12.9 7-18 3.6-4 8.4-7.1 13.7-8.8.5-6.5 3.1-12.9 7.4-17.4 7-7.4 18.2-8.9 27.3-10.1l.7-.1c1.5-.2 2.9.9 3.1 2.3.2 1.5-.9 2.9-2.3 3.1l-.7.1c-8.6 1.2-18.4 2.5-24 8.4-3 3.2-5 7.7-5.7 12.4 7.9-1 17.7 1.3 24.3 5.7 4.3 2.9 7.1 7.8 7.2 12.7.2 4.3-1.7 8.3-5.2 11.1C1335.2 572.4 1332.6 573.4 1329.7 573.4zM1311 546.7c.1 1.5.4 3 .8 4.4 1.7 5.8 8.7 14.2 15.1 16.3 2.8.9 5.1.5 7.2-1.1 2.7-2.1 3.2-4.8 3.1-6.6-.1-3.2-2-6.4-4.8-8.3C1326.7 547.5 1317.7 545.6 1311 546.7z'/%3E%3C/g%3E%3C/svg%3E") fixed`;
        this.config = { animate:'animated',fadeinleft:'fadeInLeft',left:'hide-left',sidebar:false};
        this.query;
        this.small = false;
        this.mergeContact = {};
        this.virtualList = [];

        this.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        document.querySelector('app-list-contacts')
            .addEventListener('contactchange', e => this.showPanelConversation(e.detail));

        document.querySelector('app-sidebar')
            .addEventListener('contactchange', e => this.showPanelConversation(e.detail));
        
        this.initEvents();
        this.fetchMessages();
    }
    initEvents(){
        this.eventButtonSendMessage();
        this.closeRecordingMicro();
        this.eventOpenAttachments();
        this.eventStatusAttachCamera();
        this.eventStatusAttachFile();
        this.eventStatusAttachContact();
        this.eventTakePicture();
        this.eventRetakePicture();
        this.eventAttachContactToInsert();
        this.eventDeleteFileFromPreview();
        this.removeAllChildElement();
        this.closeAllMainPanel();
        this.showPanelDefault();
        this.closePanelDocumentPreview();
    }
    showPanelConversation(contact){
        this.setUpdateContact(contact);
        this.removeAllChildElement();
        this.closeAllMainPanel();
        this.showPanelDefault();
        this.el['chatStatusBar'].show();
        this.el['chatHome'].hide();
    }
    fetchMessages(contact){
        this.css({background: 'rgba(43,44,45,1)'});
        this.closeAllMainPanel();
        this.el['chatHome'].css({
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        });
        this.el['noContactSelected'].innerHTML = this.rs.noContactSelected();
        this.el['chat'].appendChild(this.ms.getViewElement())
    }
    eventButtonSendMessage(){
        const filter = Emojis.filter((a,b,c) => c.indexOf(a) === b).splice(400, 80);
        filter.forEach((value, index) => {
            this.el['emojiPanel'].innerHTML += `<span class="emojis" data-unicode="${value}" data-emoji="${index}" id="emoji-${index}">${value}</span>`;
        });
        this.el['btnSend'].hide();
        this.el['inputText'].focus();
        this.el['inputText'].on('keydown', e => {
            if(e.target.value == ''){
                if(e.key == 'Enter' || e.key == 'Alt' || e.key == 'Backspace' || e.key == 'Control' || e.key == 'CapsLock' || e.key == 'Tab'){
                    e.preventDefault();
                }else{
                    this.el['btnSend'].show();
                    this.el['btnMicro'].hide();
                }
            }else if(e.key == 'Enter'){
                e.preventDefault();
            }
        });
        this.el['inputText'].on('keyup', e => {
            if(e.target.value != ''){
                if(e.key == 'Enter'){
                    this.el['btnSend'].click();
                }
            }else{
                this.el['btnSend'].hide();
                this.el['btnMicro'].show();
            }
        });
        this.el['inputText'].on('focusout', e => {
            if(e.target.value == ''){
                this.el['btnSend'].hide();
                this.el['btnMicro'].show();
                this.el['audioRecord'].hide();
            }
        });

        this.el['inputText'].on('focus', e => {
            // this.el['emojiClose'].click();
        });
        this.el['btnMicro'].on('click', e => {
            this.el['audioRecord'].css({display:'flex'});
            this.el['btnMicro'].hide();
            this.el['inputText'].disabled = true;
            this.el['inputText'].placeholder = 'Gravando...';
            this.el['controlsContainer'].css({background:'var(--color-silver)'});
            this.el['formGroup'].css({width:'55%'});
            this.el['iconsContainer'].css({maxWidth:'180px', justifyContent:'center'});
            this.el['emojiOpen'].disabled = true;
            this.audioCtrl = new AudioService(this.snackbarConfig);
            this.audioCtrl.on('ready', audio => this.audioCtrl.startAudioRecorder());
            this.audioCtrl.on('startTimer', timer => this.el['audioRecordTimer'].innerHTML = Format.toTime(timer));
        });

        this.el['btnCloseAudioRecord'].on('click', e => {
            this.audioCtrl.stopAudioRecorder();
            this.closeRecordingMicro();
        });

        this.el['btnSendAudioRecord'].on('click', e => {
            this.audioCtrl.stopAudioRecorder();
            this.closeRecordingMicro();
        });

        this.el['btnSend'].on('click', e => {
            console.log(this.el['inputText'].value);
            this.el['inputText'].value = '';
            this.el['inputText'].setAttribute('placeholder','Digite uma mensagem');
            this.el['emojiClose'].click();
            this.el['btnSend'].hide();
            this.el['btnMicro'].show();
        });

        this.el['emojiOpen'].on('click', e => {
            this.el['emojiPanel'].show();
            this.el['emojiClose'].show();
            this.el['emojiOpen'].hide();
            setTimeout(() => {
                this.el['emojiPanel'].css({height:'250px'});
            },300);
        });
        this.el['emojiClose'].on('click', e => {
            this.el['emojiPanel'].css({height:0});
            setTimeout(() => {
                this.el['emojiPanel'].hide();
                this.el['emojiClose'].hide();
                this.el['emojiOpen'].show();
            }, 300);
        });

        this.el['emojiPanel'].querySelectorAll('.emojis')
            .forEach((value, index) => {
                value.on('click', e => {
                    if(this.el['inputText'].value == '' || this.el['inputText'].value){
                        this.el['btnMicro'].hide();
                        this.el['btnSend'].show();
                    }else{
                        this.el['btnMicro'].show();
                        this.el['btnSend'].hide();
                    }

                    // só funciona se for input
                    this.el['inputText'].setRangeText(value.innerHTML, this.el['inputText'].selectionStart, this.el['inputText'].selectionEnd, "end");
                    this.el['inputText'].focus();
                    this.el['inputText'].dispatchEvent(new Event('keydown'));
                });
        });
        // forçar um evento a um elemento
        // elemento.dispatchEvent(new Event(nome_do_evento));
    }
    eventOpenAttachments(){
        this.el['statusAttachFile'].on('click', e => {
            e.stopPropagation();
            this.el['statusOpenAttachFile'].css({display:'flex'});
            setTimeout(() => {
                this.el['statusOpenAttachFile'].css({height:'230px'});
                this.el['statusAttachFile'].addClass('active');
            },300);

            // usando bind() para manter o escopo default que neste caso é o this
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });
    }
    // loadingContact(contact){
    //     const arr = [];
    //     arr.push(contact);
        
    //     arr.forEach((value, index) => {
    //         let li = document.createElement('li');
    //         li.id = 'list-' + index;
    //         li.innerHTML += this.render.renderListContact(value);
    //         this.el['listContact'].appendChild(li);
    //     });
    // }
    eventStatusAttachCamera(){
        this.el['statusBtnAttachCamera'].on('click', e => {
            this.closeAllMainPanel();
            this.el['imageCamera'].hide();
            this.el['statusPhotoTakeSend'].hide();
            this.css({background:'rgba(43,44,45,1)'});
            this.el['takePhoto'].show();
            this.el['controlsChat'].show();
            this.el['videoCamera'].css({
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
            });
            this.el['statusAttachFile'].disabled = true;
            this.cameraCtrl = new CameraService(this.el['videoCamera']);
        });
        
        this.el['closePanelCamera'].on('click', e => {
            this.closeAllMainPanel();
            this.showPanelDefault();
            this.cameraCtrl.stopRecording();
        });
    }
    eventStatusAttachFile(){
        this.el['statusBtnAttachFile'].on('click', e => {
            this.closeAllMainPanel();
            this.el['statusInput'].click();
        });
        
        this.el['addMoreImages'].on('click', e => {
            e.preventDefault();
            e.stopPropagation();
            this.el['statusInput'].click();
        });
        
        this.el['statusBtnAttachImage'].on('click', e => {
            this.closeAllMainPanel();
            this.el['statusInput'].click();
        });

        this.loadingFiles();
        
        this.el['statusSendFile'].on('click', e => {
            console.log('send file');
        });
    }
    eventStatusAttachContact(){
        this.el['statusBtnAttachContact'].on('click', e => {
            this.closeAllMainPanel();
            this.el['chat'].show();
            this.css({background:this.backgroundDoodles});
            this.el['dialog'].css({display:'flex'});
            setTimeout(() => {
                this.el['dialog'].css({transform: 'scale(1)'});
                this.el['dialogBtnSendContact'].disabled = true;
            }, 300)
        });
    }
    renderPreviews(data){
        const self = this;
      
        this.el['containerDocumentPreview'].css({
            display:'flex',
            justifyContent:'center', 
            alignItems:'center',
            flexDirection:'column',
            height:'300px'
        });

        data.forEach(file => {
            let div = document.createElement('div');
            div.addClass('slides', 'fade');
            
            switch(file.info.type){
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                    div.innerHTML += this.rs.renderingImages(file, self);
                    break;
                case 'text/css':
                case 'text/markdown':
                case 'text/plain':
                case 'text/html':
                case 'text/plain':
                    div.innerHTML += this.rs.renderingIconDefault(file, 'insert_drive_file');
                    break;
                case 'application/pdf':
                    div.innerHTML += this.rs.renderingPdf(file, self);
                    break;
                case 'application/zip':
                    break;
            }
            this.el['containerDocumentPreview'].prepend(div);
            this.el['previewImageSlide'].innerHTML += `
                <span data-images="${file.id}">${Format.abrevName(file.info.name)}</span>
            `;
            document.querySelector('app-snackbar')
                .dispatchEvent(new CustomEvent('show', {detail: `( ${data.length} ) total de arquivos carregados.`}))
        });

        const config = {
            "carousel":this.el['carousel'],
            "control":(this.el['containerDocumentPreview'].childElementCount > 1) ? true : false,
            "dots": true
        }
        this.carouselCtrl = new CarouselService(config);

        this.el['containerDocumentPreview'].addEventListener('imageDelete', e => {
            if(!e.target.querySelector('.slides')){
                this.closeAllMainPanel();

                if(this.el['carousel'].querySelector('.next')) this.el['carousel'].querySelector('.next').remove();
                if(this.el['carousel'].querySelector('.prev')) this.el['carousel'].querySelector('.prev').remove();
                if(this.el['carousel'].querySelector('.dots')) this.el['carousel'].querySelector('.dots').remove();

                this.showPanelDefault();

            }else{
            }
        }); 
    }
    loadingFiles(){
        this.el['statusInput'].on('change', async e => {
            this.response = this.vs.validationsFiles(this.el['statusInput'].files);
            if(this.response.valid){
                this.docPreviewCtrl = new DocumentService(this.response.result);
                try{
                    const data = await this.docPreviewCtrl.fetchPreviewFile();
                    this.css({background:'rgba(43,44,45,1)'});
                    this.el['previewPanelFile'].show();
                    this.el['controlsChat'].hide();
                    this.el['iconFile'].hide();
                    this.el['statusAttachFile'].disabled = true;
                    setTimeout(() => {
                        this.renderPreviews(data);
                    }, 800);
                }catch(e){
                    console.error(e);
                    this.closeAllMainPanel();
                    this.showPanelDefault();
                    this.notification('Error ao carregar arquivos')
                }
            }else{
            }
        });
    }
    eventTakePicture(){
        this.el['statusPhotoTakePhoto'].on('click', e => {
            this.el['imageCamera'].src = this.cameraCtrl.takePicture();
            this.el['videoCamera'].hide();
            this.el['imageCamera'].css({
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
            });
            this.el['statusPhotoTakePhoto'].hide();
            this.el['statusPhotoTakeSend'].css({display:'flex'});
        });

        this.el['statusPhotoTakeSend'].on('click', e => {
            this.closeAllMainPanel();
            this.showPanelDefault();
            this.el['statusPhotoTakePhoto'].css({display:'flex'});
        });
    }
    eventRetakePicture(){
        this.el['retakePicture'].on('click', e => {
            this.el['imageCamera'].hide();
            this.el['videoCamera'].css({
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%'
            });
            this.el['statusPhotoTakePhoto'].css({display:'flex'});
            this.el['statusPhotoTakeSend'].hide();
        });
    }
    fetchContactFromAttachment(contacts){
        // this.el['dialogContentContact'].innerHTML = '';
        // contacts.forEach((value, index) => {
        //     let contact = value.data();
        //     let li = document.createElement('li');
        //     li.innerHTML += this.render.renderContactFromAttach(contact, index);
        //     li.querySelectorAll('label .btn-default').forEach(contact => contact.hide());
        //     li.onchange = e => this.eventAttachContactToInsert(contact, li);
        //     this.el['dialogContentContact'].appendChild(li);
        // });
    }
    eventAttachContactToInsert(contact, el){
        // this.el['dialogFooterContact'].innerHTML = '';
        // let checkbox = el.querySelector('input');

        // if(checkbox.checked){
        //     this.mergeContact[`contact${contact.id}`] = contact;
        //     this.virtualList = this.virtualList.concat(this.mergeContact[`contact${contact.id}`]);
        // }else{
        //     const index = this.virtualList.findIndex(i => i.id == contact.id);
        //     if(index >= 0) this.virtualList.splice(index, 1);
        // }

        // this.virtualList.forEach((value, index) => {
        //     this.el['dialogFooterContact'].innerHTML += (this.virtualList.length > 1) ? `<span>${value.name},&nbsp;&nbsp;</span>` : `<span>${value.name}</span>`;
        // });

        // if(this.virtualList.length > 0) this.el['dialogBtnSendContact'].disabled = false;
        // else this.el['dialogBtnSendContact'].disabled = true;

        // this.el['dialogBtnSendContact'].on('click', e => this.prepareDataToAttachContact(this.virtualList));
    }
    eventDeleteFileFromPreview(files, file, div){
        // [...this.files].forEach((value, index) => {
        //     if(value.name == file.name){
        //         this.el['iconFile'].removeChild(div);
        //     }
        // });
        // if(this.el['iconFile'].childElementCount == 0){
        //     this.closeAllMainPanel();
        //     this.showPanelDefault();
        // }
    }
    prepareDataToAttachContact(contact){
        console.log(contact);
    }
    closePanelDocumentPreview(){
        this.el['closePanelFile'].on('click', e => {
            this.closeAllMainPanel();
            this.showPanelDefault();
            this.removeAllChildElement();
        });
    }
    closeRecordingMicro(){
        this.el['audioRecord'].hide();
        this.el['btnMicro'].show();
        this.el['controlsContainer'].css({background:'var(--color-dark)'});
        this.el['formGroup'].css({width:'60%'});
        this.el['iconsContainer'].css({maxWidth:'95px', justifyContent:'flex-end'});
        this.el['inputText'].placeholder = 'Digite uma mensagem';
        this.el['inputText'].disabled = false;
        this.el['emojiOpen'].disabled = false;
    }
    showPanelDefault(){
        this.el['chat'].show();
        this.css({background:this.backgroundDoodles});
        this.el['controlsChat'].show();
    }
    setUpdateContact(contact){
        this.el['statusContactName'].innerHTML = contact.name;
        this.el['noStatusProfileImage'].hide();
        this.el['statusProfileImage'].show();
        this.el['statusProfileImage'].src = contact.photo;
    }
    removeAllChildElement(){
        while(this.el['iconFile'].firstChild){
            this.el['iconFile'].removeChild(this.el['iconFile'].firstChild);
        }
        while(this.el['containerDocumentPreview'].firstChild){
            this.el['containerDocumentPreview'].removeChild(this.el['containerDocumentPreview'].firstChild);
        }
        while(this.el['previewImageSlide'].firstChild){
            this.el['previewImageSlide'].removeChild(this.el['previewImageSlide'].firstChild);
        }
        
        if(this.el['carousel'].querySelector('.next')) this.el['carousel'].querySelector('.next').remove();
        if(this.el['carousel'].querySelector('.prev')) this.el['carousel'].querySelector('.prev').remove();
        if(this.el['carousel'].querySelector('.dots')) this.el['carousel'].querySelector('.dots').remove();
    }
    closeMenuAttach(e){
        this.el['statusOpenAttachFile'].css({height:0});
        setTimeout(() => {
            this.el['statusAttachFile'].removeClass('active');
            this.el['statusOpenAttachFile'].hide();
        },300);
        document.removeEventListener('click', this.closeMenuAttach);
    }
    closeAllMainPanel(){
        this.el['chat'].hide();
        this.el['takePhoto'].hide();
        this.el['previewPanelFile'].hide();
        this.el['imageCamera'].hide();
        this.el['statusPhotoTakeSend'].hide();
        this.el['iconFile'].hide();
        this.el['containerDocumentPreview'].hide();
        this.el['statusAttachFile'].disabled = false;
    }
    notification(text){
        document.querySelector('app-snackbar')
            .dispatchEvent(new CustomEvent('show', {detail:text}));
    }
}