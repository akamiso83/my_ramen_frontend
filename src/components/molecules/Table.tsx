type Props<T> = {
  headers: string[]; // 表示用ラベル
  data: T[]; // データ本体
  columns: (keyof T)[]; // data（オブジェクト）のkey一覧
};
export const Table = <T extends Record<string, unknown>>({ headers, data, columns }: Props<T>) => {
  return (
    <table className="table-auto w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
        {data.map((d, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {columns.map((column, j) => (
              <td key={j} className="px-4 py-3">
                {String(d[column])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
