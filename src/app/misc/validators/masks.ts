import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export class Masks {

    public static maskTempo(): any {
        return {
            mask: [/\d/, /\d/, ':', /\d/, /\d/, ":", /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('HH:MM:SS')
        };
    }

    public static maskData(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yyyy')
        };
    }

    public static maskData8(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yy')
        };
    }

    public static maskPorcentagem(precision: number = 2): any {
        return { prefix: "", suffix: ' %', thousands: '.', decimal: ',', precision: precision ? precision : 2 }
    }

    public static maskInteiro(precision: number = 0): any {
        return { prefix: "", thousands: '.', decimal: ',', precision: precision ? precision : 0 }
    }

    public static maskDinheiro(precision: number = 2): any {
        return { prefix: 'R$ ', thousands: '.', decimal: ',', precision: precision ? precision : 2 }
    }

    public static maskDataHora(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yy HH:MM')
        };
    }

    public static maskCNPJ(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
        }
    }

    public static maskCPF(): any {
        return {
            mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        }
    }

    public static maskTelefone(): any {
        return {
            mask: ["(", /\d/, "X", "X", /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        }
    }

    public static maskCelular(): any {
        return {
            mask: ["(", /\d/, "X", "X", /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        }
    }

    public static maskCEP(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
        }
    }

    public static maskCodigo(length: number = 10): any {
        let mask = [];

        for (let i = 0; i < length; i++) { mask.push(/\d/) }

        return { mask: mask };
    }

    /**
     * @description Faz a mask para aceitar somentes letras minusculas e maiusculas
     * @param maxLength MaxLength para o campo
     */
    public static maskLetras(maxLength: number = 30): any {
        let mask = `^([a-z]|[A-Z]|[\u00C0-\u00FF ]){1,${maxLength}}$`;
        return { mask: new RegExp(mask, "g") }
    }

    /**
     * @description Faz a mask para aceitar tudo, entretanto limitar os campos
     * @param maxLength MaxLength para o campo
     */
    public static maskMaxLength(maxLength: number = 30): any {
        let mask = [];

        for (let i = 0; i < maxLength; i++) { mask.push(/./) }

        return { mask: mask, guide: false };
    }


    /**
     * @description Faz a mask para aceitar números e letras
     * @param maxLength MaxLength para o campo
     * @param regex Caso true, retorna o regex, caso false retorna o string
     */
    public static maskNumerosLetras(maxLength: number = 30, regex: boolean = false): any {
        let mask = `^([a-z]|[A-Z]|[\u00C0-\u00FF ]|[0-9]|_|-){1,${maxLength}}$`;
        if (regex) {
            return { mask: /^([a-z]|[A-Z]|[0-9]|_|-){1,99}$/g }
        } else {
            return { mask: new RegExp(mask, "g") }
        }
    }

    /**
     * @description Faz a mask aceitar números e caracteres de Data, Hora e Moeda
     * @param maxLength MaxLength para o campo
     * @param regex Caso true, retorna o regex, caso false retorna o string
     */
    public static maskNumeroEspecial(regex: boolean = false, maxLength: number = 30): any {
        let mask = `^([0-9]|\\.|,|:|\\/){1,${maxLength}}$`;
        if (regex) {
            return { mask: /^([0-9]|\.|,|:|\/)*$/g }
        } else {
            return { mask: new RegExp(mask, "g") }
        }
    }

    public static maskDinheiroTabela() {
        return createNumberMask({
            prefix: '',
            allowDecimal: true,
            decimalLimit: 2,
            integerLimit: 15,
            requireDecimal: true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static maskPorcentagemTabela() {
        return createNumberMask({
            prefix: '',
            allowDecimal: true,
            decimalLimit: 2,
            integerLimit: 3,
            requireDecimal: true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static maskDataTabela() {
        return createAutoCorrectedDatePipe('dd/mm/yy');
    }

    public static maskInteiroTabela(precision: number = 0) {
        return createNumberMask({
            prefix: '',
            allowDecimal: precision == 0 ? false : true,
            decimalLimit: precision,
            integerLimit: 15,
            requireDecimal: precision == 0 ? false : true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static maskSemCaracterEspecialTabela(lenght: number = 30): any {
        let mask = [];
        for (let i = 0; i < lenght; i++) { mask.push(/^[a-zA-Z\u00C0-\u00FF0-9]*$/) }
        return { mask: mask };
    }

    public static maskMaxLengthTabela(lenght: number = 30): any {
        let mask = [];
        for (let i = 0; i < lenght; i++) { mask.push(/./) }
        return { mask: mask };
    }

    public static maskNumerosString(lenght: number = 30): any {
        let mask = [];
        for (let i = 0; i < lenght; i++) { mask.push(/\d/) }
        return { mask: mask };
    }

    /**
     * @description Mascara de CFOP
     * @static
     * @returns {*}
     */
    public static maskCFOP(): any {
        return { mask: [/\d/, '.', /\d/, /\d/, /\d/] };
    }
}