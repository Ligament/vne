import { defineLink } from "@medusajs/framework/utils"
import VendingMachineModule from "../modules/vending-machine"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  VendingMachineModule.linkable.vendingMachineSlot,
  ProductModule.linkable.productVariant
)