import type { TableProps } from "./Table.types";

function Table({ headers, data }: TableProps) {
  return (
    <table>
      <caption></caption>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowData.productName}</td>
            <td>{rowData.productCategory}</td>
            <td>{rowData.quantity}</td>
            <td>{rowData.price}</td>
            <td>{rowData.image}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
