/**
 * Модель данных товара магазина.
 */
import {Description} from "./Descriptions";

export enum ItemColor {
    beer = "beer",
    chips = "chips",
    nonalc = "nonalc"
}

export class ShopItem {
    /**
     * Идентификатор товара.
     */
    public id: number;
    /**
     * Категория товара.
     */
    public category: number;
    /**
     * Название товара.
     */
    public title: string;

    /**
     * Цена товара.
     */
    public price: number;

    /**
     * Адрес изображения.
     */
    public imageSrc: string;

    /**
     * Короткое описание.
     */
    public brief: string;

    /**
     * Цвет.
     */
    public color: ItemColor;

    /**
     * Полное описание.
     */
    public description: Description[];

    constructor(
        id: number,
        category: number,
        title: string,
        price: number,
        imageSrc: string,
        brief: string,
        description: Description[],
        color: ItemColor
    ) {
        this.id = id;
        this.category = category
        this.title = title;
        this.price = price;
        this.imageSrc = imageSrc;
        this.brief = brief;
        this.description = description;
        this.color = color;
    }
}
