import { z } from "zod"

export const brandSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
})

export type BrandFormValues = z.infer<typeof brandSchema>