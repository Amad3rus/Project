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
    static timeStampToTime(timestamp){
        return (timestamp && typeof timestamp.toDate === 'function') ? Format.dateToTime(timestamp.toDate()) : '';
    }
    static toTime(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        else return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    static dateToTime(isoDate, locale = 'pt-BR'){
        return isoDate.toLocaleTimeString(locale, { hours:'2-digits', minutes:'2-digits'});
        // return new Date(isoDate).toLocaleTimeString('pt-BR', {hours:'2-digits', minutes:'2-digits'});
    }
    static formatNameFromImage(filetype){
        return filetype.split('/')[1].toUpperCase();
    }
    
    static abrevName(string){
        const result = (string.match(/ d./i)) ? string.match(/ d./i)[0] : ' ';
        const novaString = String.raw`${string}`.replace(result, ' ').split(/[_. ,@$^*/\\-]/).filter(char => char != '');
        return (novaString[0][0] + novaString[1][0]).toUpperCase();
    }
    
    static formatBytes(b){
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB','YB'];

        let l = 0;
        let n = parseInt(b, 10) || 0;

        while(n >= 1024 && ++l){
            n = n / 1024;
        }
        return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }
    
    static createUid(){
        let timestamp = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
            let r = (timestamp + Math.random() * 16) %16 | 0;
            timestamp = Math.floor(timestamp/16);
            return (char === 'x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}