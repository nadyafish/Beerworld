/**
 * Модель данных категории товара магазина.
 */
import {ShopItem} from "./ShopItem";

export enum ItemColor {
    beer = "beer",
    chips = "chips",
    nonalc = "nonalc"
}
export class CategoryItem {
    /**
     * Идентификатор категории.
     */
    public id: number;
    /**
     * Название товара.
     */
    public title: string;

    /**
     * Адрес изображения.
     */
    public imageSrc: string;

    /**
     * Цвет.
     */
    public color: ItemColor;

    constructor(
        id: number,
        title: string,
        imageSrc: string,
        color: ItemColor
    ) {
        this.id = id;
        this.title = title;
        this.imageSrc = imageSrc;
        this.color = color
    }
}
