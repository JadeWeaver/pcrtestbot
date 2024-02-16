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
      SIZE: () =>{
        let aReturn = [];
        this.stateCur = this.OrderState.MILK;
        aReturn.push("What type of milk would you like?");
        aReturn.push("We have Whole and Almond");
        return aReturn;
      },
      MILK: () =>{
        let aReturn = [];
        this.stateCur = this.OrderState.FINALIZE;
        aReturn.push("Would you like to add a bagel to your order for an extra $3.00?");
        return aReturn;
      },
      FINALIZE: (sInput) =>{
        let aReturn = [];
        this.stateCur = this.OrderState.RESERVING;
        var Bagle;
        if (sInput.toLowerCase().startsWith('y')) {
            var Bagel = "yes";
        } else {
            var Bagel = "no"
        }
        aReturn.push("Your order ready to send. To confirm your order type 'yes', to cancel your order type 'no'");
        return aReturn;
      },
      RESERVING: (sInput) => {
        let aReturn = [];
        this.isDone = true;
        if (sInput.toLowerCase().startsWith('y') && Bagel=="yes") {
          aReturn.push(`Your online order of a coffee with milk and a bagel is reserved under the phone number ${this.sFrom}`);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 120);
          aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
        } 
        else if(sInput.toLowerCase().startsWith('y')){
          aReturn.push(`Your online order of a coffee with milk is reserved under the phone number ${this.sFrom}`);
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
  }
  handleInput(sInput) {
    return this.stateCur(sInput);
  }
  isDone() {
    return this.isDone;
  }
}

export { RapidTestOrder }