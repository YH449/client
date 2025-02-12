
const actionType = {
    PrintCOCExcel:"PrintCoc",
    PrintPackingListExcel:"PrintPackingList",
    PrintShippingListExcel: "PrintShippingList",
    PrintPKListExcel: "PrintPKList",
    PrintPackingListAndCocExcel:"PrintPackingListAndCoc",
    PrintDeliveryOrder: "PrintDeliveryOrder",
    PrintRSAndScrapOrder:"PrintRSAndScrapOrder",

    GetBoxParameter: "GetBoxParameter",
    GetPKListParameter: "GetPKListParameter",
    GetRYBoxParameter: "GetRYBoxParameter",
}

export default class VcPrintParameterRequestBody {

    actionType;
    documentLineId;
    materialLotId;
  
    constructor(actionType, documentLineId, materialLotId){
        this.actionType = actionType;
        this.documentLineId = documentLineId;
        this.materialLotId = materialLotId;
    }

    //打印COC标签
    static buildPrintCoc(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintCOCExcel, documentLineId);
    }

    static buildPrintPackingList(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintPackingListExcel, documentLineId);
    }

    static buildPrintShippingList(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintShippingListExcel, documentLineId);
    }

    static buildPrintPKList(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintPKListExcel, documentLineId);
    }

    static buildPrintPackingListAndCoc(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintPackingListAndCocExcel, documentLineId);
    }

    //箱标签
    static buildGetBoxParameter(materialLotId) {
        return new VcPrintParameterRequestBody(actionType.GetBoxParameter, undefined, materialLotId);
    }
    
    static buildGetRYBoxParameter(materialLotId) {
        return new VcPrintParameterRequestBody(actionType.GetRYBoxParameter, undefined, materialLotId);
    }

    static buildPrintDeliveryOrder(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintDeliveryOrder, documentLineId);
    }

    static buildPrintRSAndScrapOrder(documentLineId) {
        return new VcPrintParameterRequestBody(actionType.PrintRSAndScrapOrder, documentLineId);
    }
    
}