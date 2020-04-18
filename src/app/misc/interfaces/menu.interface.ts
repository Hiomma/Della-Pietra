export interface IMenu {
    name: string;
    icon: string;
    routerLink?: any;
    actions?: Array<IActions>;
    isEmpresa: boolean;
}

export interface IActions {
    name: string;
    routerLink: any;
}