import {
    AuthenticatedMedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const {
        fields,
        limit = 20,
        offset = 0,
    } = req.validatedQuery || {}
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const {
        data: vendingMachineSlot,
    } = await query.graph({
        entity: "vending_machine_slot",
        fields: [
            "*",
            "vending_machine.*",
            "product_variant.*",
            ...(req.validatedQuery?.fields.split(",") || []),
        ],
        filters: {
            id: req.params.id,
        },
    })

    res.json({
        vending_machine_slot: vendingMachineSlot,
    })
}