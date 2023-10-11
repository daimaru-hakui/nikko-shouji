type OrderInputs = {
  contents: {
    supplierId: string;
    supplierName:string;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    quantity: string;
    comment: string;
  }[];
};

type Carts = {
  shippingAddress: number;
  desiredDeliveryOn: string;
  sample: boolean;
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
    comment: string;
  }[];
};