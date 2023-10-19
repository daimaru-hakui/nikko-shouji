import React, { FC } from 'react';

const OrderProcessHeader: FC = () => {

  const divTitle = "text-sm text-gray-600";
  return (
    <div className='mt-12'>
      <div className="flex gap-6">
        <div>
          <div className={`${divTitle}`}>受付番号</div>
          <div className="ml-4 text-black"></div>
        </div>
        <div>
          <div className={`${divTitle}`}>貴社発注ナンバー</div>
          <div className="ml-4 text-black"></div>
        </div>
      </div>
      <div className="mt-6 flex gap-6">
        <div>
          <div className={`${divTitle}`}>発注日時</div>
          <div className="ml-4 text-black">

          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-6">
        <div>
          <div className={`${divTitle}`}>送り先</div>
          <div className="ml-4 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessHeader;