import React from 'react';

const OrderProcessTable = () => {
  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left text-black";

  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>お届け先</th>
            <th className={`${StyleTableTh}`}>状況</th>
            <th className={`${StyleTableTh}`}>キャンセル</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
};

export default OrderProcessTable;