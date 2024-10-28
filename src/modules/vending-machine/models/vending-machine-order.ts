import { model } from "@medusajs/framework/utils"
import { OrderStatus } from "../types"
import VendingMachine from "./vending-machine"

const VendingMachineOrder = model.define("vending_machine_order", {
  id: model.id().primaryKey(),
  status: model.enum(OrderStatus),
  products: model.manyToMany(() => VendingMachine, {
    mappedBy: "orders"
  })
})

export default VendingMachineOrder