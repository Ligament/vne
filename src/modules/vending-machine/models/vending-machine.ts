import { model } from "@medusajs/framework/utils"
import VendingMachineSlot from "./vending-machine-slot"
import VendingMachineOrder from "./vending-machine-order"
import { VendingMachineStatus } from "../types"

const VendingMachine = model.define("vending_machine", {
  id: model.id().primaryKey(),
  name: model.text(),
  location: model.text(),
  status: model.enum(VendingMachineStatus),
  slots: model.hasMany(() => VendingMachineSlot, {
    mappedBy: "vendingMachine"
  }),
  orders: model.manyToMany(() => VendingMachineOrder, {
    mappedBy: "products"
  })
})
.cascades({
  delete: ["slots"]
})

export default VendingMachine