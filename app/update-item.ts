import { Item } from "./gilded-rose";

export class UpdateItem {
  private MIN_QUALITY: number = 0;
  private MAX_QUALITY: number = 50;

  ordinaryItem(item: Item): void {
    const depreciation: number = item.sellIn > 0 ? -1 : -2;
    item.quality = Math.max(item.quality + depreciation, this.MIN_QUALITY);
    item.sellIn -= 1;
  }

  agedBrie(item: Item): void {
    const appreciation: number = item.sellIn > 0 ? 1 : 2;
    item.quality = Math.min(item.quality + appreciation, this.MAX_QUALITY);
    item.sellIn -= 1;
  }

  sulfuras(item: Item): void {
    // No changes for sulfuras
  }

  backstagePasses(item: Item): void {
    const getQuality = (appreciation: number) => {
      item.quality = Math.min(item.quality + appreciation, this.MAX_QUALITY);
    };

    if (item.sellIn > 10) {
      getQuality(1);
    } else if (item.sellIn > 5) {
      getQuality(2);
    } else if (item.sellIn > 0) {
      getQuality(3);
    } else {
      item.quality = 0;
    }

    item.sellIn -= 1;
  }

  conjured(item: Item): void {
    const depreciation: number = item.sellIn > 0 ? -2 : -4;
    item.quality = Math.max(item.quality + depreciation, this.MIN_QUALITY);
    item.sellIn -= 1;
  }
}
