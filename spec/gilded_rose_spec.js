var { Shop } = require('../src/gilded_rose.js');
var { Item } = require('../src/item.js');

describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 2 si il reste 10 jours ou moins pour Backstage passes", () => {
    listItems.push(new Item("Aged Brie", 10, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 31 },
      { sellIn: 8, quality: 32 }
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 3 si il reste 5 jours ou moins pour Backstage passes", () => {
    listItems.push(new Item("Aged Brie", 5, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 4, quality: 31 },
      { sellIn: 3, quality: 33 }
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité de Backstage passes tombe à 0 après que la date soit dépassée", () => {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30));
    listItems.push(new Item("Control", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: 19, quality: 29 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    })
  })

  it("La qualité baisse deux fois plus vite après que la date de péremption soit dépassée", () => {
    listItems.push(new Item("Control", 20, 30));
    listItems.push(new Item("Control2", 0, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 29 },
      { sellIn: -1, quality: 28 }
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    })

  })

  it("La qualité de Sulfuras ne baisse jamais", () => {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", Infinity, 80));
    listItems.push(new Item("Control", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: Infinity, quality: 80 },
      { sellIn: 19, quality: 29 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité d'un objet ne peut excéder 50", () => {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", Infinity, 80));
    listItems.push(new Item("Aged Brie", 20, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: Infinity, quality: 80 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité d'un objet ne peut jamais être négative", () => {
    listItems.push(new Item("Control", -1, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: -2, quality: 0 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité d'un objet Conjured se dégrade deux fois plus rapidement", () => {
    listItems.push(new Item("Ring", 20, 30));
    listItems.push(new Item("Conjured ring", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 29 },
      { sellIn: 19, quality: 28 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

});