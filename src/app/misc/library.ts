import { FormControl } from '@angular/forms';
import * as moment from 'moment';

let numberFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function getMaxLength(control: FormControl) {
    if (!control.validator) {
        return null;
    }

    let bigString = "";
    for (let i = 0; i < 5002; i++) {
        bigString += "A";
    }

    let controlAux = new FormControl(bigString);
    let validator = control.validator(controlAux);

    if (validator && validator.maxlength) {
        return validator.maxlength.requiredLength;
    } else {
        return null
    }
}

/**
 * @description Função para verificiar se um objeto tem código
 * @param objeto Objeto para ser comparado. Será verificado se esse objeto tem o campo código 
 * @returns True caso o objeto ter código. False caso não tenha.
 */
export function temCodigo(objeto: any): boolean {
    if (objeto && typeof (objeto) == "object" && objeto.codigo) {
        return true;
    } else {
        return false
    }
}

/**
 * @description Copia profundamente o objeto, fazendo com que crie uma nova instância
 * @param object Envia o objeto para fazer uma cópia profunda sem instância
 * @returns Retorna um objeto com outra instância
 */
export function copy(object: any) {
    return JSON.parse(JSON.stringify(object))
}

/**
 *  @description Faz a aplicação dormir por um tempo determinado
 *  @param ms Milissegundos para pausar a aplicação
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description Ordenação de arrays
 * @param pData O array a ser passado
 * @param pField O campo do array
 * @param pOrder O número da ordenação: 1 - Crescente, -1 Decrescente
 * @param ignorarZeroNull Ignora o zero e o null da lista e insere eles ao final.
 * @returns Retorna o array ordernado
 */
export function doOrdenacao(pData, pField: string, pOrder: 1 | -1, ignorarZeroNull: boolean = false): Array<any> {
    return pData.sort((a, b) => {
        if (isNaN(a[pField])) {
            if (a[pField].indexOf("/") != -1 && a[pField].indexOf(":") != -1) {
                let dataA = toDate(a[pField]);
                let dataB = toDate(b[pField]);

                if (dataA == dataB) { return 0 }
                if (dataA > dataB) { return 1 * pOrder }
                if (dataA < dataB) { return -1 * pOrder }
            }
        }

        if (ignorarZeroNull) {
            if (a[pField] == 0 || !a[pField] && a[pField] == b[pField]) { return 0 }
            if (a[pField] == 0) {
                return 1;
            }
            if (b[pField] == 0) {
                return -1;
            }
        }

        if (a[pField] == b[pField]) { return 0 }
        if (a[pField] > b[pField]) { return 1 * pOrder }
        if (a[pField] < b[pField]) { return -1 * pOrder }
    });
}

//Cronometro para o CRM, utilizado para contar quanto tempo gastou.
export function cronometro(horario?: string) {
    var s;
    var m;
    var h
    let hora, minuto, segundo;

    if (horario) {
        let split = horario.split(":");
        [h, m, s] = [Number.parseInt(split[0]), Number.parseInt(split[1]), Number.parseInt(split[2])];
    } else {
        [h, m, s] = [0, 0, 0];
    }

    s++;
    if (s == 60) { m++; s = 0; }
    if (m == 60) { h++; s = 0; m = 0; }
    if (h < 10) hora = "0" + h; else hora = h;
    if (s < 10) segundo = "0" + s; else segundo = s;
    if (m < 10) minuto = "0" + m; else minuto = m;

    return hora + ":" + minuto + ":" + segundo;
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy 00:00:00" e tranforma para Date
 * @param data "dd/mm/yyyy 00:00:00" - String
 * @return Irá retornar a data de hoje junto com o tempo enviado no fomato Date
 */
export function toDate(data: string) {
    let dataAux = new Date();

    let [dataSplit, tempoSplit] = data.split(" ");
    let [dia, mes, ano] = dataSplit.split("/");
    let [hora, minuto, segundo] = tempoSplit.split(":");

    dataAux.setHours(Number.parseInt(hora));
    dataAux.setMinutes(Number.parseInt(minuto));
    dataAux.setSeconds(Number.parseInt(segundo));
    dataAux.setDate(Number.parseInt(dia));
    dataAux.setMonth(Number.parseInt(mes) - 1);
    dataAux.setFullYear(Number.parseInt(ano));

    return dataAux;
}

/**
 * @description Função que pega uma string  "dd/mm/yy" e tranforma para string "dd/mm/yyyy"
 * @param data "dd/mm/yy" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yyyy"
 */
export function toDate10String(data: string): string {
    let dataAux = new Date();

    let [dia, mes, ano] = data.split("/");

    dataAux.setDate(Number.parseInt(dia));
    dataAux.setMonth(Number.parseInt(mes));
    dataAux.setFullYear(Number.parseInt("20" + ano));

    return dataAux.toLocaleDateString("pt-BR");
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy" e tranforma para string "dd/mm/yy"
 * @param data "dd/mm/yyyy" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yy"
 */
export function toDate8String(data: string): string {
    if (!data) return null;

    let [dia, mes, ano] = data.split("/");

    return dia + "/" + mes + "/" + (ano.length > 2 ? ano.substring(2) : ano);
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy HH:mm:ss" e tranforma para string "dd/mm/yy HH:mm:ss"
 * @param data "dd/mm/yyyy HH:mm:ss" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yy HH:mm:ss"
 */
export function toDateTime8String(data: string): string {
    if (!data) return null;

    let [dataSplit, tempoSplit] = data.split(" ");
    let [dia, mes, ano] = dataSplit.split("/");

    return dia + "/" + mes + "/" + (ano.length > 2 ? ano.substring(2) : ano) + tempoSplit;
}


/**
 * @description Retorna o tempo de uma string que está no formato: "DD/MM/YYYY HH:mm:ss" para "HH:mm:ss"
 * @export
 * @param {string} data
 * @returns {string} Retorna uma string "HH:mm:ss"
 */
export function dateTimeToTime(data: string): string {
    return data.split(" ")[1];
}

/**
 * @description Converte um number para o formato string de Currency
 * @param numero Número que será convertido para uma string de Moeda
 * @return Retorna no formato: "R$ 0,00"
 */
export function toCurrency(numero: number): string {
    return numberFormat.format(numero);
}

/**
 * @description Função que pega uma string de tempo "00:00:00" e tranforma para Date
 * @param tempo "00:00:00" - String
 * @return Irá retornar a data de hoje junto com o tempo enviado no fomato Date
 */
export function transformaTempo(tempo: string) {
    let data = new Date();

    let [hora, minuto, segundo] = tempo.split(":");

    data.setHours(Number.parseInt(hora));
    data.setMinutes(Number.parseInt(minuto));
    data.setSeconds(Number.parseInt(segundo));

    return data;
}

/**
 * @description Função que pega dois tempos e retorna a diferença
 * @param dataInicio Campo Date, é a data inicio
 * @param dataFim Campo Date, é a data fim
 * @return Retornará o tempo em "00:00:00"
 */
export function diferencaHorario(dataInicio: Date, dataFim: Date) {
    let inicio = moment(dataInicio);
    let fim = moment(dataFim);

    let diferenca = moment.duration(fim.diff(inicio));
    let horas = diferenca.hours() < 10 ? "0" + diferenca.hours() : diferenca.hours();
    let minutos = diferenca.minutes() < 10 ? "0" + diferenca.minutes() : diferenca.minutes();
    let segundos = diferenca.seconds() < 10 ? "0" + diferenca.seconds() : diferenca.seconds();

    return horas + ":" + minutos + ":" + segundos;
}

//Calcula a diferença de segundos e retorna em number
export function diferencaSegundos(dataInicio: Date, dataFim: Date) {
    let inicio = moment(dataInicio);
    let fim = moment(dataFim);

    let diferenca = moment.duration(fim.diff(inicio));

    return diferenca.seconds();
}

/**
 * @description Retorna a diferença de duas datas em milisegundos
 * @export
 * @param {Date} dataInicio
 * @param {Date} dataFim
 * @returns
 */
export function diferencaMilissegundos(dataInicio: Date, dataFim: Date) {
    let inicio = moment(dataInicio);
    let fim = moment(dataFim);

    let diferenca = moment.duration(fim.diff(inicio));

    return diferenca.milliseconds();
}


/**
 * @description Função para converter uma string para a sua mask
 * @export
 * @param {string} value Valor da String
 * @param {string} mask Mascara a ser colocada
 * @returns {string}
 */
export function toMask(value: string, mask: string): string {
    let retorno: string = value;

    // debugger
    for (let i = 0; i < retorno.length - 1; i++) {
        if (mask.charAt(i) != "0" && i < retorno.length) {
            retorno = [retorno.slice(0, i), mask.charAt(i), retorno.slice(i)].join('');
        }
    }

    return retorno;
}


/**
 * @description Função que pega dois dias e retorna a diferença
 * @param dataInicio Campo Date, é a data inicio
 * @param dataFim Campo Date, é a data fim
 * @return //Calcula a diferença de dias e retorna em number
 */
export function diferencaDias(dataInicio: Date, dataFim: Date) {
    let inicio = moment(dataInicio);
    let fim = moment(dataFim);

    let diferenca = moment.duration(fim.diff(inicio));

    return Math.round(diferenca.asDays());
}

/**
 * @description Função que pega uma Data e retorna uma data em formata "mm/dd/yy"
 * @param date Campo em String no formado "dd/mm/yy"
 * @return Retorna a data no formato "mm/dd/yy"
 */
export function toDate8Us(date: string) {
    let data = date.split("/");
    return data[1] + "/" + data[0] + "/" + data[2];
}

export function validacaoEmail(field) {
    if (!isNaN(field))
        return false;

    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@") + 1, field.length);
    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

        return true;
    }
    else {
        return false;
    }
}

/**
 * @description Função serve para transformar caracteres especiais em URI para que a requisição GET seja efetuada com sucesso.
 *  @param palavra palavra que será transformada em URI.  
 */
export function trocarCaracterEspecial(palavra: string) { return palavra ? encodeURIComponent(palavra) : "" }

export function isOdd(num) { return num % 2 }

/**
 * @description Criptografa uma determinada string
 * @export
 * @param {string} campo Campo que será criptografado
 * @param {("C" | "D")} operacao C = Criptografar, D = Decriptografar
 * @returns {string}
 */
export function encript(campo: string, operacao: "C" | "D"): string {

    let i, ate, x1, x2: number;
    let r1, r2, retorno: string;

    retorno = '';

    if (isOdd(campo.length)) { campo = campo + ' ' };

    ate = Math.floor(campo.length / 2);

    for (let i = 1; i < ate + 1; i++) {

        x1 = campo[((i - 1) * 2)].charCodeAt(0);

        x2 = campo[((i - 1) * 2) + 1].charCodeAt(0);

        if (operacao == 'D') {
            r2 = String.fromCharCode(Math.floor((-x2 + x1 + 90) / 2));
            r1 = String.fromCharCode(Math.floor(x1 - ((-x2 + x1 + 90) / 2)));
        } else {
            r2 = String.fromCharCode(Math.floor(x1 + 90 - x2));
            r1 = String.fromCharCode(Math.floor(x1 + x2));
        }

        retorno = retorno + r1 + r2;

    }

    return retorno;

}

export function getListadeOptions(pOption: string) {
    let optionsSimNao: any = [{ value: "S", nome: "SIM" }, { value: "N", nome: "NÃO" }];
    if (pOption == 'optionsSimNao') { return optionsSimNao }
}

export function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = toBase64(tok);
    return 'Basic ' + hash;
}

/**
 * @description Converte uam string para base64 no formato UTF-8
 * @export
 * @param {string} str
 * @returns
 */
export function toBase64(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

/**
 * @description Converte um UTF-8 para base64
 * @export
 * @param {string} str
 * @returns
 */
export function decodeToString(str) {
    return decodeURIComponent(Array.prototype.map.call(decodeToString(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

/**
 * @description Validação de Data
 * @export
 * @param {string} valor Data no formato dd/mm/yy
 * @returns Retorna True se não tiver erro.
 */
export function validarData(valor: string): boolean {
    var date = valor;
    var ardt = [];
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{2}");
    ardt = date.split("/");
    if (ardt.length == 3 && ardt[2].length == 2) ardt[2] = "20" + ardt[2];

    let erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    }
    else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro) {
        return false;
    }
    return true;
}