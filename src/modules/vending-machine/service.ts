import { MedusaService } from "@medusajs/framework/utils"
import VendingMachine from "./models/vending-machine"
import VendingMachineSlot from "./models/vending-machine-slot"
import VendingMachineOrder from "./models/vending-machine-order"

class VendingMachineModuleService extends MedusaService({
  VendingMachine,
  VendingMachineSlot,
  VendingMachineOrder
}) {

}

export default VendingMachineModuleService