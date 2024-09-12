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
    category_id: Number(category.id),
    vendor_id: Number(vendor.id),
    properties: properties.map((e) => Number(e.id)),
    regions: regions.map((e) => ({
      id: Number(e.id),
      region_id: Number(e.region_id),
      location: e.location,
      code: e.code,
      quantity: e.quantity,
    })),
    documents: documents.map((e) => ({
      id: Number(e.id),
      document_id: Number(e.document_id),
      date: e.date,
      code: e.code,
      note: e.note,
      originalName: e.original_name,
      url: e.url,
    })),
    ...remainings,
  };
};
