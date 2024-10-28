import {
  createStep,
  StepResponse
} from "@medusajs/framework/workflows-sdk"
import VendingMachineModuleService from "../../../modules/vending-machine/service"
import { VENDING_MACHINE_MODULE } from "../../../modules/vending-machine"
import { VendingMachineStatus } from "../../../modules/vending-machine/types"

export type CreateVendingMachineStepInput = {
  name: string
  location: string
  status: VendingMachineStatus
}

const createVendingMachineStep = createStep(
  "create-vending-machine-step",
  async (data: CreateVendingMachineStepInput, { container }) => {
    const vendingMachineModuleService: VendingMachineModuleService =
      container.resolve(VENDING_MACHINE_MODULE)

    const vendingMachine = await vendingMachineModuleService.createVendingMachines(data)

    return new StepResponse({
      vending_machine: vendingMachine
    }, {
      vending_machine: vendingMachine
    })
  },
  async ({ vending_machine }, { container }) => {
    const vendingMachineModuleService: VendingMachineModuleService =
      container.resolve(VENDING_MACHINE_MODULE)
    
    await vendingMachineModuleService.deleteVendingMachines(vending_machine.id)
  }
)

export default createVendingMachineStep