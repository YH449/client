import AddPackMaterialLotTable from "@components/mms/table/AddPackMaterialLotTable";
import EntityDoubleScanProperties from "@properties/framework/EntityDoubleScanProperties";
import PackageValidationRequest from "@api/package-validation/PackageValidationRequest";
import NoticeUtils from "@utils/NoticeUtils";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

/**
 * 追加包装
 */
export default class AddPackagaMaterialLotProperties extends EntityDoubleScanProperties{

    static displayName = 'AddPackagaMaterialLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, packageType: this.state.parameters.parameter1};
      }

    /**
     * 第二个条件查询之后，检索表格数据中是否含有该数据，如果有则不做任何操作
     *  如果没有则添加数据，并将数据的标志成newFlag
     */
    afterSecondQuery = (queryDatas) => {
        let {tableData} = this.state;
        if (tableData.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            this.setState({ 
                loading: false
            });
            this.form.resetFormFileds();
            return;
        }
        if (queryDatas && queryDatas.length > 0) {
            let queryData = queryDatas[0];
            this.validationPackgeRule(queryData);
        } else {
            this.showDataNotFound();
        }
    }
    
    validationPackgeRule(materialLot) {
        let self = this;
        let {rowKey,tableData,packageType} = this.state;
        let boxMaterialLotId = tableData[0].boxMaterialLotId;
        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            materialLot.newFlag = true;
            tableData.push(materialLot);
        }
        let requestObject = {
            packageType: packageType,
            packagedMaterialLotId: boxMaterialLotId,
            materialLots: tableData,
            success: function() {
                self.setState({ 
                    tableData: tableData,
                    loading: false
                });
                self.nextQueryNodeFocus();
                self.form.resetFormFileds();
            },
            fail: function() { 
                tableData.pop();
                self.setState({ 
                    tableData: tableData,
                    loading: false
                });
                self.allFieldBlur();
            }
        }
        PackageValidationRequest.sendValidationAppendPackRequest(requestObject);
    }

    buildTable = () => {
        return <AddPackMaterialLotTable {...this.getDefaultTableProps()} pagination={false} />
    }

}