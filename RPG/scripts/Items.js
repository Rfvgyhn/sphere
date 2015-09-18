function Item()
{
  this.Name   = "";
  this.Type   = "";
  this.atkMod = 0;
  this.defMod = 0;
  this.aglMod = 0;
  this.lckMod = 0;
  this.hpMod  = 0;
  this.thpMod = 0;
  this.mpMod  = 0;
  this.tmpMod = 0;
}

var Items = new Array();
  Items["Potion"] = new Item();
  Items["Potion"].Name   = "Potion";
  Items["Potion"].Type   = "Stat";
  Items["Potion"].atkMod = 0;
  Items["Potion"].defMod = 0;
  Items["Potion"].aglMod = 0;
  Items["Potion"].lckMod = 0;
  Items["Potion"].hpMod  = 10;
  Items["Potion"].thpMod = 0;
  Items["Potion"].mpMod  = 0;
  Items["Potion"].tmpMod = 0;