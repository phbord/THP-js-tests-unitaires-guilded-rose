class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  };

  updateQuality(num = 1) {
    this.sellIn --;
    if (this.quality <= 0){
      this.quality = 0;
    } else {
      if(this.sellIn < 0) {
        this.quality -= 2 * num;
      } else {
        this.quality -= num;
      };
    }
  };
};

module.exports = {
  Item
};