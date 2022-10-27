 pub contract MakesYouThink {

    pub var fact: String

    pub fun changeFact(newFact: String) {
        self.fact = newFact
    }

    init() {
        self.fact = "Atoms are 95% empty space, therefore you are 95% empty!"
    }
}
 