export interface IMenu {
    name: string;
    icon: string;
    routerLink?: any;
    actions?: Array<IActions>;
}

export interface IActions {
    name: string;
    routerLink: any;
    action: any;
}