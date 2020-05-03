import Format from "../utils/format";

export default class RenderView {
    constructor(){

    }

    messageTextReceive(msg){
        return `
            <div class="message">
                <div class="container-cb2">
                    <div class="cb2">
                        <span style="color: var(--color-orange-lighter); font-weight:bold;">${msg.name}</span>
                        <span>${msg.message}</span>
                        <span style="color: var(--color-light);" class="time">${Format.formatHourToBrazilian(msg.time)}</span>
                    </div>
                </div>
            </div>

            <div class="message">
                <div class="container-cb">
                    <div class="cb">
                        <span style="color:var(--color-black); font-weight:bold;">${msg.name}</span>
                        <span>${msg.message}</span>
                        <span style="color: var(--color-white); font-weight:100;" class="time">${Format.formatHourToBrazilian(msg.time)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    noContactSelected(){
        return `
            <div class="no-contact-selected">
                <div class="container">
                    <!-- <svg fill="#9c9696" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 22.621l-3.521-6.795c-.007.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.082-1.026-3.492-6.817-2.106 1.039c-1.639.855-2.313 2.666-2.289 4.916.075 6.948 6.809 18.071 12.309 18.045.541-.003 1.07-.113 1.58-.346.121-.055 2.102-1.029 2.11-1.033zm-2.5-13.621c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg> -->
                    <img width="100" src="/assets/icons/iconmonstr-phone-10.svg" />
                    <span>Selecione um contato</span>
                </div>
            </div>        
        `;
    }

    renderListContact(contact){
        return `
            <button type="button">
                <div class="img">
                    <i class="contact-image large material-icons">person</i>
                    <img src="${contact.photo}"/>
                </div>
                <div class="text">
                    <span class="name">${contact.name}</span>
                    <span class="message">${contact.lastMessage}</span>
                    <span class="time">${Format.formatHourToBrazilian(contact.time)}</span>
                </div>
            </button>
        `;
    }

    renderContactFromAttach(value, index){
        return `
            <input id="checkbox-attach-contact-index${index}" type="checkbox">
            <label for="checkbox-attach-contact-index${index}">
                <div style="margin-left:16px;" class="img">
                    <span class="btn-default" style="background: rgba(51,51,51,1)" ><i class="large material-icons">person</i></span>
                </div>
                <div class="text">
                    <span class="name">${value.name}</span>
                    <!-- <span class="message">${value.message}</span> -->
                    <!-- <span class="time">${Format.formatHourToBrazilian(value.time)}</span> -->
                </div>
            </label>
        `;
    }
    
    renderingIconDefault(file, icon){
        return `
            <span style="color:var(--color-white);">
                <i class="close small material-icons">close</i>
                <i style="font-size:40px" class="large material-icons">${icon}</i>
                ${Format.formatNameFromImage(file.info.type)}
            </span>
        `;
    }
    
    renderingPdf(file, self){
        return `
            <span id="show-total" class="slide-length">1/${self.el['containerDocumentPreview'].childElementCount + 1}</span>
            <span id="close-slide" class="close-slide"><i data-images="${file.id}" class="small material-icons">close</i></span>
            <img src="${file.src}">
            <div class="caption">Arquivo em formato de ${Format.formatNameFromImage(file.info.type)} - páginas ${file.pages}</div>                
        `;
    }
    
    renderingImages(file, self){
        return `
            <span id="show-total" class="slide-length">1/${self.el['containerDocumentPreview'].childElementCount + 1}</span>
            <span id="close-slide" class="close-slide"><i data-images="${file.info.name}" class="small material-icons">close</i></span>
            <img src="${file.src}">
            <!-- <div class="caption">${file.info.name}</div> -->
        `;
    }
}