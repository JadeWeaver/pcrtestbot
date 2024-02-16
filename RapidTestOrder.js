class RapidTestOrder {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.SIZE;
        aReturn.push("Welcome to Buckley's Coffee House.");
        aReturn.push("What size drink would you like to order: small[+$3.00], medium[+$4.00], or large?[+$5.00]");
        return aReturn;
      },
      SIZE: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.DRINK;
        if (sInput.toLowerCase().startsWith('s')){
          this.Size = "small";
          this.Cost = this.Cost + 3;
        } 
        else if (sInput.toLowerCase().startsWith('m')){
          this.Size = "medium";
          this.Cost = this.Cost + 4;
        } 
        else if (sInput.toLowerCase().startsWith('l')){
          this.Size = "large";
          this.Cost = this.Cost + 5;
        } 
        aReturn.push("Which drink would you like?");
        aReturn.push("We have Latte, Capuccino, or Macchiato");
        return aReturn;
      },
      DRINK: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.MILK;
        if (sInput.toLowerCase().startsWith('l')){
          this.Drink = "Latte";
        } 
        else if (sInput.toLowerCase().startsWith('c')){
          this.Drink = "Capuccino";
        } 
        else if (sInput.toLowerCase().startsWith('m')){
          this.Drink = "Macchiato";
        } 
        aReturn.push("What type of milk would you like?");
        aReturn.push("We have Whole[+$1.00] and Almond[+$2.00]");
        return aReturn;
      },
      MILK: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.FINALIZE;
        if (sInput.toLowerCase().startsWith('a')){
          this.Milk = "almond";
          this.Cost = this.Cost + 2;
        } 
        else if(sInput.toLowerCase().startsWith('w')){
            this.Milk = "whole";
            this.Cost = this.Cost + 1;
        }
        aReturn.push("Would you like to add a bagel to your order for an extra $3.00?");
        return aReturn;
      },
      FINALIZE: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.RESERVING;
        if(sInput.toLowerCase().startsWith('y')){
            this.Bagel = true;
            this.Cost = this.Cost + 3;
        }
        aReturn.push("Your order is ready to send. To confirm your order type 'yes', to cancel your order type 'no'");
        return aReturn;
      },
      RESERVING: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        if (sInput.toLowerCase().startsWith('y') && this.Bagel){
          aReturn.push(`Your online order of a ${this.Size} ${this.Drink} coffee with ${this.Milk} milk and a bagel is reserved under the phone number ${this.sFrom}. Your total is ${this.Cost}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y')){
          aReturn.push(`Your online order of a ${this.Size} ${this.Drink} coffee with ${this.Milk} milk is reserved under the phone number ${this.sFrom}.Your total is ${this.Cost}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else {
          aReturn.push("Thanks for trying our reservation system");
          aReturn.push("Maybe next time")
        }
        return aReturn;
      }
    };
    


    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
    this.Bagel = false;
    this.Milk = "no";
    this.Size = "small";
    this.Drink = "regular";
    this.Cost = 0;
  }
  handleInput(sInput) {
    return this.stateCur(sInput);
  }
  isDone() {
    return this.isDone;
  }
}

export { RapidTestOrder }