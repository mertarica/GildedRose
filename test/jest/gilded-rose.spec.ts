import { Item, GildedRose } from "@/gilded-rose";

describe("Constructor Tests", () => {
  it("should add new item", () => {
    const itemList = new GildedRose([new Item("foo", 0, 0)]);
    const item = itemList.items[0];
    expect(JSON.stringify(item)).toBe(
      JSON.stringify({ name: "foo", sellIn: 0, quality: 0 })
    );
  });

  it("shouldn't add negative quality", () => {
    expect(() => new GildedRose([new Item("New Item", 0, -1)])).toThrow(
      "You cannot add negative quality"
    );
  });

  it("shouldn't add quality bigger than 50", () => {
    expect(() => new GildedRose([new Item("New Item", 0, 51)])).toThrow(
      "You cannot add any quality value bigger than 50 for items"
    );
  });

  it("shouldn't add any quality value other than 80 for sulfuras", () => {
    expect(
      () => new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 0)])
    ).toThrow("You cannot add any quality value other than 80 for sulfuras");
  });
});

describe("ordinary materials daily changes", () => {
  it("should lost 1 unit of quality after a simple day", () => {
    const itemList = new GildedRose([new Item("foo", 10, 10)]);
    const updatedList = itemList.updateQuality();
    const updatedItem = updatedList[0];
    expect(JSON.stringify(updatedItem)).toBe(
      JSON.stringify({ name: "foo", sellIn: 9, quality: 9 })
    );
  });

  it("shouldn't lost any quality after hit 0", () => {
    const itemList = new GildedRose([new Item("foo", -1, 0)]);
    const updatedList = itemList.updateQuality();
    const updatedItem = updatedList[0];
    expect(JSON.stringify(updatedItem)).toBe(
      JSON.stringify({ name: "foo", sellIn: -2, quality: 0 })
    );
  });

  it("should lost 2 unit of quality after negative sellIn value", () => {
    const itemList = new GildedRose([new Item("foo", -2, 4)]);
    const updatedList = itemList.updateQuality();
    const updatedItem = updatedList[0];
    expect(JSON.stringify(updatedItem)).toBe(
      JSON.stringify({ name: "foo", sellIn: -3, quality: 2 })
    );
  });
});

describe("aged brie exceptions", () => {
  it("", () => {
    expect({}).toBe({});
  });
});

describe("sulfuras exceptions", () => {
  it("", () => {
    expect({}).toBe({});
  });
});

describe("backstage pass exceptions", () => {
  it("", () => {
    expect({}).toBe({});
  });
});

describe("conjured exceptions", () => {
  it("", () => {
    expect({}).toBe({});
  });
});
