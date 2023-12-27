import { UpdateItem } from "./update-item";
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  updateItem: UpdateItem;

  constructor(items = [] as Array<Item>) {
    if (items.some((item) => item.quality < 0))
      throw new Error("You cannot add negative quality");
    if (
      items.some(
        (item) =>
          item.name !== "Sulfuras, Hand of Ragnaros" && item.quality > 50
      )
    )
      throw new Error(
        "You cannot add any quality value bigger than 50 for items"
      );
    if (
      items.some(
        (item) =>
          item.name === "Sulfuras, Hand of Ragnaros" && item.quality !== 80
      )
    )
      throw new Error(
        "You cannot add any quality value other than 80 for sulfuras"
      );
    this.items = items;
    this.updateItem = new UpdateItem();
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case "Aged Brie": {
          this.updateItem.agedBrie(item);
          break;
        }
        case "Backstage passes to a TAFKAL80ETC concert": {
          this.updateItem.backstagePasses(item);
          break;
        }
        case "Conjured Mana Cake": {
          this.updateItem.conjured(item);
          break;
        }
        case "Sulfuras, Hand of Ragnaros": {
          this.updateItem.sulfuras(item);
          break;
        }
        default: {
          this.updateItem.ordinaryItem(item);
        }
      }
    }

    return this.items;
  }
}
