import { convertPrice } from "../../utils/PriceUtils";

export type PriceModel = {
  priceCents: number;
};

export type PriceViewModel = {
  shouldRender: boolean;
  price: string;
};

export function map(model: PriceModel): PriceViewModel {
  return {
    shouldRender: true,
    price: convertPrice(model.priceCents),
  };
}
