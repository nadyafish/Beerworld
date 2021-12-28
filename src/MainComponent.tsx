import React, {useEffect, useState} from 'react';
import {ItemColor, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row, Image, Carousel} from "react-bootstrap";
import {ListCategoryComponent} from "./ListCategoryComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";
import {CategoryItem} from "./CategoryItem";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: CategoryItem[];
    color: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        color: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getCategoryData(state.color).then(value => {
            changeState({
                items: value,
                color: state.color
            });
        });
    }, [state.color]);

    function onColorInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let value: string = event.target.value;

        changeState({
            ...state,
            color: value
        });
    }

    let items = state.items;

    return (
      <Container>

          <Row>
              <Carousel style={{height: 300, width: 1300}} className={"myCarousel"}>
                  <Carousel.Item style={{height: 300}}>
                      <img
                          className="d-block w-100"
                          src="https://el-gusto.ru/assets/files/images/menu/bg/beer.jpg"
                          alt="Собственное производство"
                      />
                      <Carousel.Caption className={"carousel-caption"}>
                          <h3>Собственное производство</h3>
                          <p>Приобретайте в нашем магазине пиво собственного производства. Сварено с любовью!</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{height: 300}}>
                      <img
                          className="d-block w-100"
                          src="https://media.list.ly/production/533368/listly-top-10-best-pressurized-growlers-for-craft-beer-reviews-2018-2019-headline.jpeg?ver=0364309632"
                          alt="Оптовые цены"
                      />

                      <Carousel.Caption className={"carousel-caption"}>
                          <h3>Продажа оптом</h3>
                          <p>Ящиками дешевле!</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{height: 300}}>
                      <img
                          className="d-block w-100"
                          src="https://media.list.ly/production/422198/headline.jpeg?ver=8781804685"
                          alt="Октрябрьфест длинною в год"
                      />

                      <Carousel.Caption className={"carousel-caption"}>
                          <h3>Октрябрьфест длинною в год</h3>
                          <p>Потому что мы можем  и хотим!</p>
                      </Carousel.Caption>
                  </Carousel.Item>
              </Carousel>
          </Row>
          <Row>
              {
                  items.map((item: CategoryItem) => {
                      return (
                          <Col lg={{span:3, offset: 1 }} key={item.id}>
                              <ListCategoryComponent item={item}/>
                          </Col>
                      )
                  })
              }
          </Row>
      </Container>
    );
}
