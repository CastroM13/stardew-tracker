export interface IFood {
    name?: string;
    link?: string;
    image?: string;
    ingredients?: IIngredient[];
}

export interface IIngredient {
    name?: string;
    image?: string;
    link?: string;
    amount?: number;
}