import MakesYouThink from "../contracts/MakesYouThink.cdc" 

transaction(myNewFact: String) {

  prepare(signer: AuthAccount) {}

  execute {
    MakesYouThink.changeFact(newFact: myNewFact)
  }
}