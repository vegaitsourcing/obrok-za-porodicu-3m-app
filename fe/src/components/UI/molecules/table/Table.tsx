import TableHeader from "../tableHeader/TableHeader";
import TableRow from "../tableRow/TableRow";
import classes from "./Table.module.scss";

interface Props {
  headers: Array<string>;
  data: Array<any>;
  columns: Array<string>;
}

const Table: React.FC<Props> = ({ headers, data, columns }) => {
  return (
    <table className={classes}>
      <thead>
        <TableHeader headers={headers} />
      </thead>
      <tbody>
        {data.map((item) => {
          return <TableRow key={item.id} item={item} columns={columns} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
