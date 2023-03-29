import { StyledTable } from "./styles";
import { SortingTableProps } from "./types";

const SortingTable = ({
  columns,
  data,
  onChange,
  expandable,
  pagination,
}: SortingTableProps): JSX.Element => {
  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      onChange={onChange}
      expandable={expandable}
      pagination={pagination}
    />
  );
};

export default SortingTable;
