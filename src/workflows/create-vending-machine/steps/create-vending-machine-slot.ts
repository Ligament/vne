import VendingMachineModuleService from "../../../modules/vending-machine/service"
import { SlotState } from "../../../modules/vending-machine/types"
import { VENDING_MACHINE_MODULE } from "../../../modules/vending-machine"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export type CreateVendingMachineSlotInput = {
    slotNumber: number
    state: SlotState
}

const createVendingMachineSlot = createStep(
    "create-vending-machine-slot",
    async (data: CreateVendingMachineSlotInput, { container }) => {
        const vendingMachineModuleService: VendingMachineModuleService =
            container.resolve(VENDING_MACHINE_MODULE)

        const vendingMachineSlot = await vendingMachineModuleService.createVendingMachineSlots(data)

        return new StepResponse({
            vending_machine_slot: vendingMachineSlot
        }, {
            vending_machine_slot: vendingMachineSlot
        })
    },
    async ({ vending_machine_slot }, { container }) => {
        const vendingMachineModuleService: VendingMachineModuleService =
            container.resolve(VENDING_MACHINE_MODULE)

        await vendingMachineModuleService.deleteVendingMachineSlots(vending_machine_slot.id)
    }
)

export default createVendingMachineSlot