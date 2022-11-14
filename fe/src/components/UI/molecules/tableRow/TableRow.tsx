import classes from "./TableRow.module.scss";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete_icon.svg";

interface Props {
  item: any;
  columns: Array<string>;
  deleteHandler: (id: number) => void;
  onClickEdit: (val: any) => void;
}

const TableRow: React.FC<Props> = ({
  item,
  columns,
  deleteHandler,
  onClickEdit,
}) => {
  const onClickHandler = () => {
    deleteHandler(item.id);
  };

  const getColumnValue = (value: string | boolean) => {
    const isBoolean = typeof value === "boolean";
    return isBoolean ? (value ? "Da" : "Ne") : value;
  };

  return (
    <tr key={`table-row-${item.id}`}>
      {columns.map((column, columnIndex) => (
        <td key={`table-row-cell-${columnIndex}`}>
          {item[column] !== undefined ? (
            getColumnValue(item[column])
          ) : (
            <>
              <button
                className={classes["edit-icon-button"]}
                onClick={() => onClickEdit(item)}
              >
                <EditIcon width={16} height={16} />
              </button>
              <button
                className={classes["delete-icon-button"]}
                onClick={onClickHandler}
                title="Edit"
              >
                <DeleteIcon width={16} height={16} />
              </button>
            </>
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
