import type DataItem from './DataItem.tsx'
import type { Meta } from './Meta.tsx'

export default interface ResponseListApi {
  data: DataItem[]
  meta: Meta
}