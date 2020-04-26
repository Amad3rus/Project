export default class DocumentPreviewController{
    constructor(files){
        this.files = files;
    }

    fetchPreviewFile(){
        return new Promise((resolve, reject) => {
            const files = [];
            [...this.files].forEach((file, index) => {
                
                console.log(file.type);

                switch(file.type){
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                    case 'image/gif':
                        let reader = new FileReader();
                        reader.onload = e => {files.push({src:reader.result, info:file})};
                        reader.onerror = e => {reject(e)};
                        reader.readAsDataURL(file);
                        break;
                    case 'application/pdf':
                        files.push({info:file});
                        break;
                    case 'application/json':
                        break;
                    case 'application/zip':
                        break;
                    case 'text/css':
                    case 'text/markdown':
                    case 'text/plain':
                    case 'text/html':
                        break;
                    default:
                        reject()
                }
            });

            resolve(files);
        });
    }
}