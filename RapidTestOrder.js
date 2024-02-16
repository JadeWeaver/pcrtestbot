class RapidTestOrder {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.SIZE;
        aReturn.push("Welcome to Buckley's Coffee House.");
        aReturn.push("What size drink would you like to order: small, medium, or large?");
        return aReturn;
      },
      SIZE: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.MILK;
        if (sInput.toLowerCase().startsWith('s')){
          this.Size = "small"
        } 
        else if (sInput.toLowerCase().startsWith('m')){
          this.Size = "medium"
        } 
        else if (sInput.toLowerCase().startsWith('l')){
          this.Size = "large"
        } 
        aReturn.push("What type of milk would you like?");
        aReturn.push("We have Whole and Almond");
        return aReturn;
      },
      MILK: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.FINALIZE;
        if (sInput.toLowerCase().startsWith('a')){
          this.Almond = true;
        } 
        else if(sInput.toLowerCase().startsWith('w')){
            this.Whole = true;
        }
        aReturn.push("Would you like to add a bagel to your order for an extra $3.00?");
        return aReturn;
      },
      FINALIZE: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.RESERVING;
        if(sInput.toLowerCase().startsWith('y')){
            this.Bagel = true;
        }
        aReturn.push("Your order is ready to send. To confirm your order type 'yes', to cancel your order type 'no'");
        return aReturn;
      },
      RESERVING: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        if (sInput.toLowerCase().startsWith('y') && this.Bagel && this.Almond){
          aReturn.push(`Your online order of a ${this.Size}coffee with almond milk and a bagel is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y') && this.Bagel && this.Whole){
          aReturn.push(`Your online order of a ${this.Size} coffee with whole milk and a bagel is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y') && this.Bagel){
          aReturn.push(`Your online order of a ${this.Size} coffee without milk and a bagel is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y') && this.Whole){
          aReturn.push(`Your online order of a ${this.Size} coffee with whole milk is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y') && this.Almond){
          aReturn.push(`Your online order of a ${this.Size} coffee with almond milk is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if (sInput.toLowerCase().startsWith('y')){
          aReturn.push(`Your online order of a ${this.Size} coffee without milk is reserved under the phone number ${this.sFrom}`);
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
    this.Almond = false;
    this.Whole = false;
    this.Size = "small";
  }
  handleInput(sInput) {
    return this.stateCur(sInput);
  }
  isDone() {
    return this.isDone;
  }
}

export { RapidTestOrder }