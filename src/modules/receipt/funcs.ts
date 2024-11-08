import { IReceiptDetail, IReceiptPayload } from "@interfaces/receipts";

export const refactorPayload = (values: IReceiptPayload): IReceiptPayload => {
  return {
    ...values,
    barcode: !!values.barcode,
    depreciation_date: values.date,
  };
};

export const remapInitialValues = (
  detailData: IReceiptDetail
): IReceiptPayload => {
  const {
    barcode,
    store,
    category,
    vendor,
    properties,
    deprecated,
    regions,
    documents,
    parent_id,
    ...remainings
  } = detailData;

  return {
    barcode: Number(barcode),
    store_code: store.code!,
    category_id: category.id,
    vendor_id: vendor.id,
    properties: properties.map((e) => e.id),
    regions: regions.map((e) => ({
      id: e.id,
      region_id: e.region_id,
      location: e.location,
      code: e.code,
      quantity: e.quantity,
    })),
    documents: documents.map((e) => ({
      id: e.id,
      document_id: e.document_id,
      date: e.date,
      code: e.code,
      note: e.note,
      originalName: e.original_name,
      url: e.url,
    })),
    ...remainings,
  };
};
