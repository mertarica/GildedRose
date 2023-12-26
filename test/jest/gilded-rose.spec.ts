import { Item, GildedRose } from "@/gilded-rose";

describe("Constructor Tests", () => {
  it("should add new item", () => {
    const inventory = new GildedRose([new Item("foo", 0, 0)]);
    const item = inventory.items[0];
    expect(JSON.stringify(item)).toBe(
      JSON.stringify({ name: "foo", sellIn: 0, quality: 0 })
    );
  });

  it("should not throw exception in case of empty inventory", () => {
    const inventory = new GildedRose([]);
    inventory.updateQuality();

    expect(true).toBe(true);
  });

  it("should create multiple items and multiple update", () => {
    const items: Item[] = [
      new Item("Ordinary Item", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Conjured Item", 3, 6),
    ];

    const inventory = new GildedRose(items);

    for (let day = 1; day <= 5; day++) {
      inventory.updateQuality();
    }

    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(15);

    expect(items[1].sellIn).toBe(-3);
    expect(items[1].quality).toBe(8);

    expect(items[2].sellIn).toBe(10);
    expect(items[2].quality).toBe(25);

    expect(items[3].sellIn).toBe(-2);
    expect(items[3].quality).toBe(0);
  });

  it("should not add negative quality", () => {
    expect(() => new GildedRose([new Item("New Item", 0, -1)])).toThrow(
      "You cannot add negative quality"
    );
  });

  it("should not add quality bigger than 50", () => {
    expect(() => new GildedRose([new Item("New Item", 0, 51)])).toThrow(
      "You cannot add any quality value bigger than 50 for items"
    );
  });

  it("should not add any quality value other than 80 for sulfuras", () => {
    expect(
      () => new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 0)])
    ).toThrow("You cannot add any quality value other than 80 for sulfuras");
  });

  it("should handle updating quality for an item with maximum sellIn and maximum quality", () => {
    const item = new Item("foo", Number.MAX_SAFE_INTEGER, 50);
    const inventory = new GildedRose([item]);
    inventory.updateQuality();

    expect(item.sellIn).toBe(Number.MAX_SAFE_INTEGER - 1);
    expect(item.quality).toBe(49);
  });
});

describe("ordinary items daily changes", () => {
  it("should lost 1 unit of quality after a simple day", () => {
    const ordinaryItem = new Item("foo", 10, 10);
    const inventory = new GildedRose([ordinaryItem]);
    inventory.updateQuality();

    expect(ordinaryItem.sellIn).toBe(9);
    expect(ordinaryItem.quality).toBe(9);
  });

  it("should not lost any quality after hit 0", () => {
    const ordinaryItem = new Item("foo", -1, 0);
    const inventory = new GildedRose([ordinaryItem]);
    inventory.updateQuality();

    expect(ordinaryItem.sellIn).toBe(-2);
    expect(ordinaryItem.quality).toBe(0);
  });

  it("should lost 2 unit of quality after negative sellIn value", () => {
    const ordinaryItem = new Item("foo", -2, 4);
    const inventory = new GildedRose([ordinaryItem]);
    inventory.updateQuality();

    expect(ordinaryItem.sellIn).toBe(-3);
    expect(ordinaryItem.quality).toBe(2);
  });
});

describe("aged brie exceptions", () => {
  it("should increase", () => {
    const agedBrie = new Item("Aged Brie", 10, 10);
    const inventory = new GildedRose([agedBrie]);
    inventory.updateQuality();

    expect(agedBrie.sellIn).toBe(9);
    expect(agedBrie.quality).toBe(11);
  });

  it("should increase but not above 50", () => {
    const agedBrie = new Item("Aged Brie", 10, 50);
    const inventory = new GildedRose([agedBrie]);
    inventory.updateQuality();

    expect(agedBrie.sellIn).toBe(9);
    expect(agedBrie.quality).toBe(50);
  });
});

describe("backstage pass exceptions", () => {
  it("should increase quality 1 per day if sellIn bigger than 10", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      20,
      10
    );
    const inventory = new GildedRose([backstagePass]);
    inventory.updateQuality();

    expect(backstagePass.sellIn).toBe(19);
    expect(backstagePass.quality).toBe(11);
  });

  it("should not increase quality after 50", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      20,
      40
    );
    const inventory = new GildedRose([backstagePass]);

    for (let day = 1; day <= 10; day++) {
      inventory.updateQuality();
    }

    expect(backstagePass.sellIn).toBe(10);
    expect(backstagePass.quality).toBe(50);
  });

  it("should increase quality 2 if sellIn between 5 and 10", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      8,
      5
    );
    const inventory = new GildedRose([backstagePass]);
    inventory.updateQuality();

    expect(backstagePass.sellIn).toBe(7);
    expect(backstagePass.quality).toBe(7);
  });

  it("should increase quality 3 if sellIn less than 5", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      4,
      5
    );
    const inventory = new GildedRose([backstagePass]);
    inventory.updateQuality();

    expect(backstagePass.sellIn).toBe(3);
    expect(backstagePass.quality).toBe(8);
  });

  it("should quality be 0 after concert", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      20
    );
    const inventory = new GildedRose([backstagePass]);
    inventory.updateQuality();

    expect(backstagePass.sellIn).toBe(-1);
    expect(backstagePass.quality).toBe(0);
  });

  it("should quality be correct after multiple day in all conditions", () => {
    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      12,
      20
    );
    const inventory = new GildedRose([backstagePass]);
    for (let day = 1; day <= 8; day++) {
      inventory.updateQuality();
    }

    expect(backstagePass.sellIn).toBe(4);
    expect(backstagePass.quality).toBe(35);
  });
});

describe("conjured exceptions", () => {
  it("should lost 2 units of quality daily", () => {
    const conjured = new Item("Conjured Mana Cake", 10, 5);
    const inventory = new GildedRose([conjured]);
    inventory.updateQuality();

    expect(conjured.sellIn).toBe(9);
    expect(conjured.quality).toBe(3);
  });

  it("should lost 4 units of quality daily for negative sellIn", () => {
    const conjured = new Item("Conjured Mana Cake", 0, 10);
    const inventory = new GildedRose([conjured]);
    inventory.updateQuality();

    expect(conjured.sellIn).toBe(-1);
    expect(conjured.quality).toBe(6);
  });

  it("should quality be minimum 0", () => {
    const conjured = new Item("Conjured Mana Cake", 0, 1);
    const inventory = new GildedRose([conjured]);
    inventory.updateQuality();

    expect(conjured.sellIn).toBe(-1);
    expect(conjured.quality).toBe(0);
  });
});

describe("sulfuras exceptions", () => {
  it("should not change quality or sellIn of sulfuras", () => {
    const sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 5, 80);
    const inventory = new GildedRose([sulfurasItem]);
    for (let day = 1; day <= 3; day++) {
      inventory.updateQuality();
    }
    const updatedItem = inventory.items[0];
    expect(updatedItem.sellIn).toBe(5);
    expect(updatedItem.quality).toBe(80);
  });
});
