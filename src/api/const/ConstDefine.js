
const EnvMode = {
    Local: "LOCAL",
    Test: "TEST",
    Prod: "PROD",
    Dev: "DEV"
}

/**
 * 根据不同环境取不同的url
 */
const getServerAddress = () => {
    // 默认是local开发地址
    let serverAddress = "http://127.0.0.1:8080";
    if (ENV_MODE === EnvMode.Prod) {
        serverAddress = "http://10.39.0.51:10010";
    } else if (ENV_MODE === EnvMode.Dev) {
        serverAddress = "http://10.39.0.49:10010";
    } else if (ENV_MODE === EnvMode.Test) {
        serverAddress = "http://10.39.0.49:10010";
    }
    return serverAddress;
}

/**
 * 定义URL 不同的模块请求不同的地址
 */
const ModuleUrlConstant = {
    Framework: getServerAddress() + "/framework/",
    Security: getServerAddress() + "/security/",
    UI: getServerAddress() + "/ui/",
    StatusMachine: getServerAddress() + "/common/sm/",
    MMS: getServerAddress() + "/mms/",
    KMS: getServerAddress() + "/kms/",
    RTM: getServerAddress() + "/rtm/",
    GC: getServerAddress() + "/gc/",
    RMS: getServerAddress() + "/rms/",
    VC: getServerAddress() + "/vc/",
}

const DataBaseType = {
    oracle: "oracle"
}
const DateFormatType = {
    Date: "YYYY-MM-DD",
    DateTime: "YYYY-MM-DD HH:mm:ss",
    Time: "HH:mm:ss"
}

const UrlConstant = {
    //Framework
    EntityManagerUrl: ModuleUrlConstant.Framework + "entityManage",
    EntityUploadFileUrl: ModuleUrlConstant.Framework + "uploadEntityFile",
    EntityDownloadFileUrl: ModuleUrlConstant.Framework + "downloadEntityFile",
    EntityListManagerUrl: ModuleUrlConstant.Framework + "entityListManage",
    ParameterManagerUrl: ModuleUrlConstant.Framework + "parameterManage",

     //Security
    UserManagerUrl: ModuleUrlConstant.Security + "userManage",
    UserLoginUrl: ModuleUrlConstant.Security + "userLogin",
    UserImportUrl: ModuleUrlConstant.Security + "importUser",
    RoleManagerUrl: ModuleUrlConstant.Security + "roleManage",
    AuthorityManagerUrl: ModuleUrlConstant.Security + "authorityManage",

    //UI
    RefListMangerUrl: ModuleUrlConstant.UI + "refListManage",    
    RefTableManagerUrl: ModuleUrlConstant.UI + "refTableManage",
    TableMangerUrl: ModuleUrlConstant.UI + "tableManage",
    ExporttUrl: ModuleUrlConstant.UI + "export",
    ImportUrl:  ModuleUrlConstant.UI + "importData",
    MessageManagerUrl: ModuleUrlConstant.UI + "messageManage",
    TreeManagerUrl: ModuleUrlConstant.UI + "treeManage",

    //SM
    StatusModelManagerUrl: ModuleUrlConstant.StatusMachine + "statusModelManage",

    //KMS
    QuestionManagerUrl: ModuleUrlConstant.KMS + "questionManage",
    QuestionLineManagerUrl: ModuleUrlConstant.KMS + "questionLineManage",
    DynaxAnalyseUrl: ModuleUrlConstant.RTM + "analyseFile",

    //RMS
    EqpRecipeManagerUrl: ModuleUrlConstant.RMS + "eqpRecipeManage",
    

    //MMS
    RawMaterialManagerUrl: ModuleUrlConstant.MMS + "rawMaterialManage",
    MaterialLotManagerUrl: ModuleUrlConstant.MMS + "materialLotManage",
    MaterialLotInvManagerUrl: ModuleUrlConstant.MMS + "materialLotInvManage",
    ValidationPackMaterialLotsUrl: ModuleUrlConstant.MMS + "validationPackMaterialLots",
    PackMaterialLotsUrl: ModuleUrlConstant.MMS + "packMaterialLots",
    UnPackMaterialLotsUrl: ModuleUrlConstant.MMS + "unPackMaterialLots",
    MaterialLotStockInUrl: ModuleUrlConstant.MMS + "stockIn",
    AppendPackMaterialLotsUrl: ModuleUrlConstant.MMS + "appendPackMaterialLots",
    IncomingMaterialImportReceiveUrl: ModuleUrlConstant.MMS + "receiveMLotByDoc",
    MMSIssueMLotByDocUrl: ModuleUrlConstant.MMS + "issueMLotByDoc",
    MateiralLotIqcUrl: ModuleUrlConstant.MMS + "materialLotIQC",
    MMSIssueMLotByDocLineUrl: ModuleUrlConstant.MMS + "issueMLotByDocLine",
    MMSReturnMLotByDocUrl: ModuleUrlConstant.MMS + "returnMLotByDoc",
    MMSCreateReturnMLotOrderUrl: ModuleUrlConstant.MMS + "createReturnMLotOrder",
    MateiralLotOqcUrl: ModuleUrlConstant.MMS + "materialLotOQC",
    MMSDeliveryOrderSavetUrl: ModuleUrlConstant.MMS + "createDeliveryOrder",
    MMSSplitMaterialLotUrl: ModuleUrlConstant.MMS + "splitMaterialLot",
    StandardSplitMLotUrl: ModuleUrlConstant.MMS + "splitStandardMaterialLot",
    MMSReleaseMateraiLotUrl: ModuleUrlConstant.MMS + "releaseMaterialLot",
    MMSHoldMateraiLotUrl: ModuleUrlConstant.MMS + "holdMaterialLot",
    MMSCreateIssueOrderUrl: ModuleUrlConstant.MMS + "createIssueOrder",
    MMSIssueMaterialByOrderUrl: ModuleUrlConstant.MMS + "issueMaterialManager",

    
    //GC
    FinishGoodManageUrl: ModuleUrlConstant.GC + "finishGoodManage",
    GCMaterialLotManagerUrl: ModuleUrlConstant.GC + "materialLotManage",
    GCStockOutCheckUrl: ModuleUrlConstant.GC + "stockOutCheck",
    GCAsyncUrl: ModuleUrlConstant.GC + "asyncManage",
    GCCheckInventoryUrl: ModuleUrlConstant.GC + "checkInventory",
    GCReTestUrl: ModuleUrlConstant.GC + "reTest",
    GCStockOutUrl: ModuleUrlConstant.GC + "stockOut",
    GCStockInUrl: ModuleUrlConstant.GC + "stockIn",
    GCGetPringBboxParameterUrl: ModuleUrlConstant.GC + "getPrintBboxParameter",
    GCValidationSoOrReTestUrl: ModuleUrlConstant.GC + "validationSoOrReTest",
    
    //VC
    VCIncomingMaterialImportUrl: ModuleUrlConstant.VC + "IncomingMaterialImport",
    VCIncomingMaterialImportSaveDateUrl: ModuleUrlConstant.VC + "IncomingMaterialSave",
    VCIncomingMaterialDeleteUrl: ModuleUrlConstant.VC + "IncomingMaterialDelete",
    VCIssueMLotByDocLineUrl: ModuleUrlConstant.VC + "issueMLotByDocLine",
    VCIssueMLotByDocUrl: ModuleUrlConstant.VC + "issueMLotByDoc",
    VCReturnMLotByDocUrl: ModuleUrlConstant.VC + "returnMLotByDoc",
    VCAppendPackMaterialLotsUrl: ModuleUrlConstant.VC + "appendPackMaterialLots",
    VCFinishGoodReceiveUrl: ModuleUrlConstant.VC + "receiveFinishGood",
    VCFinishGoodReservedUrl: ModuleUrlConstant.VC + "finishGoodReserved",
    VCGetPrintBoxParameterUrl: ModuleUrlConstant.VC + "getPrintBoxParameter",
    VCMaterialLotStockInUrl: ModuleUrlConstant.VC + "stockInFinishGood",
    VCMaterialLotStockOutUrl: ModuleUrlConstant.VC + "stockOut",
    VCPackMaterialLotsUrl: ModuleUrlConstant.VC + "packMaterialLots",
    VCProductManagerUrl: ModuleUrlConstant.VC + "productManager",
    VCInventoryManagerUrl: ModuleUrlConstant.VC + "inventoryManager",
    VCGetPrintParameterUrl: ModuleUrlConstant.VC + "printParameterManager",
    VCPackCheckUrl: ModuleUrlConstant.VC + "packCheckManager",
    VCUnPackMaterialLotsUrl: ModuleUrlConstant.VC + "unPackMaterialLots",
    VCWeightMaterialLotUrl: ModuleUrlConstant.VC + "mlotWeight",
    VCCsvImportManagerUrl: ModuleUrlConstant.VC + "csvImport",
    VCRawMaterialManagerUrl: ModuleUrlConstant.VC + "rawMaterialManager",
    VCMateiralLotIqcUrl: ModuleUrlConstant.VC + "materialLotIQC",
    VCStorageManagerUrl: ModuleUrlConstant.VC + "storageManager",
    VCStorageImportUrl: ModuleUrlConstant.VC + "storageImport",
    VCMobileManagerUrl: ModuleUrlConstant.VC + "mobileManager",
    VCLabMaterialImportUrl: ModuleUrlConstant.VC + "labMaterialImport",
    VCLabMaterialManagertUrl: ModuleUrlConstant.VC + "labMaterialManager",
    VCShipOutMLotUrl: ModuleUrlConstant.VC + "shipOut",
    VCCreateIssueOrderUrl: ModuleUrlConstant.VC + "createIssueOrder",
    VCIssueLabMLotManagerUrl: ModuleUrlConstant.VC + "issueLabMLotManager",
    VCPrintExcelManagerUrl: ModuleUrlConstant.VC + "printExcel",
    VCPartsMaterialManagerUrl: ModuleUrlConstant.VC + "partsMaterialManage",
    VCQueryOrderManagerUrl: ModuleUrlConstant.VC + "queryOrderManager",

};

const SystemRefListName = {
    Language: "Language",
    ReelStandardQty: "ReelStandardQty"
};

const RefTableName = {
    NBOrg: "NBOrg"
};

const EntityModel = {
    NBMessage: "com.newbiest.base.model.NBMessage",
    NBUser: "com.newbiest.security.model.NBUser",
    MaterialEvent: "com.newbiest.mms.state.model.MaterialEvent"
};

/**
 * 成功失败标志位
 */
const ResultIdentify = {
    Success: "SUCCESS",
    Fail: "FAIL",
    Yes: "Y",
    No: "N"
};

const Language = {
    Chinese: "Chinese",
    English: "English"
};

const DefaultStatusList = {
    InActive: "InActive",
    UnFrozen: "UnFrozen",
    Frozen: "Frozen",
    Active: "Active"
};
/**
 * 所有对象都有自动带出的主键
 */
const DefaultRowKey = "objectRrn";

/**
 * 默认的排序栏位。没手动给值的时候要自动生成值。即表格中数据的最大值加1
 */
const DefaultOrderKey = "seqNo";

//js里面typeof判断所需要的类型
const Type = {
    function: "function"
}

const SqlType = {
    And: " AND ",
    Eq: " = ",
    Where: " WHERE ",
    Like: " LIKE ",
    Gt: " >= ",
    Lt: " <= ",
    toDate: "to_date",
    DateTime: "YYYY-MM-DD HH24:mi:ss",
    Date: "YYYY-MM-DD",
    NoResultCondition: "1 != 1"
}


export {UrlConstant, DefaultStatusList, DataBaseType, DateFormatType, SystemRefListName, RefTableName, EntityModel, ResultIdentify, Language, DefaultRowKey, DefaultOrderKey, Type, SqlType};