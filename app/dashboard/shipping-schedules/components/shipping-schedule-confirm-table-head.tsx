import React, { FC } from 'react';

const ShippingScheduleConfirmTableHead: FC = () => {
  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left";
  return (
    <tr>
      <th className={`${StyleTableTh}`}>受付番号</th>
      <th className={`${StyleTableTh}`}>発注NO.</th>
      <th className={`${StyleTableTh}`}>メーカー</th>
      <th className={`${StyleTableTh}`}>品番</th>
      <th className={`${StyleTableTh}`}>品名</th>
      <th className={`${StyleTableTh}`}>カラー</th>
      <th className={`${StyleTableTh}`}>サイズ</th>
      <th className={`${StyleTableTh}`}>出荷予定</th>
      <th className={`${StyleTableTh}`}>出荷数量</th>
      <th className={`${StyleTableTh}`}>残数量</th>
      <th className={`${StyleTableTh}`}>お届け先</th>
      <th className={`${StyleTableTh}`}>削除</th>
    </tr>
  );
};

export default ShippingScheduleConfirmTableHead;