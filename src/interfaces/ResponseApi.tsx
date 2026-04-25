import type Data from './Data.tsx'
import type { Meta } from './Meta.tsx'

export default interface ResponseApi {
  data: Data[]
  meta: Meta
}