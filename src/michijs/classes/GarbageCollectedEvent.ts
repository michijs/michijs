export class GarbageCollectedEvent extends Error {
  constructor(){
    super("Garbage collected")
  }
}
