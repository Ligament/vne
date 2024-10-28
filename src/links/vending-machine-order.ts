import VendongMachineModule from "../modules/vending-machine"
import OrderModule from "@medusajs/medusa/order"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  {
    linkable: VendongMachineModule.linkable.vendingMachineOrder,
    deleteCascade: true
  },
  OrderModule.linkable.order
)
