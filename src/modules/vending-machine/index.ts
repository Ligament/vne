import VendingMachineModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const VENDING_MACHINE_MODULE = "vendingMachineModuleService"

export default Module(VENDING_MACHINE_MODULE, {
  service: VendingMachineModuleService,
})