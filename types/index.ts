type OrderInputs = {
  contents: {
    supplierId: string;
    supplierName:string;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    quantity: string;
    processing:boolean
    comment: string;
  }[];
};

type Carts = {
  shippingAddress: number;
  orderNumber: string;
  topicName: string;
  contents: {
    supplierId: string;
    supplierName:string;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    quantity: string;
    processing: boolean;
    comment: string;
  }[];
};

type ShippingScheduleInputs = {
  shippingDate: string;
  contents: {
    order_detail_id: number;
    quantity: number;
    remainingQuantity: number;
    shippingAddress: number;
    comment: string;
  }[];
}