import { convertPrice } from "../../utils/PriceUtils";

export type ButtonModel = {
  articleName: string;
  priceCents: number;
};

export type ButtonViewModel = {
  shouldRender: boolean;
  articleName: string;
  price: string;
};

export function map(model: ButtonModel): ButtonViewModel {
  return {
    shouldRender: true,
    articleName: model.articleName,
    price: convertPrice(model.priceCents),
  };
}
