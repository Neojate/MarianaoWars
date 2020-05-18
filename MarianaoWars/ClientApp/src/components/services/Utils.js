var stringUtils = {

    /**
     * Convierte tiempo de milisegundos a string dd:hh:mm:ss
     * 
     * @param {int} time
     * @return {string}
     */
    timeToString: function (time) {
        
        let segundos = parseInt(time / 1000, 10);
        let dias = Math.floor(segundos / (3600 * 24));
        segundos -= dias * 3600 * 24;
        let horas = Math.floor(segundos / 3600);
        segundos -= horas * 3600;
        let minutos = Math.floor(segundos / 60);
        segundos -= minutos * 60;

        let stringTime = '';

        if (dias != 0) {
            stringTime += `${dias}d. `;
        }
        if (dias != 0 || horas != 0) {
            stringTime += `${String(horas).padStart(2, "0")}h. `;
        }
        if (dias != 0 || horas != 0 || minutos != 0) {
            stringTime += `${String(minutos).padStart(2, "0")}m. `;
        }

        stringTime += `${String(segundos).padStart(2, "")}s`;
        
        return stringTime;

    }
}

export { stringUtils };


