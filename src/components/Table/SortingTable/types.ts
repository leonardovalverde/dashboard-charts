import { type ColumnsType, type TableProps } from "antd/es/table";

export interface SortingTableProps {
  columns: ColumnsType<any>;
  data: any[];
  onChange?: TableProps<any>["onChange"];
  expandable?: TableProps<any>["expandable"];
  pagination?: TableProps<any>["pagination"];
}
