class Shop {
  constructor(items = []) {
    this.items = items;
  }

  ageBrie(cheese) {
    cheese.sellIn --;
    if (cheese.quality >= 50){
      cheese.quality = 50;
    } else {
      cheese.quality ++;
    };
  }

  agePass(pass) {
    pass.sellIn --;
    if (pass.quality >= 50){
      pass.quality = 50;
    } else if (pass.sellIn < 0){
      pass.quality = 0;
    } else if (pass.sellIn <= 5){
      pass.quality += 3;
    } else if (pass.sellIn <= 10){
      pass.quality += 2;
    } else {
      pass.quality ++;
    };
  }

  updateQuality() {
    this.items.map((item) => {
      if (/^Conjured.*/.test(item.name)) {
        item.updateQuality(2);
      } else {
        switch (item.name) {
          case "Backstage passes to a TAFKAL80ETC concert":
            this.agePass(item);
            break;
          case "Aged Brie":
            this.ageBrie(item);
            break;
          case "Sulfuras, Hand of Ragnaros":
            break;
          default:
            item.updateQuality();
            break;
        }
      }
    });

    return this.items;
  };
}

module.exports = {
  Shop,
};
