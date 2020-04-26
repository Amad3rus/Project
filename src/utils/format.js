export default class Format {

    static formatToCamelCase(text){
        let div = document.createElement('div');
        div.innerHTML = `<div data-${text}="id"></div>`;
        
        return Object.keys(div.firstChild.dataset)[0];
    }
    static formatDateToBrazilian(date){
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }
    static formatHourToBrazilian(hour){
        const options = {
            // year: 'numeric', 
            // month: 'numeric', 
            // day: 'numeric',
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric',
            hour12: false,
            timeZone: 'America/Sao_Paulo'
        };
        return new Intl.DateTimeFormat('pt-BR', options).format(hour);
    }
    static toTime(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        else return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    static formatNameFromImage(filetype){
        return filetype.split('/')[1];
    }
}