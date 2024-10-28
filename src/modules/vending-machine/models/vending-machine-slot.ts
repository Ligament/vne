import { model } from "@medusajs/framework/utils"
import { SlotState } from "../types"
import VendingMachine from "./vending-machine"


const VendingMachineSlot = model.define("vending_machine_slot", {
  id: model.id().primaryKey(),
  slotNumber: model.number(),
  state: model.enum(SlotState),
  vendingMachine: model.belongsTo(() => VendingMachine, {
    mappedBy: "slots"
  })
})

export default VendingMachineSlot