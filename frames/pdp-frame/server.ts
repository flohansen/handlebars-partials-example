import { ButtonModel } from "../../components/ordering/server";
import { PriceModel } from "../../components/price/server";

type PdpInputVariation = {
  variations: {
    priceCents: number;
    name: string;
  }[];
};

type PdpFrameViewModel = {
  pdpViewModel: {
    variations: {
      priceModel: PriceModel;
      buttonModel: ButtonModel;
    }[];
  };
};

export function map(variation: PdpInputVariation): PdpFrameViewModel {
  return {
    pdpViewModel: {
      variations: variation.variations.map((v) => ({
        priceModel: { priceCents: v.priceCents },
        buttonModel: { articleName: v.name, priceCents: v.priceCents },
      })),
    },
  };
}
