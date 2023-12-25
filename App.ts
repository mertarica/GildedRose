import { Item, GildedRose } from "./app/gilded-rose";

const items: Item[] = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Conjured Mana Cake", 3, 6),
];

const gildedRose = new GildedRose(items);

// Update the quality for a certain number of days
for (let day = 1; day <= 5; day++) {
  console.log(`-------- Day ${day} --------`);
  console.log("Before update:");
  items.forEach((item) =>
    console.log(`${item.name}: sellIn=${item.sellIn}, quality=${item.quality}`)
  );

  gildedRose.updateQuality();

  console.log("After update:");
  items.forEach((item) =>
    console.log(`${item.name}: sellIn=${item.sellIn}, quality=${item.quality}`)
  );
  console.log("\n");
}
